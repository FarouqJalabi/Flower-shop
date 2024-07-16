import Hero from "../components/hero";
import FlowersPreview from "@/components/flowers/flowersPreview";
import { PrismaClient } from "@prisma/client";

export default async function Home() {
  const prisma = new PrismaClient();
  const flowerPreviews = await prisma.flowerPreviews.findMany();

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
          />
        );
      })}
    </main>
  );
}
