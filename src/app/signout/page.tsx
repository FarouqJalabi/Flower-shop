"use client";
import { signOut } from "next-auth/react";
import Link from "next/link";

export default function SignOut() {
  return (
    <div className="flex bg-gray-400 w-full h-full fixed left-0 top-0 z-20 items-center justify-center ">
      <section className="flex flex-col gap-4 bg-white p-8 h-min rounded-2xl w-56">
        <Link
          className="text-2xl bg-pink-400 px-3 text-white rounded-md ml-auto"
          href={"/"}
        >
          X
        </Link>

        <div className="bg-gray-300 rounded-full w-full h-1 mx-auto"></div>

        <form className="flex flex-col gap-4">
          <div>
            <p className="text-gray-500 text-sm">
              You will not be able to purchase nor like items when signed out
            </p>
          </div>
          <button
            type="submit"
            className="p-2 w-full bg-black text-white rounded-lg mx-auto"
            onClick={(e) => {
              e.preventDefault();
              signOut({ redirect: true, callbackUrl: "/login" });
            }}
          >
            Sign out
          </button>
        </form>
      </section>
    </div>
  );
}