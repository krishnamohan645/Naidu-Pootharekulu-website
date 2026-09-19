import { useEffect, useMemo, useState } from "react";

export type CartItem = {
  productId: string;
  quantity: number;
};

const CART_STORAGE_KEY = "naidu-pootharekulu-cart";

function normalizeCart(value: unknown): CartItem[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.reduce<CartItem[]>((items, entry) => {
    if (
      typeof entry === "object" &&
      entry !== null &&
      "productId" in entry &&
      "quantity" in entry &&
      typeof entry.productId === "string" &&
      typeof entry.quantity === "number" &&
      Number.isFinite(entry.quantity) &&
      entry.quantity > 0
    ) {
      items.push({ productId: entry.productId, quantity: Math.min(Math.floor(entry.quantity), 99) });
    }

    return items;
  }, []);
}

function readCart(): CartItem[] {
  if (typeof window === "undefined") {
    return [];
  }

  const stored = window.localStorage.getItem(CART_STORAGE_KEY);
  if (!stored) {
    return [];
  }

  try {
    return normalizeCart(JSON.parse(stored));
  } catch {
    return [];
  }
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setItems(readCart());
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (!isReady || typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [isReady, items]);

  const totalItems = useMemo(
    () => items.reduce((total, item) => total + item.quantity, 0),
    [items],
  );

  const addItem = (productId: string) => {
    setItems((current) => {
      const existing = current.find((item) => item.productId === productId);
      if (existing) {
        return current.map((item) =>
          item.productId === productId
            ? { ...item, quantity: Math.min(item.quantity + 1, 99) }
            : item,
        );
      }

      return [...current, { productId, quantity: 1 }];
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    setItems((current) =>
      current
        .map((item) =>
          item.productId === productId ? { ...item, quantity: Math.min(Math.max(quantity, 0), 99) } : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const removeItem = (productId: string) => {
    setItems((current) => current.filter((item) => item.productId !== productId));
  };

  const clearCart = () => {
    setItems([]);
  };

  return { items, totalItems, addItem, updateQuantity, removeItem, clearCart };
}