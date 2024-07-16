import Image from "next/image";
import { useState } from "react";

interface props {
  setLogin: React.Dispatch<React.SetStateAction<boolean>>;
  setRegister: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function Register({ setLogin, setRegister }: props) {
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [invalidRePassword, setInvalidRePassword] = useState(false);
  const [invalidName, setInvalidName] = useState(false);

  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [rePasswordValue, setRePasswordValue] = useState("");
  const [nameValue, setNameValue] = useState("");

  const postUser = async () => {
    await fetch("api/postUser", {
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
    if (nameValue == "") {
      setInvalidName(true);
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
      setInvalidEmail(true);
    } else if (passwordValue == "") {
      setInvalidPassword(true);
    } else if (passwordValue != rePasswordValue) {
      setInvalidRePassword(true);
    } else {
      // Everything went okay
      const res = await postUser();
    }
  };

  return (
    <div className="flex bg-[rgba(0,0,0,0.5)] w-full h-full fixed left-0 top-0 z-20 items-center justify-center ">
      <section className="flex flex-col gap-4 bg-white p-8 h-min rounded-2xl">
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
          <button
            className="text-2xl bg-pink-400 px-3 text-white rounded-md"
            onClick={() => setRegister(false)}
          >
            X
          </button>
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
              setInvalidRePassword(false);
            }}
          />
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
          <a
            className="text-blue-500 underline cursor-pointer"
            onClick={() => {
              setLogin(true);
              setRegister(false);
            }}
          >
            Login here
          </a>
        </div>
      </section>
    </div>
  );
}
