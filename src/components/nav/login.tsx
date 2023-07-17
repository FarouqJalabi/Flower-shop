import Image from "next/image";
import { useState } from "react";
import { signIn } from "next-auth/react";

interface props {
  setLogin: React.Dispatch<React.SetStateAction<boolean>>;
  setRegister: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Login({ setLogin, setRegister }: props) {
  //Validations
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);

  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  const [errorValue, setErrorValue] = useState("");

  const validLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    //Valid email?
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
      setInvalidEmail(true);
      setErrorValue("The email is not valid");
      console.log("WE?");
    } else if (passwordValue.length < 8) {
      setInvalidPassword(true);
      setErrorValue("Password is at least 8 letters");
    } else {
      // Everything went okay

      setErrorValue("Loging you in...");
      const res = await signIn("credentials", {
        redirect: false,

        email: emailValue,
        password: passwordValue,
      });
      if (res?.error) {
        setErrorValue("Either the password or gmail is wrong");
      }
    }
  };

  return (
    <div className="flex bg-[rgba(0,0,0,0.5)] w-full h-full fixed left-0 top-0 z-20 items-center justify-center ">
      <section className="flex flex-col gap-4 bg-white p-8 h-min rounded-2xl w-80">
        <div className="flex gap-3">
          <button className="p-2  justify-center w-full bg-black text-white rounded-lg flex gap-3">
            Login with
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
            onClick={() => setLogin(false)}
          >
            X
          </button>
        </div>
        <div className="bg-gray-300 rounded-full w-full h-1 mx-auto"></div>

        <form className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="example@mail.com"
            id="username"
            className={`bg-gray-200 focus:border-none focus:outline-none p-2 rounded-md ${
              invalidEmail ? "animate-wiggle bg-red-500" : ""
            }`}
            onChange={(e) => {
              setEmailValue(e.target.value);
              setInvalidEmail(false);
              setErrorValue("");
            }}
          />

          <input
            type="password"
            placeholder="Password"
            id="password"
            className={`bg-gray-200 focus:border-none focus:outline-none p-2 rounded-md ${
              invalidPassword ? "animate-wiggle bg-red-500" : ""
            }`}
            onChange={(e) => {
              setPasswordValue(e.target.value);
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
            onClick={validLogin}
          >
            Login with email
          </button>
        </form>
        <div>
          <p className="text-gray-500 text-sm">Don&apos;t have an account?</p>
          <a
            className="text-blue-500 underline cursor-pointer"
            onClick={() => {
              setLogin(false);
              setRegister(true);
            }}
          >
            register here
          </a>
        </div>
      </section>
    </div>
  );
}
