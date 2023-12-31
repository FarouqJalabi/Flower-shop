import Hero from "../components/hero";
import FlowersPreview from "@/components/flowers/flowersPreview";
import { prisma } from "./db";

import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";

export default async function Home() {
  const data = await getServerSession(options);
  console.log(data, "sessions  ");
  let flowerPreviews = await prisma.flowerPreviews.findMany({
    orderBy: [
      {
        order: "asc",
      },
    ],
    include: {
      flowers:
        data == null
          ? true
          : {
              include: {
                users: {
                  where: { id: data?.accessToken },
                  select: { id: true },
                },
              },
            },
    },
  });
  flowerPreviews = flowerPreviews.reverse(); //Newest on top!

  return (
    <main>
      <Hero />
      {flowerPreviews.map(async (v) => {
        return (
          <FlowersPreview
            key={v.id}
            header={v.title}
            secondHeader={v.underTitle as string}
            collectionId={v.flowers}
            color={v.color!}
            alt={v.alt!}
            id={v.id}
          />
        );
      })}
    </main>
  );
}
