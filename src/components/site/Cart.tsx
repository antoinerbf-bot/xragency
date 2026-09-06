import { useEffect, useRef, useState } from "react";
import { X, Trash2, MessageCircle, ShoppingBag, Check } from "lucide-react";
import { useCart, type CartItem } from "@/hooks/useCart";
import { CONTACT } from "@/lib/content";
import { cn } from "@/lib/utils";

/* ── Animated counter for total ── */
function useCountUpTo(target: number, duration = 400) {
  const [val, setVal] = useState(target);
  const prevRef = useRef(target);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const from = prevRef.current;
    if (from === target) return;
    prevRef.current = target;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setVal(Math.round(from + (target - from) * eased));
      if (t < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, duration]);

  return val;
}

function formatPrice(eur: number) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(eur);
}

const PERIOD_SHORT: Record<string, string> = {
  once: "",
  month: "/mois",
  year: "/an",
};

export function Cart() {
  const { items, isOpen, close, removeItem, total, count } = useCart();
  const animatedTotal = useCountUpTo(total, 400);

  // Build WhatsApp message from cart
  const waMessage = encodeURIComponent(
    items.length === 0
      ? "Bonjour XR Agency, je souhaite obtenir un devis personnalisé."
      : `Bonjour XR Agency, je suis intéressé par les services suivants :\n\n${items
          .map(
            (i) =>
              `• ${i.serviceName} — ${i.planName} : ${formatPrice(i.priceEur)}${PERIOD_SHORT[i.period]}`,
          )
          .join("\n")}\n\nTotal estimé : ${formatPrice(total)}\n\nPouvons-nous planifier un échange ?`,
  );

  return (
    <>
      {/* ── Floating cart button ── */}
      <button
        id="cart-toggle-btn"
        onClick={close}
        aria-label="Ouvrir ma sélection"
        className={cn(
          "fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-all duration-300",
          "bg-primary text-primary-foreground hover:scale-105 hover:shadow-xl",
          isOpen && "rotate-90 scale-95",
        )}
        style={{ display: "none" }} /* shown via CartFloatingButton below */
      >
        <ShoppingBag className="h-5 w-5" />
      </button>

      {/* ── Backdrop ── */}
      <div
        aria-hidden
        onClick={close}
        className={cn(
          "fixed inset-0 z-40 bg-black/20 backdrop-blur-[2px] transition-opacity duration-300",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        )}
      />

      {/* ── Cart Panel ── */}
      <div
        id="cart-panel"
        role="dialog"
        aria-label="Ma sélection"
        aria-modal="true"
        className={cn(
          "fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-card shadow-2xl transition-transform duration-350 ease-out",
          "border-l border-border/60",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
        style={{ transitionTimingFunction: "cubic-bezier(0.25, 0.46, 0.45, 0.94)" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border/60 px-6 py-5">
          <div>
            <h2 className="display-serif text-xl text-foreground">Ma sélection</h2>
            <p className="label-mono mt-0.5 text-xs text-muted-foreground">
              {count === 0
                ? "Aucune prestation choisie"
                : `${count} prestation${count > 1 ? "s" : ""} sélectionnée${count > 1 ? "s" : ""}`}
            </p>
          </div>
          <button
            onClick={close}
            aria-label="Fermer"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-dashed border-border">
                <ShoppingBag className="h-6 w-6 text-muted-foreground/40" />
              </div>
              <div>
                <p className="display-serif text-lg text-muted-foreground/60">
                  Votre sélection est vide
                </p>
                <p className="mt-1 text-xs text-muted-foreground/40">
                  Choisissez une formule dans la grille tarifaire
                </p>
              </div>
            </div>
          ) : (
            <ul className="space-y-3">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="group flex items-start justify-between gap-4 rounded-2xl border border-border/60 bg-background/70 px-4 py-4 transition-all duration-200 hover:border-border"
                >
                  <div className="min-w-0 flex-1">
                    <p className="label-mono text-[10px] text-muted-foreground/60">
                      {item.serviceName}
                    </p>
                    <p className="display-serif mt-0.5 text-base text-foreground">{item.planName}</p>
                    <p className="label-mono mt-1 text-xs font-semibold text-primary">
                      {formatPrice(item.priceEur)}
                      {PERIOD_SHORT[item.period]}
                    </p>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    aria-label={`Retirer ${item.planName}`}
                    className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-muted-foreground/30 opacity-0 transition-all duration-200 hover:bg-destructive/10 hover:text-destructive group-hover:opacity-100"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-border/60 px-6 py-5">
          {items.length > 0 && (
            <div className="mb-4 flex items-baseline justify-between">
              <span className="label-mono text-xs text-muted-foreground">Estimation totale</span>
              <span
                key={animatedTotal}
                className="display-serif text-2xl text-primary animate-price-reveal"
              >
                {formatPrice(animatedTotal)}
              </span>
            </div>
          )}

          <a
            href={`${CONTACT.whatsapp}?text=${waMessage}`}
            target="_blank"
            rel="noreferrer"
            className={cn(
              "label-mono flex w-full items-center justify-center gap-2.5 rounded-full py-3.5 text-xs font-semibold transition-all duration-300",
              "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-lg hover:-translate-y-0.5",
            )}
          >
            <MessageCircle className="h-4 w-4 text-emerald-400" />
            {items.length === 0 ? "Demander un devis WhatsApp" : "Envoyer ma sélection WhatsApp"}
          </a>

          <p className="label-mono mt-3 text-center text-[10px] text-muted-foreground/50">
            Sans engagement · Réponse en moins de 2h
          </p>
        </div>
      </div>
    </>
  );
}

/* ── Floating Cart Button (shown in Nav) ── */
export function CartFloatingButton() {
  const { count, toggle, isOpen } = useCart();
  const [justAdded, setJustAdded] = useState(false);
  const prevCount = useRef(count);

  useEffect(() => {
    if (count > prevCount.current) {
      setJustAdded(true);
      const t = setTimeout(() => setJustAdded(false), 600);
      return () => clearTimeout(t);
    }
    prevCount.current = count;
  }, [count]);

  return (
    <button
      onClick={toggle}
      aria-label={`Ma sélection (${count} prestation${count !== 1 ? "s" : ""})`}
      className={cn(
        "relative flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-200",
        isOpen
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-card text-foreground hover:border-primary hover:text-primary",
      )}
    >
      <ShoppingBag className="h-4 w-4" />
      {count > 0 && (
        <span
          className={cn(
            "absolute -right-1.5 -top-1.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-primary-foreground transition-all duration-200",
            justAdded && "animate-cart-pop",
          )}
        >
          {count > 9 ? "9+" : count}
        </span>
      )}
    </button>
  );
}

/* ── "Add to cart" button for pricing cards ── */
interface AddToCartBtnProps {
  item: Omit<CartItem, "id"> & { id?: string };
  popular?: boolean;
  className?: string;
}

export function AddToCartBtn({ item, popular, className }: AddToCartBtnProps) {
  const { addItem, items } = useCart();
  const [added, setAdded] = useState(false);
  const id = item.id ?? `${item.serviceId}-${item.planName}`;
  const isInCart = items.some((i) => i.id === id);

  const handleAdd = () => {
    addItem({ ...item, id });
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };

  return (
    <button
      onClick={handleAdd}
      className={cn(
        "label-mono flex w-full items-center justify-center gap-2 rounded-full py-3 text-xs font-semibold uppercase tracking-wider transition-all min-h-[44px]",
        "duration-200 active:scale-95",
        isInCart || added
          ? "bg-jade/20 border border-jade/40 text-jade"
          : popular
            ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:-translate-y-0.5"
            : "border border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground hover:-translate-y-0.5",
        className,
      )}
    >
      {added || isInCart ? (
        <>
          <Check className="h-3.5 w-3.5" />
          Ajouté à ma sélection
        </>
      ) : (
        <>
          <ShoppingBag className="h-3.5 w-3.5" />
          Ajouter à ma sélection
        </>
      )}
    </button>
  );
}
