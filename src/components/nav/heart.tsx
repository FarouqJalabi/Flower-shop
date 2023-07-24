"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

interface props {
  initLikes: number;
}

export default function Heart({ initLikes }: props) {
  //Maybe get server session
  const [likes, setLiked] = useState(initLikes);
  useEffect(() => {
    window.addEventListener("customEvent_addHeart", () => {
      setLiked(likes + 1);
      console.log("+1");
    });
    window.addEventListener("customEvent_removeHeart", () => {
      setLiked(likes - 1);
      console.log("-1");
    });

    return () => {
      window.removeEventListener("customEvent_addHeart", () => {
        setLiked(likes + 1);
      });
      window.removeEventListener("customEvent_removeHeart", () => {
        setLiked(likes - 1);
      });
    };
  }, [likes]);
  return (
    <div
      className="relative my-auto w-10 sm:w-12  aspect-square mr-2"
      onClick={() => {
        setLiked(likes + 1);
      }}
    >
      <div className="rounded-full bg-red-500 w-6 h-6 absolute z-10 ml-6 sm:ml-8 -mt-3 sm:-mt-2 flex items-center justify-center text-white">
        {likes.toString()}
      </div>
      <Image
        src={"/navHeart.svg"}
        alt={"Heart, your liked flowers"}
        fill
        style={{ objectFit: "contain" }}
      />
    </div>
  );
}
