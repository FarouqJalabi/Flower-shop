import { useState, FormEvent } from "react";
import { createClient } from "@supabase/supabase-js";

interface props {
  tags: Array<string>;
  standAlone?: boolean;
}

export default function FlowerEdit({ tags, standAlone = false }: props) {
  const [loadingStatus, setLoadingStatus] = useState("");
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
  );
  const handle_form = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
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
      className="flex flex-col gap-2 w-64 flowerEdit"
      onSubmit={handle_form}
    >
      <input
        type="text"
        name="title"
        placeholder="Title"
        className="text-xl border-2 border-black p-2"
      />
      <input
        type="file"
        name="img"
        className="text-xl border-2 border-black p-2"
      />

      <input
        type="text"
        name="alt"
        placeholder="alt text"
        className="text-xl border-2 border-black p-2"
      />
      <textarea
        rows={3}
        name="description"
        placeholder="Description"
        className="text-xl border-2 border-black p-2"
      />
      <input
        type="number"
        name="price"
        id="price"
        min={0}
        step="0.01"
        placeholder="Price"
        className="text-xl border-2 border-black p-2"
      />
      <input
        type="number"
        step="0.01"
        name="salePrice"
        placeholder="Sale price"
        min={0}
        className="text-xl border-2 border-black p-2"
      />
      <div className="flex flex-col">
        {tags.map((v: string) => {
          return (
            <div key={v}>
              <input type="checkbox" name={`tag${v}`} id={v} />
              <label htmlFor={v}>{v}</label>
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
