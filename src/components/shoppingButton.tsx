"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface props {
  flower: FlowerInfo;
  user?: Array<{ id: string }>;
  small?: boolean;
}
export default function ShoppingButton({ flower, user, small = false }: props) {
  const router = useRouter();
  const [inCart, setInCart] = useState(user ? user.length != 0 : false);

  const addCart = new CustomEvent("customEvent_updateCart", {
    detail: { v: 1 },
  });
  const removeCart = new CustomEvent("customEvent_updateCart", {
    detail: { v: -1 },
  });
  const addToCart = async (add: boolean) => {
    const res = await fetch(`/api/flower/${flower.id}`, {
      method: "PATCH",
      body: JSON.stringify({
        addToList: add,
        listType: "shoppingList",
      }),
    });

    if (!res.ok) {
      console.log(res.statusText);
    }

    console.log(res.statusText);
  };
  return (
    <button
      className={`bg-black text-white font-jua ${
        small ? "text-lg " : "text-3xl "
      } p-2 rounded-2xl w-full`}
      onClick={() => {
        if (user) {
          setInCart(!inCart);

          addToCart(!inCart);

          dispatchEvent(!inCart ? addCart : removeCart);
        } else {
          router.push("/login");
        }
      }}
    >
      {inCart ? "Remove from " : "Add to "}shopping cart
    </button>
  );
}
