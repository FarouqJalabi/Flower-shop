"use client";
import Image from "next/image";
import { useState } from "react";

export default function Contact() {
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  return (
    <div className="flex-1">
      <div className="flex relative gap-2 ">
        <h1 className="text-3xl font-jua">Contact me</h1>
        <div className="relative aspect-square h-12 mt-[-16px]  ">
          <Image
            src={"/messages.svg"}
            alt={"An outline of a profile picture with a tic"}
            fill
            style={{ objectFit: "contain" }}
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <input
          type="text"
          className="text-xl font-jua focus:border-2 focus:outline-none p-2 rounded-md bg-black border-2"
          placeholder="Subject"
          onChange={(e) => {
            setSubject(e.target.value);
          }}
        />
        <textarea
          rows={3}
          className="text-xl font-jua focus:border-2 border-2 focus:outline-none p-2 rounded-md bg-black"
          placeholder="Content"
          onChange={(e) => {
            setContent(e.target.value);
          }}
        />
        <a
          href={`mailto:Farouqjalabi@gmail.com?subject=${encodeURIComponent(
            subject
          )}&body=${encodeURIComponent(content)}`}
          className="underline"
        >
          Submit
        </a>
      </div>
    </div>
  );
}
