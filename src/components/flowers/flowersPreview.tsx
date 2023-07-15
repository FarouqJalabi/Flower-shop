"use client";
import Flower from "./flower";
import { FlowerInfo } from ".";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

let example_info: FlowerInfo = {
  id: 0,
  name: "Anemone",
  alt: "The weight flower Anemone.",
  price: 49.99,
};

export default function FlowersPreview() {
  let example_ids = [0, 1, 2, 3, 4, 5, 6];

  // amount of times scrolled
  let [scrolled, setScrolled] = useState(0);
  // how many flowers that is shown at once
  let [size, setSize] = useState(3);
  return (
    <>
      <div className="flex px-3 py-2">
        <h1 className="text-2xl font-bold">Just some of our collection</h1>
        <Link
          href={"/about"}
          className="underline text-blue-500 ml-auto my-auto "
        >
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
            console.log();
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
        {example_ids.slice(scrolled * size, scrolled * size + size).map((v) => {
          example_info.id = v;
          return <Flower {...example_info} key={v} />;
        })}
        <div
          className={`invisible ${
            example_ids.slice(scrolled * 3, scrolled * 3 + 3).length < 3
              ? ""
              : "hidden"
          }`}
        >
          <Flower {...example_info} />
        </div>
        <div
          className={`invisible ${
            example_ids.slice(scrolled * 3, scrolled * 3 + 3).length < 2
              ? ""
              : "hidden"
          }`}
        >
          <Flower {...example_info} />
        </div>
        <button
          className={`w-12 my-auto ${
            scrolled * 3 < example_ids.length - 3 ? "" : "invisible"
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
