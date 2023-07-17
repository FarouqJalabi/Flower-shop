"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Register from "./register";
import Login from "./login";
import SignOut from "./signOut";
import { useSession } from "next-auth/react";

export default function User() {
  const searchParam = useSearchParams();
  const router = useRouter();
  const [login, setLogin] = useState(searchParam.get("login") != null);
  const [register, setRegister] = useState(
    searchParam.get("login") == null && searchParam.get("register") != null
  );
  const [singOut, setSignOut] = useState(false);

  const { status } = useSession();

  // ? Should handle url with login and register

  useEffect(() => {
    if (login && status == "unauthenticated") {
      router.push(`/?login`);
      document.body.classList.add("overflow-hidden");
    } else if (register && status == "unauthenticated") {
      router.push(`/?register`);
      document.body.classList.add("overflow-hidden");
    } else if ((!login && !register) || status == "unauthenticated") {
      document.body.classList.remove("overflow-hidden");
      router.push(`/`);
    }
  }, [login, register]);

  useEffect(() => {
    if (searchParam.get("login") != null) {
      setLogin(true);
    } else if (searchParam.get("register") != null) {
      setRegister(true);
    }
  }, [searchParam]);
  return (
    <>
      <button
        className="relative my-auto ml-auto w-10 sm:w-12 aspect-square"
        onClick={() => {
          if (status == "authenticated") {
            setSignOut(true);
          } else {
            setLogin(true);
          }
        }}
      >
        <Image
          src={"/user.svg"}
          alt={"Heart, your liked flowers"}
          fill
          style={{ objectFit: "contain" }}
        />
      </button>
      {login && status == "unauthenticated" ? (
        <Login setLogin={setLogin} setRegister={setRegister} />
      ) : null}
      {register && status == "unauthenticated" ? (
        <Register setLogin={setLogin} setRegister={setRegister} />
      ) : null}
      {singOut && status == "authenticated" ? (
        <SignOut setSignOut={setSignOut} />
      ) : null}
    </>
  );
}
