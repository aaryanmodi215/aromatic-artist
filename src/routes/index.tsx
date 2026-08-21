import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { CartProvider, useCart, formatINR } from "@/components/cart";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import productImage from "@/assets/sarkar-legion.png";
import plinthImage from "@/assets/legion-plinth.jpg";
import noteTop from "@/assets/note-top.jpg";
import noteHeart from "@/assets/note-heart.jpg";
import noteBase from "@/assets/note-base.jpg";
import filmAsset from "@/assets/legion-film.mp4.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sarkar Legion | Unisex Parfum" },
      {
        name: "description",
        content:
          "Sarkar Legion is a bold unisex parfum of bergamot, oud, rose, and amber for those who make the first move.",
      },
      { property: "og:title", content: "Sarkar Legion | Unisex Parfum" },
      {
        property: "og:description",
        content:
          "Sarkar Legion is a bold unisex parfum of bergamot, oud, rose, and amber for those who make the first move.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const PRODUCT = {
  id: "legion-100ml",
  name: "LEGION",
  variant: "100ML · Unisex Parfum",
  price: 2499,
  mrp: 3499,
};

function Index() {
  return (
    <CartProvider>
      <PageContent />
    </CartProvider>
  );
}

function PageContent() {
  const { addItem, openCart, count } = useCart();
  const [qty, setQty] = useState(1);
  const discount = Math.round(((PRODUCT.mrp - PRODUCT.price) / PRODUCT.mrp) * 100);

  const handleAdd = () => addItem({ ...PRODUCT, image: productImage }, qty);

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="flex h-16 items-center justify-between px-6 md:px-12">
          <span className="font-display text-xl font-medium tracking-[0.3em]">SARKAR</span>
          <Button
            size="sm"
            onClick={openCart}
            aria-label="Open cart"
            className="rounded-none bg-foreground px-5 py-2 text-xs font-semibold tracking-widest text-background hover:bg-foreground/85"
          >
            <ShoppingBag className="mr-2 h-4 w-4" />
            CART ({count})
          </Button>
        </div>
      </header>

      {/* Hero / Product */}
      <main className="flex-1">
        <section className="container mx-auto px-6 py-12 md:px-12 lg:py-20">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <div className="order-2 flex items-center justify-center lg:order-1">
              <img
                src={productImage}
                alt="Sarkar Legion perfume bottle"
                width={1024}
                height={1024}
                className="w-full max-w-sm md:max-w-md lg:max-w-lg"
                loading="eager"
              />
            </div>
            <div className="order-1 lg:order-2">
              <div className="flex flex-wrap gap-3">
                <span className="border border-border px-3 py-1 text-xs font-semibold tracking-widest text-muted-foreground">
                  UNISEX
                </span>
                <span className="border border-border px-3 py-1 text-xs font-semibold tracking-widest text-muted-foreground">
                  OUD
                </span>
                <span className="border border-border px-3 py-1 text-xs font-semibold tracking-widest text-muted-foreground">
                  PARFUM
                </span>
              </div>
              <h1 className="mt-6 font-display text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl">
                LEGION{" "}
                <span className="ml-0 align-top text-lg font-medium text-muted-foreground md:text-xl">
                  (100ML)
                </span>
              </h1>
              <p className="mt-4 text-sm font-semibold tracking-widest text-muted-foreground">
                LATE NIGHTS · POWER MOVES · LASTING IMPRESSION
              </p>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground">
                The scent of decisive moves. Citrus fire opens the game, oud and rose take the center, and amber
                sandalwood closes it for good.
              </p>
              <div className="mt-8">
                <div className="flex flex-wrap items-baseline gap-3">
                  <p className="text-3xl font-semibold tracking-tight">{formatINR(PRODUCT.price)}</p>
                  <p className="text-lg text-muted-foreground line-through">{formatINR(PRODUCT.mrp)}</p>
                  <span className="bg-foreground px-2 py-1 text-xs font-semibold tracking-widest text-background">
                    {discount}% OFF
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">Incl. of all taxes</p>
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <div className="flex items-center border border-border">
                  <button
                    type="button"
                    aria-label="Decrease quantity"
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="px-4 py-4 transition-colors hover:bg-secondary"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="min-w-10 text-center text-sm font-semibold">{qty}</span>
                  <button
                    type="button"
                    aria-label="Increase quantity"
                    onClick={() => setQty((q) => Math.min(10, q + 1))}
                    className="px-4 py-4 transition-colors hover:bg-secondary"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <Button
                  size="lg"
                  onClick={handleAdd}
                  className="rounded-none bg-foreground px-8 py-6 text-sm font-semibold tracking-widest text-background hover:bg-foreground/85"
                >
                  ADD TO CART
                </Button>
              </div>
              <p className="mt-4 text-xs text-muted-foreground">* Ships within 24-36 hours of ordering.</p>
            </div>
          </div>
        </section>

        {/* Fragrance Notes */}
        <section className="border-t border-border bg-secondary">
          <div className="container mx-auto px-6 py-16 md:px-12 lg:py-24">
            <h2 className="text-center font-display text-2xl font-semibold tracking-widest">FRAGRANCE NOTES</h2>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {notes.map((note) => (
                <div key={note.title} className="border border-border bg-background">
                  <img
                    src={note.image}
                    alt={note.items}
                    width={1024}
                    height={1024}
                    loading="lazy"
                    className="aspect-square w-full object-cover"
                  />
                  <div className="p-8 md:p-10">
                    <h3 className="text-xs font-semibold tracking-[0.2em] text-muted-foreground">{note.title}</h3>
                    <p className="mt-4 font-display text-2xl font-semibold leading-snug">{note.items}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Film */}
        <section className="border-t border-border">
          <div className="container mx-auto px-6 py-16 md:px-12 lg:py-24">
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
              <video
                src={filmAsset.url}
                poster={plinthImage}
                autoPlay
                muted
                loop
                playsInline
                className="w-full border border-border object-cover"
              />
              <div>
                <h2 className="font-display text-2xl font-semibold tracking-widest">THE FILM</h2>
                <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                  Sculpted in matte black, weighted like the piece it is named for. Legion is built to be held before
                  it is ever worn.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Editorial */}
        <section className="border-t border-border bg-secondary">
          <div className="container mx-auto grid gap-6 px-6 py-16 md:grid-cols-2 md:px-12 lg:py-24">
            <img
              src={plinthImage}
              alt="Sarkar Legion bottle on a concrete plinth"
              width={1280}
              height={1600}
              loading="lazy"
              className="w-full border border-border object-cover"
            />
            <div className="flex flex-col justify-center border border-border bg-background p-10 md:p-14">
              <h2 className="font-display text-2xl font-semibold tracking-widest">MADE TO LAST</h2>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                24% parfum concentration. 10+ hours of wear. One spray is a statement, two is a strategy.
              </p>
            </div>
          </div>
        </section>

        {/* Brand Story */}
        <section className="container mx-auto px-6 py-16 md:px-12 lg:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-2xl font-semibold tracking-widest">THE SARKAR STORY</h2>
            <p className="mt-6 text-xl leading-relaxed text-muted-foreground">
              Sarkar crafts uncompromising fragrances for those who make the first move.
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-secondary">
        <div className="container mx-auto px-6 py-12 md:px-12">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <span className="font-display text-xl font-medium tracking-[0.3em]">SARKAR</span>
            <p className="text-sm text-muted-foreground">© 2026 Sarkar Fragrances. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

const notes = [
  { title: "TOP NOTES", items: "Bergamot, Pink Pepper, Cardamom", image: noteTop },
  { title: "HEART NOTES", items: "Oud, Rose, Geranium", image: noteHeart },
  { title: "BASE NOTES", items: "Amber, Sandalwood, Vetiver", image: noteBase },
];
