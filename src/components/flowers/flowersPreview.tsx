"use client";
import Flower from "./flower";
import Image from "next/image";
import Link from "next/link";
interface props {
  header: string;
  secondHeader: string;
  // Should be Array<string>
  collectionId: Array<FlowerInfo>;
  color: string;
  alt?: string;
  id: string;
}

//Loadig the colors for tailwind
const test =
  "bg-orange-500 bg-orange-300 bg-red-500 bg-red-300 bg-green-500 bg-green-300 bg-blue-500 bg-blue-300 bg-purple-500 bg-purple-300 bg-pink-500 bg-pink-300";

export default function FlowersPreview({
  header,
  secondHeader,
  collectionId,
  alt,
  color,
  id,
}: props) {
  const scroll_speed = 500;
  if (color) {
    color = color.toLowerCase();
  } else {
    color = "none";
  }
  return (
    <section>
      {color != "none" && (
        <div
          className={`bg-${color}-500 flex px-4 sm:px-10 pt-10 justify-center ${
            color == "none" ? "hidden" : ""
          }`}
        >
          <div className="flex-1  max-sm:pb-4 sm:px-16 pt-16">
            <h1 className="text-3xl font-bold">{header}</h1>
            <p className="text-lg  whitespace-pre-line">{secondHeader}</p>
            <Link href={"/"} className="underline text-black ml-auto my-auto ">
              {"See more ➜"}
            </Link>
          </div>
          <Image
            src={
              "https://eljnfbtxmeteozramfkt.supabase.co/storage/v1/object/public/preview_images/" +
              id +
              ".jpg"
            }
            alt={alt!}
            width={480}
            height={300}
            className="object-cover flex-1 max-sm:w-12 w-64 max-w-full "
          />
        </div>
      )}

      <div className={`flex py-2 px-16 ${color == "none" ? "" : "hidden"}`}>
        <div>
          <h1 className="text-2xl font-extrabold">{header}</h1>
          <h2 className="text-lg">{secondHeader}</h2>
        </div>
        <Link href={"/"} className="underline text-blue-500 ml-auto my-auto ">
          {"See more ➜"}
        </Link>
      </div>
      <div className="relative">
        <div
          className={`flex gap-8 pt-3 overflow-x-scroll relative bg-${color}-300 scrollbar-none`}
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
