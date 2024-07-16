import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { prisma } from "../db";
import Flower from "@/components/flowers/flower";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function Home() {
  const data = await getServerSession(options);
  if (data == null) {
    redirect("/");
  }
  let user = await prisma.user.findFirst({
    where: {
      id: data.accessToken,
    },
    include: {
      flowersLiked: {
        include: {
          users: {
            where: { id: data?.accessToken },
            select: { id: true },
          },
        },
      },
    },
  });

  return (
    <main className="flex flex-wrap gap-2 m-2">
      {user?.flowersLiked.map((f) => {
        return <Flower {...f} key={f.id} />;
      })}
      <div
        className={`${
          user?.flowersLiked == null || user?.flowersLiked.length == 0
            ? ""
            : "hidden"
        }`}
      >
        <p>
          It appears you don&apos;t have any flowers liked. If you do try to
          refresh!
        </p>

        <Link href="/" className="underline text-blue-500 ml-auto my-auto ">
          Discover our flowers➜
        </Link>
      </div>
    </main>
  );
}
