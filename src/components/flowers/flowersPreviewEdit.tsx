"use client";
import React, { useState, createRef } from "react";
import FlowerEdit from "./flowerEdit";

import { createClient } from "@supabase/supabase-js";
export default function FlowersPreviewEdit() {
  let [flowersCount, setFlowerCount] = useState(1);
  let [loadingStatus, setLoadingStatus] = useState("");
  let flowerRef = createRef<HTMLDivElement>();
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
  );

  return (
    <>
      <h1 className="font-jua text-3xl">Create a new Flower Preview</h1>
      <div className="flex flex-wrap gap-4 m-4" ref={flowerRef}>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            let formObject = new FormData(e.currentTarget);
            let formData = Object.fromEntries(formObject);

            let flowersElement = Array.from(
              flowerRef.current?.getElementsByClassName(
                "flowerEdit"
              ) as HTMLCollectionOf<HTMLFormElement>
            );

            let flowersData = flowersElement.map((f) => {
              let fData = new FormData(f);
              return Object.fromEntries(fData);
            });

            setLoadingStatus("Posting form data...");

            await fetch("api/post", {
              method: "POST",
              body: JSON.stringify({
                formData: formData,
                flowersData: flowersData,
              }),
            })
              .then((response) => response.json())
              .then(async (res) => {
                console.log(res);
                setLoadingStatus("Posting images...");
                await res.forEach(async (id: string, i: number) => {
                  const { data, error } = await supabase.storage
                    .from("flower_images")
                    .upload(id + ".jpg", flowersData[i].img, {
                      upsert: false,
                    });
                });

                setLoadingStatus("Done! Check out the main page for changes");
              });
          }}
          className="flex"
        >
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
            <p>{loadingStatus}</p>
          </div>
        </form>
        {Array.from(Array(flowersCount)).map((v) => {
          return <FlowerEdit key={v} />;
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
