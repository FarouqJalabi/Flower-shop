"use client";
import Flower from "./flower";
import Image from "next/image";
import Link from "next/link";
interface props {
  header: string;
  secondHeader: string;
  // Should be Array<string>
  collectionId: Array<FlowerInfo>;
  color?: string;
  id?: string;
}

// ! Shouldn't be any
const test = "bg-orange-500 bg-orange-300";
export default function FlowersPreview({
  header,
  secondHeader,
  collectionId,
  color,
  id,
}: props) {
  const scroll_speed = 500;
  return (
    <section>
      <div
        className={`bg-${color}-500 flex px-10 pt-10 justify-center ${
          color ? "" : "hidden"
        }`}
      >
        <div className="flex-1 px-16 pt-16">
          <h1 className="text-3xl font-bold">{header}</h1>
          <p className="text-lg ">{secondHeader}</p>
          <Link href={"/"} className="underline text-black ml-auto my-auto ">
            {"See more ➜"}
          </Link>
        </div>
        <Image
          src={"/flowers-in-pots.jpg"}
          alt="Different flowers in different kind of pots"
          width={480}
          height={480}
          className="object-cover flex-1"
        />
      </div>
      <div className={`flex py-2 px-16 ${color ? "hidden" : ""}`}>
        <div>
          <h1 className="text-2xl font-extrabold">{header}</h1>
          <h2 className="text-lg ">{secondHeader}</h2>
        </div>
        <Link href={"/"} className="underline text-blue-500 ml-auto my-auto ">
          {"See more ➜"}
        </Link>
      </div>
      <div className="relative">
        <div
          className={`flex gap-8 pt-3 overflow-x-scroll relative bg-${color}-300`}
        >
          <div className="ml-12"></div>
          {/* <Flower info={example_info} />, we want the value not variable */}
          {collectionId.map((v) => {
            return <Flower {...v} key={v.id} />;
          })}
          <div className="ml-12"></div>
        </div>

        <Image
          src={"/arrowRight.svg"}
          alt="Left arrow"
          width={48}
          height={48}
          className={`absolute -scale-100 bg-white rounded-full w-12 h-12 top-1/2 -translate-y-1/2 left-4 `}
          onClick={(e) => {
            e.currentTarget.parentElement?.firstElementChild?.scrollBy(
              -scroll_speed,
              0
            );
          }}
        />
        <Image
          src={"/arrowRight.svg"}
          alt="Left arrow"
          width={48}
          height={48}
          className="absolute  bg-white rounded-full w-12 h-12 top-1/2 -translate-y-1/2 right-4"
          onClick={(e) => {
            e.currentTarget.parentElement?.firstElementChild?.scrollBy(
              scroll_speed,
              0
            );
          }}
        />
      </div>
    </section>
  );
}
