"use client";
import Image from "next/image";
import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const route = useRouter();
  const { status } = useSession();
  if (status == "authenticated") {
    route.push("/signout");
  }

  //Validations
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);

  const [errorValue, setErrorValue] = useState("");

  const validLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let formObject = new FormData(e.currentTarget);
    let formData = Object.fromEntries(formObject);
    //Valid email?

    setInvalidEmail(false);
    setInvalidPassword(false);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email as string)) {
      setInvalidEmail(true);
      setErrorValue("The email is not valid");
    } else if (formData.password.length < 8) {
      setInvalidPassword(true);
      setErrorValue("Password is at least 8 letters");
    } else {
      // Everything went okay
      setErrorValue("Loging you in...");
      const res = await signIn("credentials", {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });

      if (res?.error) {
        setErrorValue("Either the password or email is wrong");
        setInvalidEmail(true);
        setInvalidPassword(true);
      } else {
        //Back to were you came from
        route.back();
        // route.push("/");
      }
    }
  };

  return (
    <div className="flex bg-gray-400 w-full h-full fixed left-0 top-0 z-20 items-center justify-center ">
      <section className="flex flex-col gap-4 bg-white p-8 h-min rounded-2xl w-80">
        <div className="flex gap-3">
          <button
            className="p-2  justify-center w-full bg-black text-white rounded-lg flex gap-3"
            onClick={(e) => {
              signIn("google");
            }}
          >
            Login with
            <Image
              src={"/google.svg"}
              width={20}
              height={20}
              alt="Google logo"
              className="my-auto"
            />
          </button>
          <Link
            className="text-2xl bg-pink-400 px-3 py-1 text-white rounded-md  my-auto "
            href="/"
          >
            X
          </Link>
        </div>
        <div className="bg-gray-300 rounded-full w-full h-1 mx-auto"></div>

        <form className="flex flex-col gap-4" onSubmit={validLogin}>
          <input
            type="email"
            name="email"
            placeholder="example@mail.com"
            id="username"
            className={`bg-gray-200 focus:border-none focus:outline-none p-2 rounded-md ${
              invalidEmail ? "animate-wiggle bg-red-500" : ""
            }`}
            onChange={() => {
              setInvalidEmail(false);
              setErrorValue("");
            }}
          />

          <input
            type="password"
            placeholder="Password"
            name="password"
            id="password"
            className={`bg-gray-200 focus:border-none focus:outline-none p-2 rounded-md ${
              invalidPassword ? "animate-wiggle bg-red-500" : ""
            }`}
            onChange={() => {
              setInvalidPassword(false);
              setErrorValue("");
            }}
          />

          <p
            className={`text-gray-500 text-sm m-0 ${
              errorValue == "" ? "hidden" : ""
            }`}
          >
            {errorValue}
          </p>
          <button
            type="submit"
            className="p-2 w-full bg-black text-white rounded-lg mx-auto"
            // onClick={validLogin}
          >
            Login with email
          </button>
        </form>
        <div>
          <p className="text-gray-500 text-sm">Don&apos;t have an account?</p>
          <Link
            className="text-blue-500 underline cursor-pointer"
            href={"/register"}
          >
            register here
          </Link>
        </div>
      </section>
    </div>
  );
}
