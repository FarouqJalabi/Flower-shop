"use client";

import { ReactNode, createContext, useContext, useState } from "react";
type ContextProps = {
  hearts: Set<string>;
  addHeart: (flower_id: string) => void;
  removeHeart: (flower_id: string) => void;
  cart: Set<string>;
  addCart: (flower_id: string) => void;
  removeCart: (flower_id: string) => void;
};
const GlobalContext = createContext<ContextProps>({
  hearts: new Set(),
  addHeart: (flower_id: string) => {},
  removeHeart: (flower_id: string) => {},
  cart: new Set(),
  addCart: (flower_id: string) => {},
  removeCart: (flower_id: string) => {},
});

type Props = {
  children?: ReactNode;
};

export const GlobalContextProvider = ({ children }: Props) => {
  const [hearts, setHearts] = useState<Set<string>>(new Set(["0", "2"]));

  const addHeart = (flower_id: string) => {
    let updated_hearts = new Set(hearts);
    updated_hearts.add(flower_id);
    setHearts(updated_hearts);

    console.log("added heart, heart id:", flower_id);
  };

  const removeHeart = (flower_id: string) => {
    let updated_hearts = new Set(hearts);
    updated_hearts.delete(flower_id);
    setHearts(updated_hearts);

    console.log("Removed heart, heart id:", flower_id);
  };

  const [cart, setCart] = useState<Set<string>>(new Set());

  const addCart = (flower_id: string) => {
    let updated_cart = new Set(cart);
    updated_cart.add(flower_id);
    setCart(updated_cart);

    console.log("added to cart, heart id:", flower_id);
  };

  const removeCart = (flower_id: string) => {
    let updated_cart = new Set(cart);
    updated_cart.delete(flower_id);
    setCart(updated_cart);

    console.log("Removed from cart, heart id:", flower_id);
  };

  return (
    <GlobalContext.Provider
      value={{ hearts, addHeart, removeHeart, cart, addCart, removeCart }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
export const useGlobalContext = () => useContext(GlobalContext);