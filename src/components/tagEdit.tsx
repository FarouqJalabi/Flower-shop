"use client";
import { FormEvent, useState } from "react";

// Use callback so it don't rerender infitelly
export default function TagEdit() {
  const [loadingStatus, setLoadingStatus] = useState("");
  const createTag = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let formObject = new FormData(e.currentTarget as HTMLFormElement);
    let formData = Object.fromEntries(formObject);
    setLoadingStatus("Posting tags");
    const res = await fetch("api/postTag", {
      method: "POST",
      body: JSON.stringify({
        tag: formData.tag.toString().toLowerCase(),
      }),
    });
    if (res.ok) {
      setLoadingStatus("All done");
    } else {
      setLoadingStatus("Tag already exist");
    }
  };

  return (
    <>
      <h1 className="text-3xl font-jua">Create new tag</h1>
      <form className="flex flex-col w-min gap-2 m-2" onSubmit={createTag}>
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
    </>
  );
}
