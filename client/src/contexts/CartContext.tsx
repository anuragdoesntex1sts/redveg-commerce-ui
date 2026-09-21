import { products } from "@/data/mock";
import type { CartItem, Product, ProductVariant } from "@/types/commerce";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

interface ResolvedCartItem extends CartItem {
  product: Product;
  variant: ProductVariant;
  lineTotal: number;
}

interface CartContextValue {
  items: CartItem[];
  resolvedItems: ResolvedCartItem[];
  itemCount: number;
  subtotal: number;
  deliveryFee: number;
  total: number;
  addItem: (productId: string, variantId: string, quantity?: number) => void;
  updateQuantity: (productId: string, variantId: string, quantity: number) => void;
  removeItem: (productId: string, variantId: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "redveg-cart-v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const resolvedItems = useMemo<ResolvedCartItem[]>(
    () =>
      items.flatMap((item) => {
        const product = products.find((entry) => entry.id === item.productId);
        const variant = product?.variants.find((entry) => entry.id === item.variantId);
        if (!product || !variant) return [];
        return [{ ...item, product, variant, lineTotal: variant.price * item.quantity }];
      }),
    [items],
  );

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = resolvedItems.reduce((sum, item) => sum + item.lineTotal, 0);
  const deliveryFee = subtotal === 0 || subtotal >= 799 ? 0 : 49;
  const total = subtotal + deliveryFee;

  const addItem = (productId: string, variantId: string, quantity = 1) => {
    setItems((current) => {
      const match = current.find((item) => item.productId === productId && item.variantId === variantId);
      if (match) {
        return current.map((item) =>
          item.productId === productId && item.variantId === variantId
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }
      return [...current, { productId, variantId, quantity }];
    });
  };

  const updateQuantity = (productId: string, variantId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId, variantId);
      return;
    }
    setItems((current) =>
      current.map((item) =>
        item.productId === productId && item.variantId === variantId ? { ...item, quantity } : item,
      ),
    );
  };

  const removeItem = (productId: string, variantId: string) => {
    setItems((current) => current.filter((item) => !(item.productId === productId && item.variantId === variantId)));
  };

  const clearCart = () => setItems([]);

  return (
    <CartContext.Provider
      value={{ items, resolvedItems, itemCount, subtotal, deliveryFee, total, addItem, updateQuantity, removeItem, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}
