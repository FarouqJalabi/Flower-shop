"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface props {
  flower: FlowerInfo;
  user?: Array<{ id: string }>;
  big?: boolean;
}

export default function LikeButton({ flower, user, big = false }: props) {
  // Getting user id
  const router = useRouter();
  const [liked, setLiked] = useState(user ? user.length != 0 : false);

  const addHeart = new CustomEvent("customEvent_updateHeart", {
    detail: { v: 1 },
  });
  const removeHeart = new CustomEvent("customEvent_updateHeart", {
    detail: { v: -1 },
  });

  const likeFlower = async (liked: boolean) => {
    const res = await fetch(`/api/flower/${flower.id}`, {
      method: "PATCH",
      body: JSON.stringify({
        addToList: liked,
        listType: "like",
      }),
    });

    if (!res.ok) {
      console.log(res.statusText);
    }

    console.log(res.statusText);
  };
  return (
    <button
      className={`relative ml-auto my-auto ${
        big ? "w-16" : "w-10"
      } aspect-square z-10`}
      onClick={() => {
        if (user) {
          likeFlower(!liked);
          setLiked(!liked);
          dispatchEvent(!liked ? addHeart : removeHeart);
        } else {
          router.push("/login");
        }
      }}
    >
      <Image
        src={liked ? "/heartFilled.svg" : "/heart.svg"}
        alt={"Heart, your liked flowers"}
        fill
        style={{ objectFit: "contain" }}
      />
    </button>
  );
}
