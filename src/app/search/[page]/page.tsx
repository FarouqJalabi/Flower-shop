import Flower from "@/components/flowers/flower";
import { prisma } from "../../db";
import { redirect } from "next/navigation";

type props = {
  params: { page: string | number | null };
};
export default async function searchPage({ params }: props) {
  const flowersCount = await prisma.flower.count();
  const flowersPerPage = 3;

  const pages = Math.ceil(flowersCount / flowersPerPage);
  if (
    isNaN(Number(params.page)) ||
    !(Number(params.page) >= 1 && Number(params.page) <= pages + 1)
  ) {
    return redirect("/404");
  }
  const results = await prisma.flower.findMany({
    skip: flowersPerPage * (Number(params.page) - 1),
    take: flowersPerPage,
  });

  return (
    <main className="grid ">
      {results.map((v) => {
        return <Flower {...v} />;
      })}
    </main>
  );
}
