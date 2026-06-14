import { createContext } from "react";
import type { CartItem } from "../types/CartItem";
import type { Product } from "../types/Product";

export type CartContextType = {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  totalItems: number;
};

export const CartContext = createContext<CartContextType | null>(null);
