"use client";
import Image from "next/image";
import { Prisma } from "prisma/prisma-client";
import LikeButton from "../likeButton";

export default function Flower(Info: FlowerInfo) {
  const onSale = Number(Info.salePrice) < 0.5;
  // * We are able to get if we are liked from preview.flowers.users
  // * Problem is nav
  // if (Info.users) {
  //   console.log(Info.users[0].id);
  // }
  return (
    <div className="text-center">
      <div className="relative w-72 h-40 bg-gray-300 overflow-hidden  rounded-xl">
        <Image
          src={
            "https://eljnfbtxmeteozramfkt.supabase.co/storage/v1/object/public/flower_images/" +
            Info.id +
            ".jpg"
          }
          alt={Info.alt}
          width={288}
          height={160}
          style={{ objectFit: "cover" }}
        />
      </div>
      <div
        className={`absolute bg-red-600 text-white px-3 mt-[-2rem] leading-5 ${
          onSale ? "hidden" : ""
        }  `}
      >
        SALE
      </div>
      <div className="flex px-2 mt-2">
        <div className="text-left">
          <h1 className="font-jua text-xl">{Info.title}</h1>
          <div className="flex flex-wrap gap-2">
            <p
              className={`${onSale ? "" : "line-through"}`}
            >{`${Info.price}$`}</p>
            <p className={`text-red-600`}>
              {/* Reality we checked for it already on sale so ? is kinda unnacecery */}
              {onSale ? "" : Info.salePrice + "$"}
            </p>
          </div>
          {/* <p>{Info.id.toString()}</p> */}
        </div>

        <LikeButton id={Info.id!} />
      </div>
    </div>
  );
}
