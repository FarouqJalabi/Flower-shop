"use client";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ShoppingButton({
  id,
  user,
}: {
  id: string;
  user: Array<{ id: string }>;
}) {
  const router = useRouter();
  const { status } = useSession();
  const [inCart, setInCart] = useState(user.length == 0);

  // const removeHeart = new Event("customEvent_removeHeart");
  // const addHeart = new Event("customEvent_addHeart");

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
      className="bg-black text-white font-jua text-3xl p-2 rounded-2xl w-full"
      onClick={() => {
        if (status === "authenticated") {
          setInCart(!inCart);
          // likeFlower(!liked);
          // dispatchEvent(!liked ? addHeart : removeHeart);
        } else {
          router.push("/login");
        }
      }}
    >
      {inCart ? "Add to " : "Remove from "}shopping cart
    </button>
  );
}
