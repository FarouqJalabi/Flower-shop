import Hero from "../components/hero";
import FlowersPreview from "@/components/flowers/flowersPreview";
import { prisma } from "./db";

export default async function Home() {
  //Maybe get it from localStorage if there?
  const flowerPreviews = await prisma.flowerPreviews.findMany({
    include: { flowers: { include: { users: { select: { id: true } } } } },
  });
  // const flowerPreviews: Array<any> = [];

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
            // color="orange"
          />
        );
      })}
    </main>
  );
}
