"use client";
import Flower from "./flower";
import { FlowerInfo } from ".";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

let example_info: FlowerInfo = {
  id: "0",
  title: "Anemone",
  alt: "The white flower Anemone",
  price: "49.99",
};

export default function FlowersPreview() {
  // amount of times scrolled
  let [scrolled, setScrolled] = useState(0);
  // how many flowers that is shown at once
  let [size, setSize] = useState(3);
  let collectionId: Array<any> = [];

  return (
    <>
      <h1 className="font-jua text-3xl">Create a new Flower Preview</h1>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          console.log("Sent from adminEditor");
          let formData = new FormData(e.currentTarget);

          await fetch("api/post", {
            method: "POST",
            body: JSON.stringify({
              formData: Object.fromEntries(formData),
              flowerData: "flowerDATATA",
            }),
          });
        }}
        className="m-5 flex"
      >
        <div className="flex flex-col gap-3">
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
        </div>
      </form>
    </>
  );
}
