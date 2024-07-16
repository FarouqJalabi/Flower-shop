import { useState, FormEvent } from "react";
import { supabase } from "@/app/db/supabase";
import Image from "next/image";
interface props {
  tags: Array<string>;
  standAlone?: boolean;
  flowerKey?: number;
  removeFlower?: (flowerKeu: number) => void;
}

export default function FlowerEdit({
  tags,
  standAlone = false,
  flowerKey,
  removeFlower,
}: props) {
  const [loadingStatus, setLoadingStatus] = useState("");
  const [imgPreview, setImgPreview] = useState("");
  const handle_form = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (!standAlone) return;
    let formObject = new FormData(e.currentTarget as HTMLFormElement);
    let formData = Object.fromEntries(formObject) as Record<string, any>;

    //Validation
    const someEmpty = Object.values(formData).some((v, i) => {
      if (v.name == "") {
        setLoadingStatus("The form has an empty image input");

        return true;
      }
      if (v == "" && i != 5) {
        setLoadingStatus("The form has an empty text input");
        return true;
      }
      return false;
    });
    if (someEmpty) {
      return;
    }

    setLoadingStatus("Posting flower...");
    //Adding tags as list in connect
    const tagsList = Object.keys(formData).filter((v) => {
      if (v.startsWith("tag")) {
        delete formData[v];
        return true;
      }
    });

    formData.tags = {};
    formData.tags.connect = tagsList.map((v) => {
      return {
        tag: v.substring(3),
      };
    });

    const res = await fetch("api/flower/dontMatter", {
      method: "POST",
      body: JSON.stringify({
        flower: { ...formData },
      }),
    });

    if (res.ok) {
      setLoadingStatus("Uploading image...");
      if (!supabase) {
        setLoadingStatus("Can't upload images :(");
        return;
      }
      const body = await res.json();
      const { data, error } = await supabase.storage
        .from("flower_images")
        .upload(body.id + ".jpg", formData.img, {
          upsert: false,
        });

      setLoadingStatus("Posted flower");
      console.log(body.id);
    } else {
      console.log(res);
    }
  };
  return (
    <form
      className="flex flex-col gap-2 w-52 sm:w-72 flowerEdit"
      onSubmit={handle_form}
    >
      <div className="relative w-52 h-28 sm:w-72 sm:h-40 bg-gray-200 overflow-hidden rounded-xl flex items-center justify-center">
        <input
          type="file"
          name="img"
          accept="image/*"
          className="text-xl p-2 top-0 bottom-0 my-auto z-10 hidden object-cover"
          id={"inputFile" + flowerKey}
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
          htmlFor={"inputFile" + flowerKey}
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
      <input
        type="text"
        name="alt"
        placeholder="alt text"
        className="bg-gray-200 focus:border-none focus:outline-none p-2 rounded-md text-base"
      />
      <div className="flex items-center gap-2">
        <input
          type="text"
          name="title"
          placeholder="Title"
          className="bg-gray-200 focus:border-none focus:outline-none p-2 rounded-md text-2xl font-jua w-3/4"
        />
        <button
          type="submit"
          className={`relative bg-red-500 w-10 aspect-square rounded-full ${
            standAlone ? "hidden" : ""
          }`}
          onClick={() => {
            // console.log("delete", flowerKey);
            removeFlower?.(flowerKey!);
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
      <textarea
        rows={3}
        name="description"
        placeholder="Description"
        className="bg-gray-200 focus:border-none focus:outline-none p-2 rounded-md text-base"
      />
      <div className="flex gap-2 w-full ">
        <input
          type="number"
          name="price"
          id="price"
          min={0}
          step="0.01"
          placeholder="Price"
          className="bg-gray-200 focus:border-none focus:outline-none p-2 rounded-md  w-1/2"
        />
        <input
          type="number"
          step="0.01"
          name="salePrice"
          placeholder="Sale price?"
          min={0}
          className="bg-gray-200 focus:border-none focus:outline-none p-2 rounded-md  w-1/2"
        />
      </div>
      <div className="grid grid-cols-2 w-full max-h-64 overflow-y-scroll gap-y-1 h-min text-sm">
        {tags.map((v: string) => {
          return (
            <div key={v}>
              <input type="checkbox" name={`tag${v}`} id={v + flowerKey} />
              <label htmlFor={v + flowerKey}>{v}</label>
            </div>
          );
        })}
      </div>
      <button
        type="submit"
        className={`bg-black text-white text-xl rounded-lg p-2 w-full ${
          standAlone ? "" : "hidden"
        }`}
      >
        Create
      </button>
      <p className="text-center">{loadingStatus}</p>
    </form>
  );
}
