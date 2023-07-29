"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";

interface props {
  initLikes: number;
}

export default function Heart({ initLikes = 0 }: props) {
  //Maybe get server session
  const [liked, setLiked] = useState(initLikes);
  const [listHidden, setListHidden] = useState(true);

  const updateHeart = (e: CustomEventInit) => {
    setLiked(liked + e.detail.v);
  };

  useEffect(() => {
    window.addEventListener("customEvent_updateHeart", updateHeart);
    return () => {
      window.removeEventListener("customEvent_updateHeart", updateHeart);
    };
  }, [liked, updateHeart]);

  return (
    <Link
      className="relative my-auto w-10 sm:w-12 aspect-square mr-2"
      href="/hearts"
    >
      <div className="rounded-full bg-red-500 w-6 h-6 absolute z-10 right-[-10px] top-[-10px] flex items-center justify-center text-white">
        {liked}
      </div>
      <Image
        src={"/navHeart.svg"}
        alt={"Heart, your liked flowers"}
        fill
        style={{ objectFit: "contain" }}
      />
    </Link>
  );
}
