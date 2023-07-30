"use client";
import { FormEvent, useState } from "react";
import Image from "next/image";
import FlowerEdit from "./flowers/flowerEdit";
interface props {
  tags: Array<string>;
  flowers: Array<{ title: string; id: string }>;
}
let example_info: FlowerInfo = {
  id: "11",
  title: "Anemone",
  alt: "The white flower Anemone",
  price: 49.99,
  description: "Description",
};

export default function FlowersEdit({ tags, flowers }: props) {
  const [loadingStatus, setLoadingStatus] = useState("");
  //!Bad don't use any
  const apiHandler = async (flower: any, remove = false) => {
    console.log("Updating flowers");
    const res = await fetch("api/flower", {
      method: "POST",
      body: JSON.stringify({
        flower: flower,
        remove: remove,
      }),
    })
      .then(async (res) => {
        if (!res.ok) {
          console.log("Resoponse is not ok", res);
        }
        const body = await res.json();
        console.log(body, "Res body");
      })
      .catch((error) => {
        console.log("Catched typeError error!", error);
      });
    console.log(res, "Whole res");
  };
  const createTag = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let formObject = new FormData(e.currentTarget as HTMLFormElement);
    let formData = Object.fromEntries(formObject);

    setLoadingStatus("Posting tags");
    const res = await fetch("api/postTag", {
      method: "POST",
      body: JSON.stringify({
        tag: formData.tag.toString(),
      }),
    });
    if (res.ok) {
      setLoadingStatus("All done");
      window.location.reload();
    } else {
      setLoadingStatus("Tag already exist");
    }
  };

  return (
    <div className="flex gap-2 m-2 items-center">
      <div>
        <h1 className="text-3xl font-jua">Create new flower</h1>
        <FlowerEdit tags={tags} />
        <button
          type="submit"
          className="bg-black text-white text-xl rounded-lg p-2 w-full"
        >
          Create
        </button>
      </div>
      <div className="bg-gray-400 w-1 h-28 rounded-full mt-8 mx-5"></div>
      <div className="grid grid-rows-2 grid-flow-col gap-2 pt-6 items-center ">
        {flowers.map((flower) => {
          return (
            <div key={flower.id} className="flex gap-2 h-10 items-center">
              <button
                className="relative bg-red-500 w-10 h-10 rounded-full"
                onClick={() => {
                  apiHandler(flower, true);
                }}
              >
                <Image
                  src={"/trash.svg"}
                  alt={"A trash icon"}
                  fill
                  style={{ objectFit: "contain" }}
                  className="p-2"
                />
              </button>
              <p className="text-lg">{flower.title}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
