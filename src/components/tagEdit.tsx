"use client";
import { FormEvent, useState } from "react";
import Image from "next/image";
interface props {
  tags: Array<string>;
}
export default function TagEdit({ tags }: props) {
  const [loadingStatus, setLoadingStatus] = useState("");
  const createTag = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let formObject = new FormData(e.currentTarget as HTMLFormElement);
    let formData = Object.fromEntries(formObject);
    if (formData.tag.toString() == "") {
      setLoadingStatus("Can't post empty tag");
      return;
    }
    setLoadingStatus("Posting tags");
    const res = await fetch("api/postTag", {
      method: "POST",
      body: JSON.stringify({
        tag: formData.tag.toString().toLowerCase(),
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
      <form className="flex flex-col w-min gap-2" onSubmit={createTag}>
        <h1 className="text-3xl font-jua">Create new tag</h1>
        <input
          type="text"
          name="tag"
          placeholder="tag"
          className="text-lg border-2 border-black p-2"
          onChange={() => setLoadingStatus("")}
        />
        <button
          type="submit"
          className="bg-black text-white text-xl rounded-lg p-2"
        >
          Create
        </button>
        <p>{loadingStatus} </p>
      </form>
      <div className="bg-gray-400 w-1 h-28 rounded-full mt-8 mx-5"></div>
      <div className="grid grid-rows-2 grid-flow-col gap-2 pt-6 items-center ">
        {tags.map((tag) => {
          return (
            <div key={tag} className="flex gap-2 h-10 items-center">
              <button
                className="relative bg-red-500 w-10 h-10 rounded-full"
                onClick={async () => {
                  setLoadingStatus("Deleting tag...");
                  const res = await fetch("api/postTag", {
                    method: "POST",
                    body: JSON.stringify({
                      tag: tag,
                      deleteTag: true,
                    }),
                  });
                  if (res.ok) {
                    setLoadingStatus("All done");
                    window.location.reload();
                  } else {
                    setLoadingStatus(
                      "Something went wrong. Refresh and try again"
                    );
                  }
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
              <p className="text-lg">{tag}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
