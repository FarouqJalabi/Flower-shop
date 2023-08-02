"use client";
import React, { useState, createRef, FormEvent } from "react";
import FlowerEdit from "./flowerEdit";
import { createClient } from "@supabase/supabase-js";

interface props {
  tags: Array<string>;
}

export default function FlowersPreviewEdit({ tags }: props) {
  let [flowersCount, setFlowerCount] = useState(1);
  let [loadingStatus, setLoadingStatus] = useState("");

  let flowerRef = createRef<HTMLDivElement>();
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
  );

  const handle_form = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    let formObject = new FormData(e.currentTarget as HTMLFormElement);
    let formData = Object.fromEntries(formObject) as Record<string, any>;
    if (formData.color == "NONE") {
      delete formData.color;
      delete formData.img;
      delete formData.alt;
    }

    let flowersElement = Array.from(
      flowerRef.current?.getElementsByClassName(
        "flowerEdit"
      ) as HTMLCollectionOf<HTMLFormElement>
    );

    let flowersData = flowersElement.map((f) => {
      let fData = new FormData(f);
      let flower = Object.fromEntries(fData) as Record<string, any>;
      const tagsList = Object.keys(flower).filter((v) => {
        if (v.startsWith("tag")) {
          delete flower[v];
          return true;
        }
      });
      flower.tags = {};
      flower.tags.connect = tagsList.map((v) => {
        return {
          tag: v.substring(3),
        };
      });
      return flower;
    });

    //Validation
    const someEmpty = flowersData.some((v, f_i) => {
      return Object.values(v).some((v, i) => {
        //Image is empty
        if (v.name == "") {
          setLoadingStatus(
            `The ${
              f_i + 1
            } flower has and empty image. Please make sure to fill out the form or delete a flower `
          );
          return true;
        }
        if (v == "" && i != 5) {
          setLoadingStatus(
            `The ${
              f_i + 1
            } flowers have an empty text input. Please make sure to fill them all out or delete a flower`
          );
          return true;
        }
        return false;
      });
    });
    const someEmptyForm = Object.values(formData).some((v) => {
      if (v.name == "") {
        setLoadingStatus(
          "The main form has an empty image input. Please fill it our or set color to none"
        );

        return true;
      }
      if (v == "") {
        setLoadingStatus(
          "The main form has an empty text input. Please make sure you fill out the form"
        );
        return true;
      }
      return false;
    });
    if (someEmpty || someEmptyForm) {
      return;
    }

    setLoadingStatus("Posting form data...");

    const res = await fetch("api/post", {
      method: "POST",
      body: JSON.stringify({
        formData: formData,
        flowersData: flowersData,
      }),
    });
    if (res.ok) {
      setLoadingStatus("Posting images...");

      const res_data = await res.json();
      await res_data.flowersId.forEach(async (id: string, i: number) => {
        const { data, error } = await supabase.storage
          .from("flower_images")
          .upload(id + ".jpg", flowersData[i].img, {
            upsert: false,
          });
      });
      if (formData.color != "NONE") {
        const { data, error } = await supabase.storage
          .from("preview_images")
          .upload(res_data.previewId + ".jpg", formData.img, {
            upsert: false,
          });
      }
      setLoadingStatus("Done! Check out the main page for changes");
    } else {
      setLoadingStatus(res.statusText);
    }
  };
  return (
    <>
      <h1 className="font-jua text-3xl">Create a new Flower Preview</h1>
      <div className="flex flex-wrap gap-4 m-4" ref={flowerRef}>
        <form onSubmit={handle_form} className="flex">
          <div className="flex flex-col gap-3 text-center">
            <input
              type="text"
              name="title"
              placeholder="Title"
              className="text-2xl font-extrabold border-2 border-black p-2"
            />
            <input
              type="text"
              name="underTitle"
              placeholder="underTitle"
              className="text-lg border-2 border-black p-2"
            />

            <input
              type="file"
              name="img"
              className="text-lg border-2 border-black p-2"
            />

            <input
              type="text"
              name="alt"
              placeholder="alt"
              className="text-lg border-2 border-black p-2"
            />

            <div className="flex gap-2">
              <label htmlFor="color" className="text-lg my-auto">
                color:
              </label>
              <select
                name="color"
                id="color"
                placeholder="none"
                className="text-lg border-2 border-black p-2 w-full"
              >
                <option value="NONE">none</option>
                <option value="ORANGE">orange</option>
                <option value="RED">red</option>
                <option value="GREEN">green</option>
                <option value="BLUE">blue</option>
                <option value="PURPLE">purple</option>
                <option value="PINK">pink</option>
              </select>
            </div>
            <button
              type="submit"
              className="bg-black text-white text-xl rounded-lg p-2"
            >
              Post
            </button>
            <button
              type="submit"
              className="bg-black text-white text-xl rounded-lg p-2"
              onClick={async () => {
                await fetch("api/post", {
                  method: "POST",
                  body: JSON.stringify({}),
                });
              }}
            >
              Revalidate page
            </button>
            <p className="max-w-[380px]">{loadingStatus}</p>
          </div>
        </form>
        {Array.from(Array(flowersCount)).map((v) => {
          return <FlowerEdit key={"2"} tags={tags} />;
        })}
        <div className="flex gap-2">
          <button
            className="bg-black text-white text-3xl font-extrabold rounded-full p-2 my-auto aspect-square w-14 "
            onClick={() => setFlowerCount(flowersCount + 1)}
          >
            +
          </button>
          <button
            className="bg-black text-white text-3xl font-extrabold rounded-full p-2 my-auto aspect-square w-14 "
            onClick={() => setFlowerCount(flowersCount - 1)}
          >
            -
          </button>
        </div>
      </div>
    </>
  );
}
