"use client";
import React, { useState, createRef, FormEvent } from "react";
import FlowerEdit from "./flowerEdit";
import { supabase } from "@/app/db/supabase";
interface props {
  tags: Array<string>;
}

export default function FlowersPreviewEdit({ tags }: props) {
  const [flowersCount, setFlowerCount] = useState([0]);
  const [loadingStatus, setLoadingStatus] = useState("");
  const [imgPreview, setImgPreview] = useState("");

  let flowerRef = createRef<HTMLDivElement>();

  const removeFlower = (flowerKey: number) => {
    const indexFlower = flowersCount.indexOf(flowerKey);
    const copyCount = [...flowersCount];
    if (indexFlower > -1) {
      // only splice array when item is found
      copyCount.splice(indexFlower, 1); // 2nd parameter means remove one item only
    }

    setFlowerCount(copyCount);
  };
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

    const res = await fetch("api/flowerpreview", {
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
    <div ref={flowerRef}>
      <form
        onSubmit={handle_form}
        id="mainForm"
        className="flex flex-col gap-2 "
      >
        <h1 className="font-jua text-3xl">Create a new Flower Preview</h1>
        <div className="flex gap-10 mx-2">
          <div className="flex flex-col gap-2 ">
            <input
              type="text"
              name="title"
              placeholder="Title"
              className="bg-gray-200 focus:border-none focus:outline-none p-2 rounded-md text-2xl font-extrabold w-3/4"
            />
            <input
              type="text"
              name="underTitle"
              placeholder="underTitle/description"
              className="bg-gray-200 focus:border-none focus:outline-none p-2 rounded-md text-xl w-full "
            />
          </div>

          <div className="flex gap-2">
            <div className="relative w-52 h-28 bg-gray-200 overflow-hidden flex justify-center items-center">
              <input
                type="file"
                name="img"
                accept="image/*"
                id="fileMain"
                className="text-xl p-2 top-0 bottom-0 my-auto z-10 hidden object-cover"
                onChange={(e) => {
                  let target = e.target;
                  let files = target.files;
                  if (FileReader && files && files.length) {
                    var fr = new FileReader();
                    fr.onload = () => {
                      setImgPreview(fr.result as string);
                    };
                    fr.readAsDataURL(files[0]);
                  } else {
                    setImgPreview("");
                  }
                }}
              />
              <label
                htmlFor="fileMain"
                className="bg-gray-200 h-min text-base p-2 rounded-lg z-20 cursor-pointer"
              >
                Upload Image
              </label>
              <img
                src={imgPreview}
                className={`w-full h-full absolute pointer-events-none ${
                  imgPreview == "" ? "hidden" : ""
                }`}
              />
            </div>

            <div className="flex flex-col gap-2">
              <input
                type="text"
                name="alt"
                placeholder="alt text"
                className="bg-gray-200 focus:border-none focus:outline-none p-2 rounded-md "
              />

              <div className="flex gap-2">
                <label htmlFor="color" className="text-lg my-auto">
                  color:
                </label>
                <select
                  name="color"
                  id="color"
                  placeholder="none"
                  className="bg-gray-200 focus:border-none focus:outline-none p-2 rounded-md w-full"
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
            </div>
          </div>
        </div>
      </form>

      {/* Flowers */}
      <div
        className={`flex gap-8 pt-3 overflow-x-scroll relative bg-color-300 scrollbar-none`}
      >
        <div className="ml-12"></div>
        {flowersCount.map((v) => {
          return (
            <FlowerEdit
              key={v}
              tags={tags}
              flowerKey={v}
              removeFlower={removeFlower}
            />
          );
        })}
        <button
          className="w-52 h-28 sm:w-72 sm:h-40 bg-gray-200 rounded-xl inline-flex justify-center items-center font-jua text-5xl mb-[304px]"
          onClick={() => {
            setFlowerCount([
              ...flowersCount,
              flowersCount[flowersCount.length - 1] + 1,
            ]);
          }}
        >
          <div className="w-52 h-28 sm:w-72 sm:h-40 text-center leading-[7rem] sm:leading-[10rem] ">
            +
          </div>
        </button>

        <div className="ml-12"></div>
      </div>

      <div className="flex flex-col gap-2 w-72">
        <button
          type="submit"
          form="mainForm"
          className="bg-black text-white text-xl rounded-lg p-2"
        >
          Post
        </button>

        <p className="max-w-[380px]">{loadingStatus}</p>
      </div>
    </div>
  );
}

/*
 */
