"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import MiniFlower from "../miniFlower";
interface props {
  initCartItems: Array<FlowerInfo>;
}
export default function Cart({ initCartItems }: props) {
  //Maybe get server session
  const [cartItems, setCartItems] = useState(initCartItems);
  const [listHidden, setListHidden] = useState(true);

  const updateCart = (e: CustomEventInit) => {
    const in_likes = cartItems.reduce((v, flower) => {
      return flower.id === e.detail.flower.id || v;
    }, false);

    if (in_likes) {
      let liked_copy = [...cartItems];
      liked_copy = liked_copy.filter((f) => f.id !== e.detail.flower.id);
      setCartItems(liked_copy);
    } else {
      setCartItems((prev_items) => [...prev_items, e.detail.flower]);
    }
  };
  useEffect(() => {
    window.addEventListener("customEvent_updateCart", updateCart);

    return () => {
      window.removeEventListener("customEvent_updateCart", updateCart);
    };
  }, [cartItems, updateCart]);

  return (
    <button
      className="relative my-auto"
      onClick={() => {
        setListHidden(!listHidden);
      }}
      onBlur={(e) => {
        setListHidden(true);
      }}
    >
      <div className="relative my-auto w-10 sm:w-12 aspect-square mr-2">
        <div className="rounded-full bg-red-500 w-6 h-6 absolute z-10 ml-7 sm:ml-9 -mt-3 sm:-mt-2 flex items-center justify-center text-white">
          {cartItems.length}
        </div>
        <Image
          src={"/cart.svg"}
          alt={"Heart, your liked flowers"}
          fill
          style={{ objectFit: "contain" }}
        />
      </div>
      <div
        className={`w-96 h-48 overflow-y-auto bg-red-500 absolute right-0 shadow-2xl ${
          listHidden ? "hidden" : ""
        }`}
      >
        {cartItems.map((f) => (
          <MiniFlower Info={f} key={f.id} />
        ))}
      </div>
    </button>
  );
}
