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
            header={v.title}
            secondHeader={v.title}
            collectionId={flowers}
            key={v.id}
          />
        );
      })}
    </main>
  );
}
