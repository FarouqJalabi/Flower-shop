import Hero from "../components/hero";
import FlowersPreview from "@/components/flowers/flowersPreview";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export default async function Home() {
  const flowerPreviews = await prisma.flowerPreviews.findMany();
  // const flowerPreviews: Array<any> = [];

  return (
    <main>
      <Hero />
      {flowerPreviews.map(async (v) => {
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
      })}
    </main>
  );
}
