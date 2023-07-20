"use client";
import Image from "next/image";
import { useGlobalContext } from "@/app/contexts/contextProvider";
import User from "./user";
export default function Nav() {
  // const [heartAmount, setHeartAmount] = useCounter("heart");
  const { hearts } = useGlobalContext();
  // console.log("Run nav");
  return (
    <nav className="flex gap-5 p-2">
      {/* We want this in one <a> tag for tabbing between links*/}
      <a href="/" className="flex max-sm:w-11">
        <Image
          src={"/logo.png"}
          alt={"pink flower logo"}
          priority
          width={56}
          height={56}
          style={{ objectFit: "contain" }}
        />

        <h1 className="m-auto ml-2 text-xl sm:text-2xl ">Flower Shop</h1>
      </a>

      <User />

      {/* Handling case over 10, not vertically centering text*/}
      {/* mr-2 because of amount of things in bag */}
      <div className="relative my-auto w-10 sm:w-12  aspect-square mr-2">
        <div className="rounded-full bg-red-500 w-6 h-6 absolute z-10 ml-6 sm:ml-8 -mt-3 sm:-mt-2 flex items-center justify-center text-white">
          {hearts.size}
        </div>
        <Image
          src={"/navHeart.svg"}
          alt={"Heart, your liked flowers"}
          fill
          style={{ objectFit: "contain" }}
        />
      </div>
      {/* mr-2 because of amount of things in bag */}
      <div className="relative my-auto w-10 sm:w-12 aspect-square mr-2">
        <div className="rounded-full bg-red-500 w-6 h-6 absolute z-10 ml-7 sm:ml-9 -mt-3 sm:-mt-2 flex items-center justify-center text-white">
          3
        </div>
        <Image
          src={"/cart.svg"}
          alt={"Heart, your liked flowers"}
          fill
          style={{ objectFit: "contain" }}
        />
      </div>

      <div className="mr-1"></div>
    </nav>
  );
}
