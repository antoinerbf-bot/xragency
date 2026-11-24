import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";

export interface CartItem {
  id: string;
  serviceId: string;
  serviceName: string;
  planName: string;
  priceEur: number;
  period: "once" | "month" | "year";
  periodLabel: string;
  commitment?: string;
}

interface CartContextValue {
  items: CartItem[];
  isOpen: boolean;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  toggle: () => void;
  open: () => void;
  close: () => void;
  total: number;
  totalMonthly: number;
  totalAnnual: number;
  count: number;
}

const CartContext = createContext<CartContextValue | null>(null);

const CART_STORAGE_KEY = "xr-agency-cart-v1";

function readStoredCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const parsed: unknown = JSON.parse(window.localStorage.getItem(CART_STORAGE_KEY) || "[]");
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter(
        (item): item is CartItem =>
          item &&
          typeof item === "object" &&
          typeof item.id === "string" &&
          typeof item.serviceId === "string" &&
          typeof item.serviceName === "string" &&
          typeof item.planName === "string" &&
          typeof item.priceEur === "number" &&
          Number.isFinite(item.priceEur) &&
          ["once", "month", "year"].includes(item.period) &&
          typeof item.periodLabel === "string",
      )
      .slice(0, 20);
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setItems(readStoredCart());
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch {
      // The cart remains usable for this session if browser storage is unavailable.
    }
  }, [items]);

  const addItem = useCallback((item: CartItem) => {
    setItems((prev) => {
      // Replace if same id or same serviceId already in cart to avoid duplicate plans of the same service
      const exists = prev.findIndex((i) => i.id === item.id || i.serviceId === item.serviceId);
      if (exists >= 0) {
        const updated = [...prev];
        updated[exists] = item;
        return updated;
      }
      return [...prev, item];
    });
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);
  const toggle = useCallback(() => setIsOpen((v) => !v), []);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  const total = items.reduce((sum, item) => sum + (item.period === "once" ? item.priceEur : 0), 0);
  const totalMonthly = items.reduce(
    (sum, item) => sum + (item.period === "month" ? item.priceEur : 0),
    0,
  );
  const totalAnnual = items.reduce(
    (sum, item) => sum + (item.period === "year" ? item.priceEur : 0),
    0,
  );
  const count = items.length;

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        addItem,
        removeItem,
        clearCart,
        toggle,
        open,
        close,
        total,
        totalMonthly,
        totalAnnual,
        count,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
