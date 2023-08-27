"use client";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
export default function SignOut() {
  const searchParams = useSearchParams();

  const [loadingStatus, setLoadingStatus] = useState("");

  const callback_url = searchParams.get("callback") || "/";

  return (
    <>
      <Link
        className="text-4xl sm:text-6xl font-black p-3 absolute z-30 text-black top-0 left-0 -scale-100"
        href={callback_url}
      >
        ➜
      </Link>
      <div className="flex bg-white w-full h-full fixed left-0 top-0 z-20 items-center justify-center ">
        <section className="flex flex-col gap-4 bg-white p-8 h-min rounded-2xl max-w-[256px]">
          <form className="flex flex-col gap-4">
            <p className="text-gray-500 text-sm">
              <span className="text-red-500 font-extrabold">PS:</span>You will
              not be able to purchase nor like items when signed out
            </p>
            <button
              type="submit"
              className="p-2 w-full bg-black text-white rounded-lg mx-auto"
              onClick={(e) => {
                e.preventDefault();
                setLoadingStatus("Signing you out...");
                signOut({
                  redirect: true,
                  callbackUrl: "/login?callback=" + callback_url,
                });
              }}
            >
              Sign out
            </button>
            <p
              className={`text-gray-500 text-sm text-center ${
                loadingStatus == "" ? "hidden" : ""
              }`}
            >
              {loadingStatus}
            </p>
          </form>
        </section>
      </div>
    </>
  );
}
