import FlowersPreviewEdit from "@/components/flowers/flowersPreviewEdit";
import { prisma } from "../db";
import TagEdit from "@/components/tagEdit";
import FlowersEdit from "@/components/flowersEdit";

export default async function AdminEditor() {
  const tagsObjects = await prisma.tags.findMany({ select: { tag: true } });
  const tagsList = tagsObjects.map((v) => v.tag);

  const flowers = await prisma.flower.findMany({
    select: { title: true, id: true },
  });
  return (
    <main>
      <FlowersPreviewEdit tags={tagsList} />
      <TagEdit tags={tagsList} />
      <FlowersEdit tags={tagsList} flowers={flowers} />
    </main>
  );
}
