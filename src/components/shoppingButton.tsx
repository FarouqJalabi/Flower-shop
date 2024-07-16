"use client";
import { useSession } from "next-auth/react";
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

  return (
    <button
      className={`bg-black text-white font-jua ${
        small ? "text-sm" : "text-3xl"
      } p-2 rounded-2xl w-full`}
      onClick={() => {
        if (user) {
          setInCart(!inCart);
          fetch("/api/shoppingList", {
            method: "POST",
            body: JSON.stringify({
              addToList: !inCart,
              flowerId: flower.id,
            }),
          });

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
