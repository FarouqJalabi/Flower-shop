import Image from "next/image";
import Contact from "./contact";

export default function Footer() {
  return (
    <footer className="flex flex-col md:flex-row bg-black text-white gap-10 p-4 py-9">
      <div className="flex-1">
        <div className="flex relative gap-2">
          <h1 className="text-3xl font-jua">What is this?</h1>
          <div className="relative aspect-square h-12 mt-[-16px]  ">
            <Image
              src={"/message-question.svg"}
              alt={"An outline of a white box"}
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
        </div>

        <p className="text-xl">
          This is a mock e-commerce where you can login, browse, like and add
          things to shopping cart. This site is fully customizable with the the
          admin account. Contact me to get admin!
        </p>
      </div>

      <Contact />

      <div className="flex-1 mx-auto text-center">
        <h1 className="text-3xl font-jua">Source Code</h1>
        <a
          href="https://github.com/FarouqJalabi/Flower-shop"
          className="mx-auto w-[80px] relative inline-block"
        >
          <Image
            src={"/github-mark-white.svg"}
            width={80}
            height={80}
            alt={"github logo in white"}
            className="object-contain mx-0 inline-block "
          />
          <Image
            src={"/GitHub_Logo_White.png"}
            width={100}
            height={100}
            alt={"github word in white"}
            className="object-contain inline-block"
          />
        </a>
      </div>
    </footer>
  );
}
