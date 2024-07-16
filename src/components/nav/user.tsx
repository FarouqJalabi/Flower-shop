"use client";
import Image from "next/image";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function User() {
  //Maybe get server session
  const { status, data } = useSession();

  console.log(status, data);

  return (
    <>
      <Link
        className="relative my-auto ml-auto w-10 sm:w-12 aspect-square"
        href={status === "unauthenticated" ? "/login" : "/signout"}
      >
        <Image
          src={"/user.svg"}
          alt={"Heart, your liked flowers"}
          fill
          style={{ objectFit: "contain" }}
        />
      </Link>
    </>
  );
}
