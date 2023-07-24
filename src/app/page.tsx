import Hero from "../components/hero";
import FlowersPreview from "@/components/flowers/flowersPreview";
import { prisma } from "./db";

import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";

export default async function Home() {
  const data = await getServerSession(options);
  if (data != null) {
  }
  let flowerPreviews = await prisma.flowerPreviews.findMany({
    include: {
      flowers: {
        include: {
          users: {
            where: { id: data?.accessToken },
            select: { id: true },
          },
        },
      },
    },
  });

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
