"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Register from "./register";
import Login from "./login";

export default function User() {
  const searchParam = useSearchParams();
  const router = useRouter();
  const [login, setLogin] = useState(searchParam.get("login") != null);
  const [register, setRegister] = useState(
    searchParam.get("login") == null && searchParam.get("register") != null
  );

  // Handling url
  useEffect(() => {
    if (login) {
      router.push(`/?login`);
      document.body.classList.add("overflow-hidden");
    } else if (register) {
      router.push(`/?register`);
      document.body.classList.add("overflow-hidden");
    } else if (!login && !register) {
      document.body.classList.remove("overflow-hidden");
      router.push(`/`);
    } else {
      throw console.error("Both login and register is true!");
    }
  }, [login, register]);

  return (
    <>
      <button
        className="relative my-auto ml-auto w-10 sm:w-12 aspect-square"
        onClick={() => setLogin(true)}
      >
        <Image
          src={"/user.svg"}
          alt={"Heart, your liked flowers"}
          fill
          style={{ objectFit: "contain" }}
        />
      </button>
      {login ? <Login setLogin={setLogin} setRegister={setRegister} /> : null}
      {register ? (
        <Register setLogin={setLogin} setRegister={setRegister} />
      ) : null}
    </>
  );
}
