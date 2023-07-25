"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ShoppingButton({
  id,
  user,
}: {
  id: string;
  user: Array<{ id: string }>;
}) {
  const router = useRouter();
  const { status } = useSession();
  const [inCart, setInCart] = useState(user.length == 0);

  const removeCart = new Event("customEvent_removeCart");
  const addCart = new Event("customEvent_addCart");

  return (
    <button
      className="bg-black text-white font-jua text-3xl p-2 rounded-2xl w-full"
      onClick={() => {
        if (status === "authenticated") {
          setInCart(!inCart);
          fetch("/api/shoppingList", {
            method: "POST",
            body: JSON.stringify({
              addToList: inCart,
              flowerId: id,
            }),
          });

          dispatchEvent(inCart ? addCart : removeCart);
        } else {
          router.push("/login");
        }
      }}
    >
      {inCart ? "Add to " : "Remove from "}shopping cart
    </button>
  );
}
