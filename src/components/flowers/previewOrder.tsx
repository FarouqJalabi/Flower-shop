"use client";
import Image from "next/image";
import { useState } from "react";
interface props {
  initPreviews: Array<{ id: string; title: string }>;
}

export default function PreviewOrder({ initPreviews }: props) {
  const [previews, setPreviews] = useState(initPreviews);
  return (
    <div className="flex  gap-4 flex-wrap m-2">
      {previews.map((v) => {
        return (
          <div key={v.id} className="flex items-center gap-1">
            <h1 className="text-2xl min-w-[15px]">{v.title}</h1>
            <button
              type="submit"
              className={`relative bg-red-500 w-10 aspect-square rounded-full`}
              onClick={async () => {
                console.log("Delete preview!", v.id);
                const res = await fetch("api/flowerpreview?id=" + v.id, {
                  method: "DELETE",
                });

                console.log(res.statusText);
                if (res.ok) {
                  // window.location.reload();
                  setPreviews(previews.filter((cv) => cv.id != v.id));
                }
              }}
            >
              <Image
                src={"/trash.svg"}
                alt={"A trash icon"}
                fill
                className="p-2 object-cover"
              />
            </button>
          </div>
        );
      })}
    </div>
  );
}
