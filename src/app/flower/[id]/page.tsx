import { prisma } from "@/app/db";
import { redirect } from "next/navigation";
import Image from "next/image";
import ShoppingButton from "@/components/shoppingButton";

import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import LikeButton from "@/components/likeButton";

export default async function Page(props: any) {
  const data = await getServerSession(options);
  const Info: FlowerInfo | null = await prisma.flower.findFirst({
    where: { id: props.params.id },
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
      <Image
        src={
          "https://eljnfbtxmeteozramfkt.supabase.co/storage/v1/object/public/flower_images/" +
          Info.id +
          ".jpg"
        }
        alt={Info.alt}
        width={288}
        height={160}
        className="flex-1 max-sm:w-full object-cover"
        sizes="(max-width: 640px) 100vw, 40vw"
        priority
      />
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
        <div className="flex gap-2 my-2">
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
