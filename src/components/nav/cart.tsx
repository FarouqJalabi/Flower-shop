"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
interface props {
  initCartItems: number;
}
export default function Cart({ initCartItems = 0 }: props) {
  //Maybe get server session
  const [cartItems, setCartItems] = useState(initCartItems);
  const updateCart = (e: CustomEventInit) => {
    setCartItems(cartItems + e.detail.v);
  };
  useEffect(() => {
    window.addEventListener("customEvent_updateCart", updateCart);

    return () => {
      window.removeEventListener("customEvent_updateCart", updateCart);
    };
  }, [cartItems, updateCart]);

  return (
    <Link
      className="relative my-auto w-10 sm:w-12 aspect-square mr-2"
      href={"/cart"}
    >
      <div className="rounded-full bg-red-500 w-6 h-6 absolute z-10 right-[-10px] top-[-10px] flex items-center justify-center text-white">
        {cartItems}
      </div>
      <Image
        src={"/cart.svg"}
        alt={"Heart, your liked flowers"}
        fill
        style={{ objectFit: "contain" }}
      />
    </Link>
  );
}
