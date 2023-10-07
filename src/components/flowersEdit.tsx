"use client";
import { useState } from "react";
import Image from "next/image";
import FlowerEdit from "./flowers/flowerEdit";
interface props {
  tags: Array<string>;
  flowers: Array<{ title: string; id: string }>;
}

export default function FlowersEdit({ tags, flowers }: props) {
  const [loadingStatus, setLoadingStatus] = useState("");

  const deleteFlower = async (flower: { id: string; title: string }) => {
    setLoadingStatus("Deleting flower...");
    const res = await fetch(`api/flower/${flower.id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      // const data = await res.json();
      setLoadingStatus(res.statusText);
      window.location.reload();
    } else {
      // console.log("res not ok", res);
      setLoadingStatus(res.statusText);
    }
  };

  return (
    <div className="flex gap-2 m-2 items-center">
      <div>
        <h1 className="text-3xl font-jua">Create new flower</h1>
        <FlowerEdit tags={tags} standAlone={true} />

        <p>{loadingStatus}</p>
      </div>
      <div className="bg-gray-400 w-1 h-28 rounded-full mt-8 mx-5"></div>
      <div className="grid grid-rows-2 grid-flow-col gap-2 pt-6 items-center overflow-x-auto w-full overflow-y-hidden">
        {flowers.map((flower) => {
          return (
            <div key={flower.id} className="flex gap-2 h-15 items-center">
              <button
                className="relative bg-red-500 w-10 h-10 rounded-full aspect-square"
                onClick={() => {
                  deleteFlower(flower);
                }}
              >
                <Image
                  src={"/trash.svg"}
                  alt={"A trash icon"}
                  fill
                  className="p-2 object-cover"
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
