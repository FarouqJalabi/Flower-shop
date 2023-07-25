"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
interface props {
  initCartItems: number;
}
export default function Cart({ initCartItems }: props) {
  //Maybe get server session
  const [cartItems, setCartItem] = useState(initCartItems);
  useEffect(() => {
    window.addEventListener("customEvent_addCart", () => {
      setCartItem(cartItems + 1);
      console.log("+1");
    });
    window.addEventListener("customEvent_removeCart", () => {
      setCartItem(cartItems - 1);
      console.log("-1");
    });

    return () => {
      window.removeEventListener("customEvent_addCart", () => {
        setCartItem(cartItems + 1);
      });
      window.removeEventListener("customEvent_removeCart", () => {
        setCartItem(cartItems - 1);
      });
    };
  }, [cartItems]);
  return (
    <div className="relative my-auto w-10 sm:w-12 aspect-square mr-2">
      <div className="rounded-full bg-red-500 w-6 h-6 absolute z-10 ml-7 sm:ml-9 -mt-3 sm:-mt-2 flex items-center justify-center text-white">
        {cartItems.toString()}
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
