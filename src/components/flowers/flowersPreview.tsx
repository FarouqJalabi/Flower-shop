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
  if (color) {
    color = color.toLowerCase();
  } else {
    color = "none";
  }

  const buttonScroll = (
    e: React.MouseEvent<HTMLButtonElement>,
    dir: 1 | -1
  ) => {
    const container = e.currentTarget.parentElement as HTMLElement;
    const flowerContainer = container?.children[0];
    const flowersScrollers = Array.from(
      flowerContainer?.getElementsByClassName("scrollTo")
    ) as Array<HTMLElement>;

    // ! Bad running through all flowers
    // * Take advantage of the fact they are sorted!
    // Outside flower is the flower we wawnt most to the left
    let outsideFlower = flowersScrollers.reduce((prev, curr) => {
      let prevDifference = Math.abs(
        prev.getBoundingClientRect().right - window.innerWidth * dir
      );
      let currDifference = Math.abs(
        curr.getBoundingClientRect().right - window.innerWidth * dir
      );
      return prevDifference < currDifference ? prev : curr;
    });

    outsideFlower.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
  };

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
            <Link
              href={"/search/1"}
              className="underline text-black ml-auto my-auto "
            >
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
          <h2 className="text-lg whitespace-pre-line">{secondHeader}</h2>
        </div>
        <Link
          href={"/search/1"}
          className="underline text-blue-500 ml-auto my-auto "
        >
          {"See more ➜"}
        </Link>
      </div>
      <div className="relative">
        <div
          className={`flex gap-4  sm:gap-8 pt-3 overflow-x-scroll relative bg-${color}-300 `}
        >
          <div className="sm:pl-12 scrollTo"></div>
          {collectionId.map((v, i) => {
            return <Flower Info={v} key={v.id} scrollIndex={i} />;
          })}
          <div className="sm:pl-12 scrollTo"></div>
        </div>
        <button
          className="absolute top-1/2 -translate-y-1/2 -scale-x-100 mx-4 max-sm:hidden "
          onClick={(e) => {
            buttonScroll(e, -1);
          }}
        >
          <Image
            src={"arrowRight.svg"}
            width={50}
            height={50}
            alt="Left button with white background"
          />
        </button>
        <button
          className="absolute top-1/2 -translate-y-1/2 right-0 mx-4 max-sm:hidden "
          onClick={(e) => {
            buttonScroll(e, 1);
          }}
        >
          <Image
            src={"arrowRight.svg"}
            width={50}
            height={50}
            alt="Right button with white background"
          />
        </button>
      </div>
    </section>
  );
}
