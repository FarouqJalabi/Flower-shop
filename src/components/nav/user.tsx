import Image from "next/image";
import Link from "next/link";

interface props {
  loggedIn: boolean;
}
export default async function User({ loggedIn }: props) {
  //Maybe get server session

  return (
    <Link
      className="relative my-auto ml-auto w-10 sm:w-12 aspect-square"
      href={loggedIn ? "/signout" : "/login"}
    >
      <Image
        src={"/user.svg"}
        alt={"Heart, your liked flowers"}
        fill
        style={{ objectFit: "contain" }}
      />
    </Link>
  );
}
