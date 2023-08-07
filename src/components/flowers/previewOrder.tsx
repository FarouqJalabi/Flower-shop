"use client";
import Image from "next/image";
import { useState } from "react";
interface props {
  initPreviews: Array<{ id: string; title: string }>;
}

export default function PreviewOrder({ initPreviews }: props) {
  const [previews, setPreviews] = useState(initPreviews);
  const [statusValue, setStatusValue] = useState("");
  return (
    <div className="flex gap-4 flex-col m-2">
      {previews.map((v, index) => {
        return (
          <div key={v.id} className="flex items-center gap-1">
            <div className="flex flex-col text-2xl font-black gap-2">
              <button
                onClick={() => {
                  const prev_copy = [...previews];
                  prev_copy.splice(index, 1);
                  prev_copy.splice(index - 1, 0, v);

                  setPreviews(prev_copy);
                }}
              >
                ↑
              </button>
              <button
                onClick={() => {
                  const prev_copy = [...previews];
                  prev_copy.splice(index, 1);
                  prev_copy.splice(index + 1, 0, v);
                  setPreviews(prev_copy);
                }}
              >
                ↓
              </button>
            </div>
            <h1 className="text-2xl min-w-[15px]">{v.title}</h1>
            <button
              type="submit"
              className={`relative bg-red-500 w-10 aspect-square rounded-full`}
              onClick={async () => {
                setStatusValue("Deleting preview");
                const res = await fetch("api/flowerpreview?id=" + v.id, {
                  method: "DELETE",
                });

                setStatusValue(res.statusText);
                if (res.ok) {
                  // window.location.reload();
                  setPreviews(previews.filter((cv) => cv.id != v.id));
                } else {
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
      <div className="w-72 flex-col text-center">
        <button
          className={`bg-black text-white text-xl rounded-lg p-2 w-full`}
          onClick={async (e) => {
            e.preventDefault();

            setStatusValue("Updating order...");
            const res = await fetch("api/flowerpreview", {
              method: "PATCH",
              body: JSON.stringify({
                previews: previews,
              }),
            });

            setStatusValue(res.statusText);
          }}
        >
          Update order
        </button>
        <p>{statusValue}</p>
      </div>
    </div>
  );
}
