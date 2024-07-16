"use client";
import Image from "next/image";
import { useGlobalContext } from "@/app/context/store";

export default function LikeButton({ id }: { id: string }) {
  const { hearts, addHeart, removeHeart } = useGlobalContext();

  return (
    <button
      className="relative ml-auto my-auto w-10 aspect-square "
      onClick={() => {
        hearts.has(id) ? removeHeart(id) : addHeart(id);
      }}
    >
      <Image
        src={hearts.has(id) ? "/heartFilled.svg" : "/heart.svg"}
        alt={"Heart, your liked flowers"}
        fill
        style={{ objectFit: "contain" }}
      />
    </button>
  );
}
