"use client";
import Image from "next/image";
import ShoppingButton from "./shoppingButton";
import LikeButton from "./likeButton";

interface props {
  Info: FlowerInfo;
}
export default function MiniFlower({ Info }: props) {
  return (
    <div className="flex m-2  gap-2">
      <Image
        src={
          "https://eljnfbtxmeteozramfkt.supabase.co/storage/v1/object/public/flower_images/" +
          Info.id +
          ".jpg"
        }
        alt={Info.alt}
        width={60}
        height={60}
        className="object-cover w-20 aspect-square rounded-lg"
      />
      <div>
        <h1>{Info.title}</h1>
        <h1>{Info.price}$</h1>
        <div className="flex gap-2">
          <ShoppingButton flower={Info} small={true} user={Info.shoppingList} />
          <LikeButton flower={Info} user={Info.users} />
        </div>
      </div>
    </div>
  );
}
