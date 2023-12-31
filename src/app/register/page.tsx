"use client";
import Image from "next/image";
import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function Register() {
  const route = useRouter();

  const searchParams = useSearchParams();
  const callback_url = searchParams.get("callback") || "/";

  const [invalidEmail, setInvalidEmail] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [invalidRePassword, setInvalidRePassword] = useState(false);
  const [invalidName, setInvalidName] = useState(false);

  const [errorValue, setErrorValue] = useState("");

  const postUser = async (name: string, password: string, email: string) => {
    return await fetch("/api/user", {
      method: "POST",
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      }),
    });
  };
  const validRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let formObject = new FormData(e.currentTarget);
    let formData = Object.fromEntries(formObject);
    if (formData.name.length < 2) {
      setInvalidName(true);
      setErrorValue("The name is required");
    } else if (!/^[a-zA-Z ]*$/.test(formData.name as string)) {
      setErrorValue("Name can only contain letters");
      setInvalidName(true);
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email as string)) {
      setInvalidEmail(true);
      setErrorValue("The email is invalid");
    } else if (formData.password.length < 8) {
      setInvalidPassword(true);
      setErrorValue("The password must at least be 8 characters");
    } else if (formData.password != formData.rePassword) {
      setInvalidRePassword(true);
      setErrorValue("The passwords don't match");
    } else {
      // Everything went okay, not same email

      setErrorValue("Regestering you...");
      const res = await postUser(
        formData.name as string,
        formData.password as string,
        formData.email as string
      );
      if (res.ok) {
        await signIn("credentials", {
          redirect: false,
          email: formData.email,
          password: formData.password,
        });
        route.push(callback_url);
      } else {
        setErrorValue("You have an account, please login");
        setInvalidEmail(true);
        console.log(res);
      }
    }
  };

  return (
    <>
      <Link
        className="text-4xl sm:text-6xl font-black p-3 absolute z-30 text-black top-0 left-0 -scale-100"
        href={callback_url}
      >
        ➜
      </Link>
      <div className="flex bg-white w-full h-full fixed left-0 top-0 z-20 items-center justify-center ">
        <section className="flex flex-col gap-4 bg-white p-8 h-min rounded-2xl w-80">
          <div className="flex gap-3">
            <button
              className="p-2  justify-center w-full bg-black text-white rounded-lg flex gap-3"
              onClick={() =>
                signIn("google", {
                  redirect: true,
                  callbackUrl: callback_url,
                })
              }
            >
              Sign in with
              <Image
                src={"/google.svg"}
                width={20}
                height={20}
                alt="Google logo"
                className="my-auto"
              />
            </button>
          </div>

          <div className="bg-gray-300 rounded-full w-full h-1 mx-auto"></div>

          <form className="flex flex-col gap-4" onSubmit={validRegister}>
            <input
              placeholder="Name"
              name="name"
              autoComplete="name"
              className={`bg-gray-200 focus:border-none focus:outline-none p-2 rounded-md ${
                invalidName ? "animate-wiggle bg-red-500" : ""
              }`}
              onChange={() => {
                // setNameValue(e.target.value);
                setErrorValue("");
                setInvalidName(false);
              }}
            />
            <input
              type="email"
              placeholder="example@mail.com"
              name="email"
              autoComplete="email"
              className={`bg-gray-200 focus:border-none focus:outline-none p-2 rounded-md 
${invalidEmail ? "animate-wiggle bg-red-500" : ""}`}
              onChange={() => {
                // setEmailValue(e.target.value);
                setErrorValue("");
                setInvalidEmail(false);
              }}
            />

            <input
              type="password"
              placeholder="Password"
              name="password"
              autoComplete="new-password"
              // autoComplete="email"
              className={`bg-gray-200 focus:border-none focus:outline-none p-2 rounded-md
${invalidPassword ? "animate-wiggle bg-red-500 " : ""}`}
              onChange={() => {
                // setPasswordValue(e.target.value);
                setErrorValue("");
                setInvalidPassword(false);
              }}
            />
            <input
              type="password"
              placeholder="Retype password"
              name="rePassword"
              autoComplete="new-password"
              className={`bg-gray-200 focus:border-none focus:outline-none p-2 rounded-md
${invalidRePassword ? "animate-wiggle bg-red-500" : ""}`}
              onChange={() => {
                // setRePasswordValue(e.target.value);
                setErrorValue("");
                setInvalidRePassword(false);
              }}
            />

            <p
              className={`text-gray-500 text-sm ${
                errorValue == "" ? "hidden" : ""
              }`}
            >
              {errorValue}
            </p>
            <button
              type="submit"
              className="p-2 w-full bg-black text-white rounded-lg mx-auto"
            >
              Sign up with email
            </button>
          </form>
          <div>
            <p className="text-gray-500 text-sm">Do you have an account?</p>
            <Link
              className="text-blue-500 underline cursor-pointer"
              href={"/login"}
            >
              Login here
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
