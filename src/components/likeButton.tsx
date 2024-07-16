"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LikeButton({
  id,
  user,
}: {
  id: string;
  user?: Array<{ id: string }>;
}) {
  // Getting user id
  const router = useRouter();
  // const { status } = useSession();
  const [liked, setLiked] = useState(user ? user.length != 0 : false);

  const removeHeart = new Event("customEvent_removeHeart");
  const addHeart = new Event("customEvent_addHeart");

  const likeFlower = async (liked: boolean) => {
    await fetch("api/flowerLiked", {
      method: "POST",
      body: JSON.stringify({
        flowerLiked: liked,
        flowerId: id,
      }),
    });
  };
  return (
    <button
      className="relative ml-auto my-auto w-10 aspect-square z-10"
      onClick={() => {
        // if (status === "authenticated") {
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
