"use client";
import Flower from "./flower";
import { FlowerInfo } from ".";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface props {
  header: string;
  secondHeader: string;
  // Should be Array<string>
  collectionId: Array<any>;
}
let example_info: FlowerInfo = {
  id: "0",
  title: "Anemone",
  alt: "The white flower Anemone",
  price: "49.99",
};

export default function FlowersPreview({
  header,
  secondHeader,
  collectionId,
}: props) {
  // amount of times scrolled
  let [scrolled, setScrolled] = useState(0);
  // how many flowers that is shown at once
  let [size, setSize] = useState(3);
  return (
    <>
      <div className="flex w-[920px] mx-auto py-2">
        <div>
          <h1 className="text-2xl font-extrabold">{header}</h1>
          <h2 className="text-lg ">{secondHeader}</h2>
        </div>
        <Link href={"/"} className="underline text-blue-500 ml-auto my-auto ">
          {"See more ➜"}
        </Link>
      </div>
      <section className="flex gap-8 m-3 justify-center ">
        <button
          className={`w-12 my-auto scale-x-[-1] ${
            scrolled == 0 ? "invisible" : ""
          }`}
          onClick={() => {
            setScrolled(scrolled - 1);
          }}
        >
          <Image
            alt="right button"
            src="/arrowRight.svg"
            width={48}
            height={48}
          />
        </button>
        {/* <Flower info={example_info} />, we want the value not variable */}
        {collectionId
          .slice(scrolled * size, scrolled * size + size)
          .map((v) => {
            return <Flower {...v} key={v.id} />;
          })}
        <div
          className={`invisible ${
            collectionId.slice(scrolled * 3, scrolled * 3 + 3).length < 3
              ? ""
              : "hidden"
          }`}
        >
          <Flower {...example_info} />
        </div>
        <div
          className={`invisible ${
            collectionId.slice(scrolled * 3, scrolled * 3 + 3).length < 2
              ? ""
              : "hidden"
          }`}
        >
          <Flower {...example_info} />
        </div>
        <button
          className={`w-12 my-auto ${
            scrolled * 3 < collectionId.length - 3 ? "" : "invisible"
          }`}
          onClick={() => {
            setScrolled(scrolled + 1);
          }}
        >
          <Image
            alt="right button"
            src="/arrowRight.svg"
            width={48}
            height={48}
          />
        </button>
      </section>
    </>
  );
}
