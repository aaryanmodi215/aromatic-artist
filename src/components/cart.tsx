import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Minus, Plus, ShoppingBag, X } from "lucide-react";

export type CartItem = {
  id: string;
  name: string;
  variant: string;
  price: number;
  mrp: number;
  image: string;
  qty: number;
};

type CartContextValue = {
  items: CartItem[];
  isOpen: boolean;
  count: number;
  subtotal: number;
  savings: number;
  openCart: () => void;
  closeCart: () => void;
  addItem: (item: Omit<CartItem, "qty">, qty?: number) => void;
  setQty: (id: string, qty: number) => void;
  removeItem: (id: string) => void;
};

const CartContext = React.createContext<CartContextValue | null>(null);

export function useCart() {
  const ctx = React.useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

export const formatINR = (value: number) => `₹${value.toLocaleString("en-IN")}`;

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = React.useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = React.useState(false);

  const addItem = React.useCallback((item: Omit<CartItem, "qty">, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) => (i.id === item.id ? { ...i, qty: i.qty + qty } : i));
      }
      return [...prev, { ...item, qty }];
    });
    setIsOpen(true);
  }, []);

  const setQty = React.useCallback((id: string, qty: number) => {
    setItems((prev) =>
      qty <= 0 ? prev.filter((i) => i.id !== id) : prev.map((i) => (i.id === id ? { ...i, qty } : i)),
    );
  }, []);

  const removeItem = React.useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const count = items.reduce((sum, i) => sum + i.qty, 0);
  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const savings = items.reduce((sum, i) => sum + (i.mrp - i.price) * i.qty, 0);

  const value: CartContextValue = {
    items,
    isOpen,
    count,
    subtotal,
    savings,
    openCart: () => setIsOpen(true),
    closeCart: () => setIsOpen(false),
    addItem,
    setQty,
    removeItem,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
      <CartSheet />
    </CartContext.Provider>
  );
}

function CartSheet() {
  const { items, isOpen, closeCart, setQty, removeItem, subtotal, savings, count } = useCart();

  return (
    <Sheet open={isOpen} onOpenChange={(open) => (open ? null : closeCart())}>
      <SheetContent className="flex w-full flex-col gap-0 border-l border-border p-0 sm:max-w-md">
        <SheetHeader className="border-b border-border px-6 py-5">
          <SheetTitle className="font-display text-sm font-semibold tracking-[0.25em]">
            YOUR CART ({count})
          </SheetTitle>
          <SheetDescription className="text-xs tracking-wide text-muted-foreground">
            Free shipping on all prepaid orders.
          </SheetDescription>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <ShoppingBag className="h-8 w-8 text-muted-foreground" strokeWidth={1.25} />
            <p className="text-sm text-muted-foreground">Your cart is empty.</p>
            <Button
              variant="outline"
              className="rounded-none text-xs font-semibold tracking-widest"
              onClick={closeCart}
            >
              CONTINUE SHOPPING
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-6">
              <ul className="space-y-6">
                {items.map((item) => (
                  <li key={item.id} className="flex gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      width={200}
                      height={200}
                      loading="lazy"
                      className="h-24 w-20 border border-border object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-display text-sm font-semibold tracking-widest">{item.name}</p>
                          <p className="mt-1 text-xs tracking-wide text-muted-foreground">{item.variant}</p>
                        </div>
                        <button
                          type="button"
                          aria-label={`Remove ${item.name}`}
                          onClick={() => removeItem(item.id)}
                          className="text-muted-foreground transition-colors hover:text-foreground"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="mt-3 flex items-center justify-between gap-3">
                        <div className="flex items-center border border-border">
                          <button
                            type="button"
                            aria-label="Decrease quantity"
                            onClick={() => setQty(item.id, item.qty - 1)}
                            className="px-2 py-1.5 transition-colors hover:bg-secondary"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="min-w-8 text-center text-sm font-semibold">{item.qty}</span>
                          <button
                            type="button"
                            aria-label="Increase quantity"
                            onClick={() => setQty(item.id, item.qty + 1)}
                            className="px-2 py-1.5 transition-colors hover:bg-secondary"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold">{formatINR(item.price * item.qty)}</p>
                          <p className="text-xs text-muted-foreground line-through">
                            {formatINR(item.mrp * item.qty)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-border px-6 py-6">
              {savings > 0 && (
                <div className="flex items-center justify-between text-xs tracking-wide text-muted-foreground">
                  <span>YOU SAVE</span>
                  <span>{formatINR(savings)}</span>
                </div>
              )}
              <div className="mt-2 flex items-center justify-between">
                <span className="text-xs font-semibold tracking-[0.2em] text-muted-foreground">SUBTOTAL</span>
                <span className="font-display text-2xl font-semibold">{formatINR(subtotal)}</span>
              </div>
              <Button
                size="lg"
                className="mt-5 w-full rounded-none bg-foreground py-6 text-xs font-semibold tracking-widest text-background hover:bg-foreground/85"
              >
                CHECKOUT
              </Button>
              <p className="mt-3 text-center text-xs text-muted-foreground">
                Taxes included. Ships within 24-36 hours.
              </p>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
