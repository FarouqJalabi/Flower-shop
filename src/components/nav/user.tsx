"use client";
import Image from "next/image";
import { useState } from "react";

export default function User() {
  const [popup, setPopup] = useState(false);

  return (
    <>
      <button
        className="relative my-auto ml-auto w-10 sm:w-12 aspect-square"
        onClick={() => setPopup(true)}
      >
        <Image
          src={"/user.svg"}
          alt={"Heart, your liked flowers"}
          fill
          style={{ objectFit: "contain" }}
        />
      </button>
      <div
        className={
          "bg-[rgba(0,0,0,0.5)] w-full h-full fixed left-0 top-0 z-20 items-center justify-center " +
          (popup ? "flex" : "hidden")
        }
      >
        <section className="flex flex-col gap-4 bg-white p-8 h-min rounded-2xl">
          <button
            className="ml-auto text-2xl bg-pink-400 px-2 text-white rounded-md"
            onClick={() => setPopup(false)}
          >
            X
          </button>
          <button className="p-2 w-full bg-black text-white rounded-lg mx-auto">
            Login with G
          </button>
          <div className="bg-gray-300 rounded-full w-full h-1 mx-auto"></div>

          <form className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="example@mail.com"
              id="username"
              className="bg-gray-200 focus:border-none focus:outline-none p-2 rounded-md "
              required
            />

            <input
              type="password"
              placeholder="Password"
              id="password"
              className="bg-gray-200 focus:border-none focus:outline-none p-2 rounded-md"
              required
            />
            <button
              type="submit"
              className="p-2 w-full bg-black text-white rounded-lg mx-auto"
            >
              Login with email
            </button>
          </form>
          <div>
            <p className="text-gray-500 text-sm">Don&apos;t have an account?</p>
            <a className="text-blue-500 underline">register here</a>
          </div>
        </section>
      </div>
    </>
  );
}
