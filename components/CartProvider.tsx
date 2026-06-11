"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  addToCart,
  cartCount,
  cartTotal,
  getCart,
  removeFromCart,
  saveCart,
  updateQuantity,
} from "@/lib/cart";
import { CartItem, Product, ProductVariant } from "@/lib/types";

interface CartContextValue {
  items: CartItem[];
  count: number;
  total: number;
  add: (product: Product, variant: ProductVariant | null, qty?: number) => void;
  remove: (productId: string, variantId?: string) => void;
  setQty: (productId: string, variantId: string | undefined, qty: number) => void;
  clear: () => void;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be inside CartProvider");
  return ctx;
}

export default function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setItems(getCart());
  }, []);

  const add = useCallback(
    (product: Product, variant: ProductVariant | null, qty = 1) => {
      setItems(addToCart(product, variant, qty));
      setIsOpen(true);
    },
    []
  );

  const remove = useCallback((productId: string, variantId?: string) => {
    setItems(removeFromCart(productId, variantId));
  }, []);

  const setQty = useCallback(
    (productId: string, variantId: string | undefined, qty: number) => {
      if (qty <= 0) {
        setItems(removeFromCart(productId, variantId));
      } else {
        setItems(updateQuantity(productId, variantId, qty));
      }
    },
    []
  );

  const clear = useCallback(() => {
    saveCart([]);
    setItems([]);
  }, []);

  return (
    <CartContext.Provider
      value={{
        items,
        count: cartCount(items),
        total: cartTotal(items),
        add,
        remove,
        setQty,
        clear,
        isOpen,
        openCart: () => setIsOpen(true),
        closeCart: () => setIsOpen(false),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
