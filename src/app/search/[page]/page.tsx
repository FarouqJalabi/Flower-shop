import Flower from "@/components/flowers/flower";
import { prisma } from "../../db";
import { redirect } from "next/navigation";
import Link from "next/link";
type props = {
  params: { page: string | number | null };
};

export default async function searchPage({ params }: props) {
  const flowersCount = await prisma.flower.count();
  const flowersPerPage = 3;

  const pages = Math.ceil(flowersCount / flowersPerPage);
  if (
    isNaN(Number(params.page)) ||
    !(Number(params.page) >= 1 && Number(params.page) < pages + 1)
  ) {
    return redirect("/404");
  }
  const results = await prisma.flower.findMany({
    skip: flowersPerPage * (Number(params.page) - 1),
    take: flowersPerPage,
  });

  return (
    <main>
      {/* Form alows enter to be clicked instead of button */}
      <form className="mx-auto m-2 w-4/5 max-w-2xl flex">
        <input
          type="text"
          className="border-gray-600 border-2 p-2 border-e-0 rounded-s-md w-full  focus:outline-none"
          placeholder="Search..."
        />
        <button
          className="bg-black text-white p-2.5 rounded-e-md"
          type="submit"
        >
          Search
        </button>
      </form>
      <section className=" grid grid-cols-1 sm:grid-cols-2 min-[890px]:grid-cols-3 gap-y-2 justify-items-center">
        {results.map((flower) => {
          return <Flower key={flower.id} {...flower} />;
        })}
      </section>
      <section className="flex justify-center">
        <Link
          className={`text-4xl sm:text-6xl font-black p-3 -scale-x-100 w-min ${
            params.page == 1 ? "invisible" : ""
          }`}
          href={"/search/" + (Number(params.page) - 1)}
        >
          ➜
        </Link>
        <Link
          className={`text-4xl sm:text-6xl font-black p-3 text-black scale-100 ${
            params.page == pages ? "invisible" : ""
          }
        `}
          href={"/search/" + (Number(params.page) + 1)}
        >
          ➜
        </Link>
      </section>
    </main>
  );
}
