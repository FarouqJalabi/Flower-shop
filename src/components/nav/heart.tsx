"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import MiniFlower from "../miniFlower";

interface props {
  initLikes: Array<FlowerInfo>;
}

export default function Heart({ initLikes }: props) {
  //Maybe get server session
  const [liked, setLiked] = useState(initLikes);
  const [listHidden, setListHidden] = useState(true);

  const updateHeart = (e: CustomEventInit) => {
    const in_likes = liked.reduce((v, flower) => {
      return flower.id === e.detail.flower.id || v;
    }, false);

    if (in_likes) {
      let liked_copy = [...liked];
      liked_copy = liked_copy.filter((f) => f.id !== e.detail.flower.id);
      setLiked(liked_copy);
    } else {
      setLiked((prev_liked) => [...prev_liked, e.detail.flower]);
    }
  };

  useEffect(() => {
    window.addEventListener("customEvent_updateHeart", updateHeart);
    return () => {
      window.removeEventListener("customEvent_updateHeart", updateHeart);
    };
  }, [liked, updateHeart]);

  return (
    <div
      className="relative my-auto"
      onBlur={(e) => {
        console.log(e.relatedTarget, "?");
        if (e.relatedTarget != null) {
          setListHidden(true);
        }
      }}
    >
      <button
        className="relative my-auto w-10 sm:w-12 aspect-square mr-2"
        onClick={() => {
          setListHidden(!listHidden);
        }}
      >
        <div className="rounded-full bg-red-500 w-6 h-6 absolute z-10 right-[-10px] top-[-10px] text-white">
          {liked.length}
        </div>
        <Image
          src={"/navHeart.svg"}
          alt={"Heart, your liked flowers"}
          fill
          style={{ objectFit: "contain" }}
        />
      </button>
      <div
        className={`w-96 h-48 overflow-y-auto bg-red-500 absolute right-0 shadow-2xl z-10 ${
          listHidden ? "hidden" : ""
        }`}
      >
        {liked.map((f) => {
          return <MiniFlower Info={f} key={f.id} />;
        })}
      </div>
    </div>
  );
}
