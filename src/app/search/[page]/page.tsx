import Flower from "@/components/flowers/flower";
import { prisma } from "../../db";
import Link from "next/link";
import SearchBox from "@/components/searchBox";

import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
type props = {
  params: { page: string | number | null };
  searchParams?: {
    search?: string;
  };
};

export default async function searchPage({ params, searchParams }: props) {
  const data = await getServerSession(options);

  const searchWhere =
    searchParams && searchParams.search
      ? {
          OR: [
            {
              title: { search: searchParams.search },
            },
            {
              description: { search: searchParams.search },
            },
            {
              tags: { some: { tag: { search: searchParams.search } } },
            },
          ],
        }
      : {};

  const flowersCount = await prisma.flower.count({
    where: searchWhere,
  });
  const flowersPerPage = 3;

  const pages = Math.ceil(flowersCount / flowersPerPage);
  if (
    isNaN(Number(params.page)) ||
    !(Number(params.page) >= 1 && Number(params.page) < pages + 1)
  ) {
    console.log("Should go to ", "/search/1?search=" + searchParams?.search);
    // return redirect("/search/1?search=" + searchParams?.search);
  }
  const results = await prisma.flower.findMany({
    skip: flowersPerPage * (Number(params.page) - 1),
    take: flowersPerPage,
    where: searchWhere,

    include:
      data == null
        ? undefined
        : {
            users: {
              where: { id: data?.accessToken },
              select: { id: true },
            },
          },
    orderBy: {
      _relevance: {
        fields: ["title", "description"],
        search: searchParams?.search ? searchParams?.search! : "",
        sort: "desc",
      },
    },
  });
  return (
    <main>
      {/* Form alows enter to be clicked instead of button */}
      <SearchBox initSearch={searchParams?.search} />

      <section className=" grid grid-cols-1 sm:grid-cols-2 min-[890px]:grid-cols-3 gap-y-2 justify-items-center">
        {results.map((flower, i) => {
          return <Flower key={flower.id} Info={flower} scrollIndex={i} />;
        })}
      </section>
      <section className="flex justify-center">
        <Link
          className={`text-4xl sm:text-6xl font-black p-3 -scale-x-100 w-min ${
            params.page == 1 ? "invisible" : ""
          }`}
          href={
            "/search/" +
            (Number(params.page) - 1) +
            "?search=" +
            (searchParams?.search || "")
          }
          prefetch
        >
          ➜
        </Link>
        <Link
          className={`text-4xl sm:text-6xl font-black p-3 text-black ${
            params.page == pages ? "invisible" : ""
          }
        `}
          href={
            "/search/" +
            (Number(params.page) + 1) +
            "?search=" +
            (searchParams?.search || "")
          }
          prefetch
        >
          ➜
        </Link>
      </section>
    </main>
  );
}
