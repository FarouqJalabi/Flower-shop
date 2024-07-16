import Image from "next/image";
import User from "./user";
import Heart from "./heart";

import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { prisma } from "@/app/db";
import Cart from "./cart";

export default async function Nav() {
  const data = await getServerSession(options);
  const user = data
    ? await prisma.user.findFirst({
        where: {
          id: data?.accessToken,
        },
        select: {
          _count: {
            select: { flowersLiked: true, shoppingList: true },
          },
        },
      })
    : { _count: { shoppingList: 0, flowersLiked: 0 } };
  return (
    <nav className="flex gap-5 p-2">
      {/* We want this in one <a> tag for tabbing between links*/}
      <a href="/" className="flex max-sm:w-11">
        <Image
          src={"/logo.png"}
          alt={"pink flower logo"}
          priority
          width={56}
          height={56}
          style={{ objectFit: "contain" }}
        />

        <h1 className="m-auto ml-2 text-xl sm:text-2xl ">Flower Shop</h1>
      </a>

      <User loggedIn={data != null} />
      <Heart initLikes={user?._count.flowersLiked!} />
      <Cart initCartItems={user?._count.shoppingList!} />
      <div className="mr-1"></div>
    </nav>
  );
}
