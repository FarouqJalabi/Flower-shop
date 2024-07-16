import Image from "next/image";

interface props {
  initCartItems: Number;
}
export default function Cart({ initCartItems }: props) {
  //Maybe get server session
  return (
    <div className="relative my-auto w-10 sm:w-12 aspect-square mr-2">
      <div className="rounded-full bg-red-500 w-6 h-6 absolute z-10 ml-7 sm:ml-9 -mt-3 sm:-mt-2 flex items-center justify-center text-white">
        {initCartItems.toString()}
      </div>
      <Image
        src={"/cart.svg"}
        alt={"Heart, your liked flowers"}
        fill
        style={{ objectFit: "contain" }}
      />
    </div>
  );
}
