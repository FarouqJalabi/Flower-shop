import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { prisma } from "../db";
import { redirect } from "next/navigation";
import Link from "next/link";
import FlowerFull from "@/components/flowers/flowerFull";

export default async function CartItems() {
  const data = await getServerSession(options);
  if (data == null) {
    redirect("/");
  }
  let user = await prisma.user.findFirst({
    where: {
      id: data.accessToken,
    },
    select: {
      shoppingList: {
        include: {
          users: {
            where: { id: data?.accessToken },
            select: { id: true },
          },
          shoppingList: {
            where: { id: data?.accessToken },
            select: { id: true },
          },
        },
      },
    },
  });

  return (
    <main className="flex flex-wrap gap-2 p-2 max-w-2xl mx-auto justify-center">
      {user?.shoppingList.map((f) => {
        return <FlowerFull {...f} key={f.id} />;
      })}
      <div
        className={`${
          user?.shoppingList == null || user?.shoppingList.length == 0
            ? ""
            : "hidden"
        }`}
      >
        <p>
          It appears you don&apos;t have any flowers in you&apos;re cart. If you do
          try to refresh!
        </p>

        <Link href="/" className="underline text-blue-500 ml-auto my-auto ">
          Discover our flowers➜
        </Link>
      </div>
    </main>
  );
}
