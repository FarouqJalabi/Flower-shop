"use client";
import Image from "next/image";
import Link from "next/link";

import { usePathname } from "next/navigation";
interface props {
  loggedIn: boolean;
}

export default function User({ loggedIn }: props) {
  //Maybe get server session
  const pathName = usePathname();
  return (
    <Link
      className="relative my-auto ml-auto w-10 sm:w-12 aspect-square"
      href={
        loggedIn
          ? { pathname: "/signout", query: { callback: pathName } }
          : { pathname: "/login", query: { callback: pathName } }
      }
    >
      <Image
        src={"/user.svg"}
        alt={"Heart, your liked flowers"}
        fill
        style={{ objectFit: "contain" }}
      />
    </Link>
  );
}
