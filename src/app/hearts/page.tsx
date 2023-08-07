import Image from "next/image";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { prisma } from "../db";
import { redirect } from "next/navigation";
import Link from "next/link";
import FlowerFull from "@/components/flowers/flowerFull";

export default async function HeartedFlowers() {
  const data = await getServerSession(options);
  if (data == null) {
    redirect("/");
  }
  let user = await prisma.user.findFirst({
    where: {
      id: data.accessToken,
    },
    select: {
      flowersLiked: {
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
    <main className="flex flex-col gap-2 p-2 max-w-2xl mx-auto min-h-screen">
      <div className="flex relative gap-2 mx-auto">
        <h1 className="text-3xl font-jua">You&apos;re liked flowers</h1>
        <div className="relative aspect-square h-12 mt-[-16px]  ">
          <Image
            src={"/heart.svg"}
            alt={"An outline of an heart"}
            fill
            style={{ objectFit: "contain" }}
          />
        </div>
      </div>
      {user?.flowersLiked.map((f) => {
        return <FlowerFull {...f} key={f.id} />;
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
