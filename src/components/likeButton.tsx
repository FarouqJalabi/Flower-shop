"use client";
import Image from "next/image";
import { useGlobalContext } from "@/app/contexts/contextProvider";

export default function LikeButton({ id }: { id: string }) {
  // Getting user id
  const { hearts, addHeart, removeHeart } = useGlobalContext();
  const likeFlower = async () => {
    await fetch("api/postLike", {
      method: "POST",
      body: JSON.stringify({
        userId: 2,
        flowerId: id,
      }),
    });
  };
  return (
    <button
      className="relative ml-auto my-auto w-10 aspect-square "
      onClick={() => {
        hearts.has(id) ? removeHeart(id) : addHeart(id);
        likeFlower();
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
