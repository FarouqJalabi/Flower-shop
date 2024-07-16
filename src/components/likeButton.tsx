"use client";
import Image from "next/image";
import { useGlobalContext } from "@/app/contexts/contextProvider";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LikeButton({ id }: { id: string }) {
  // Getting user id
  const router = useRouter();
  const { hearts, addHeart, removeHeart } = useGlobalContext();
  const { status } = useSession();
  console.log(status);

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
        if (status === "authenticated") {
          hearts.has(id) ? removeHeart(id) : addHeart(id);
          likeFlower(!hearts.has(id));
        } else {
          router.push("/login");
        }
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
