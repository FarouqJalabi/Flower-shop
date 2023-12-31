import { prisma } from "@/app/db";
import { redirect } from "next/navigation";
import Image from "next/image";
import ShoppingButton from "@/components/shoppingButton";

import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import LikeButton from "@/components/likeButton";
import { Metadata } from "next";

type props = {
  params: { id: string };
};

export const metadata: Metadata = {
  title: "Flower Shop",
  description: "Mock flower shop",
  openGraph: {
    title: "Flower shop: Flower",
    url: "https://flower-shop-three.vercel.app/",
    siteName: "Flower Shop",

    images: [
      {
        url:
          "https://eljnfbtxmeteozramfkt.supabase.co/storage/v1/object/public/flower_images/clksqth2f00019us4xrma6cbg.jpg",
        // "https://eljnfbtxmeteozramfkt.supabase.co/storage/v1/object/public/flower_images/" +
        // params.id +
        // "clksqth2f00019us4xrma6cbg" +
        // ".jpg",
        alt: "Flower image",
        width: 800,
        height: 600,
      },
    ],
    type: "website",
  },
};

export default async function Page({ params }: props) {
  const data = await getServerSession(options);
  const Info: FlowerInfo | null = await prisma.flower.findFirst({
    where: { id: params.id },
    include: {
      tags: true,
      shoppingList: data
        ? {
            where: { id: data?.accessToken },
            select: { id: true },
          }
        : false,
      users: data
        ? {
            where: { id: data?.accessToken },
            select: { id: true },
          }
        : false,
    },
  });
  if (!Info) {
    return redirect("/404");
  }
  return (
    <div className="flex sm:flex-row flex-col ">
      <div className="relative w-full sm:w-80">
        <Image
          src={
            "https://eljnfbtxmeteozramfkt.supabase.co/storage/v1/object/public/flower_images/" +
            Info.id +
            ".jpg"
          }
          alt={Info.alt}
          className="flex-1 max-sm:w-full object-cover"
          priority
          width={800}
          height={600}
        />
      </div>

      <div className="flex-1 px-2 flex flex-col">
        <h1 className="text-3xl">{Info.title}</h1>
        <h2 className="text-2xl">{Info.price}$</h2>
        <p className="whitespace-pre-line">{Info.description}</p>
        <div className="flex gap-2 mt-auto">
          <ShoppingButton
            flower={Info as FlowerInfo}
            user={Info.shoppingList}
          />
          <LikeButton flower={Info} user={Info.users} big={true} />
        </div>
        <div className="flex flex-wrap gap-2 my-2">
          {Info.tags?.map((v) => {
            return (
              <p className="bg-gray-300 p-2 rounded-xl " key={v.tag}>
                {v.tag}
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
}
