"use client";
import Image from "next/image";
import { useState } from "react";
import { signIn } from "next-auth/react";

import Link from "next/link";

export default function Register() {
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [invalidRePassword, setInvalidRePassword] = useState(false);
  const [invalidName, setInvalidName] = useState(false);

  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [rePasswordValue, setRePasswordValue] = useState("");
  const [nameValue, setNameValue] = useState("");

  const [errorValue, setErrorValue] = useState("");

  const postUser = async () => {
    return await fetch("api/postUser", {
      method: "POST",
      body: JSON.stringify({
        name: nameValue,
        email: emailValue,
        password: passwordValue,
      }),
    });
  };
  const validLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    //Valid email?

    setInvalidEmail(false);
    if (nameValue == "") {
      setInvalidName(true);
      setErrorValue("The name is required");
    } else if (!/^[a-zA-Z ]*$/.test(nameValue)) {
      setErrorValue("Name can only contain letters");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
      setInvalidEmail(true);
      setErrorValue("The email is invalid");
    } else if (passwordValue.length < 8) {
      setInvalidPassword(true);
      setErrorValue("The password must at least be 8 characters");
    } else if (passwordValue != rePasswordValue) {
      setInvalidRePassword(true);
      setErrorValue("The passwords don't match");
    } else {
      // Everything went okay, not same email

      setErrorValue("Regestering you...");
      const res = await postUser();
      if (res.ok) {
        await signIn("credentials", {
          redirect: true,
          callbackUrl: "/",
          email: emailValue,
          password: passwordValue,
        });
      } else {
        setErrorValue("You have an account, please login");
        setInvalidEmail(true);
      }
    }
  };

  return (
    <div className="flex bg-gray-400 w-full h-full fixed left-0 top-0 z-20 items-center justify-center ">
      <section className="flex flex-col gap-4 bg-white p-8 h-min rounded-2xl w-80">
        <div className="flex gap-3">
          <button className="p-2  justify-center w-full bg-black text-white rounded-lg flex gap-3">
            Sign in with
            <Image
              src={"/google.svg"}
              width={20}
              height={20}
              alt="Google logo"
              className="my-auto"
            />
          </button>
          <Link
            className="text-2xl bg-pink-400 px-3 text-white rounded-md"
            href={"/"}
          >
            X
          </Link>
        </div>

        <div className="bg-gray-300 rounded-full w-full h-1 mx-auto"></div>

        <form className="flex flex-col gap-4">
          <input
            placeholder="Name"
            id="username"
            className={`bg-gray-200 focus:border-none focus:outline-none p-2 rounded-md ${
              invalidName ? "animate-wiggle bg-red-500" : ""
            }`}
            onChange={(e) => {
              setNameValue(e.target.value);
              setErrorValue("");
              setInvalidName(false);
            }}
          />
          <input
            type="email"
            placeholder="example@mail.com"
            id="username"
            className={`bg-gray-200 focus:border-none focus:outline-none p-2 rounded-md 
${invalidEmail ? "animate-wiggle bg-red-500" : ""}`}
            onChange={(e) => {
              setEmailValue(e.target.value);
              setErrorValue("");
              setInvalidEmail(false);
            }}
          />

          <input
            type="password"
            placeholder="Password"
            id="password"
            className={`bg-gray-200 focus:border-none focus:outline-none p-2 rounded-md
${invalidPassword ? "animate-wiggle bg-red-500" : ""}`}
            onChange={(e) => {
              setPasswordValue(e.target.value);
              setErrorValue("");
              setInvalidPassword(false);
            }}
          />
          <input
            type="password"
            placeholder="Retype password"
            id="password"
            className={`bg-gray-200 focus:border-none focus:outline-none p-2 rounded-md
${invalidRePassword ? "animate-wiggle bg-red-500" : ""}`}
            onChange={(e) => {
              setRePasswordValue(e.target.value);
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
            onClick={validLogin}
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
  );
}
