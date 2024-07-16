import Hero from "@//components/hero";
import FlowersPreview from "@/components/flowers/flowersPreview";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export default async function Home() {
  //Maybe get it from localStorage if there?
  const flowerPreviews = await prisma.flowerPreviews.findMany();
  // const flowerPreviews: Array<any> = [];

  return (
    <main>
      <h1>Hello admin</h1>
      {/* {flowerPreviews.map(async (v) => {
        const flowers = await prisma.flower.findMany({
          where: { flowerPreviewId: v.id },
        });

        return (
          <FlowersPreview
            key={v.id}
            header={v.title}
            secondHeader={v.title}
            collectionId={flowers}
          />
        );
      })} */}
    </main>
  );
}
