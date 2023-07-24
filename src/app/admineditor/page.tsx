import FlowersPreviewEdit from "@/components/flowers/flowersPreviewEdit";
import { prisma } from "../db";
import TagEdit from "@/components/tagEdit";
import type { InferGetStaticPropsType, GetStaticProps } from "next";

export default async function AdminEditor() {
  //   const flowerPreviews = await prisma.flowerPreviews.findMany();
  // const flowerPreviews: Array<any> = [];

  const tagsObjects = await prisma.tags.findMany({ select: { tag: true } });
  const tagsList = tagsObjects.map((v) => v.tag);

  return (
    <main>
      <FlowersPreviewEdit tags={tagsList} />
      <TagEdit />
    </main>
  );
}
