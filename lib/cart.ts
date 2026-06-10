"use client";

import { CartItem, Product, ProductVariant } from "./types";

const CART_KEY = "dank_cart";

export function getCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveCart(items: CartItem[]): void {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
}

export function addToCart(
  product: Product,
  variant: ProductVariant | null,
  quantity = 1
): CartItem[] {
  const cart = getCart();
  const key = variant ? `${product.id}__${variant.id}` : product.id;
  const existing = cart.find(
    (i) =>
      i.product.id === product.id &&
      (variant ? i.variant?.id === variant.id : !i.variant)
  );
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ product, variant, quantity });
  }
  saveCart(cart);
  return cart;
}

export function removeFromCart(productId: string, variantId?: string): CartItem[] {
  const cart = getCart().filter(
    (i) =>
      !(
        i.product.id === productId &&
        (variantId ? i.variant?.id === variantId : true)
      )
  );
  saveCart(cart);
  return cart;
}

export function updateQuantity(
  productId: string,
  variantId: string | undefined,
  quantity: number
): CartItem[] {
  const cart = getCart().map((i) => {
    if (
      i.product.id === productId &&
      (variantId ? i.variant?.id === variantId : !i.variant)
    ) {
      return { ...i, quantity };
    }
    return i;
  });
  saveCart(cart);
  return cart;
}

export function cartTotal(items: CartItem[]): number {
  return items.reduce((sum, i) => {
    const price = i.variant ? i.variant.price : i.product.price;
    return sum + price * i.quantity;
  }, 0);
}

export function cartCount(items: CartItem[]): number {
  return items.reduce((sum, i) => sum + i.quantity, 0);
}
