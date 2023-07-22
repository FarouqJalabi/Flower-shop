import FlowersPreviewEdit from "@/components/flowers/flowersPreviewEdit";

export default async function Home() {
  //Maybe get it from localStorage if there?
  //   const flowerPreviews = await prisma.flowerPreviews.findMany();
  const flowerPreviews: Array<any> = [];

  return (
    <main>
      <h1>Hello admin</h1>
      <FlowersPreviewEdit />
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
