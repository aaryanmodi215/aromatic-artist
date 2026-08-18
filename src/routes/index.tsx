import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import productImage from "@/assets/sarkar-legion.png";

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

function Index() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="flex h-16 items-center justify-between px-6 md:px-12">
          <span className="font-display text-xl font-medium tracking-[0.3em]">SARKAR</span>
          <Button
            size="sm"
            className="rounded-none bg-foreground px-5 py-2 text-xs font-semibold tracking-widest text-background hover:bg-foreground/85"
          >
            Buy Now
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
                LEGION
                <span className="ml-3 align-top text-lg font-medium text-muted-foreground md:text-xl">
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
                <p className="text-3xl font-semibold tracking-tight">₹2,499</p>
                <p className="text-sm text-muted-foreground">Incl. of all taxes</p>
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Button
                  size="lg"
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
                <div key={note.title} className="border border-border bg-background p-8 md:p-10">
                  <h3 className="text-xs font-semibold tracking-[0.2em] text-muted-foreground">{note.title}</h3>
                  <p className="mt-4 font-display text-2xl font-semibold leading-snug">{note.items}</p>
                </div>
              ))}
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
  { title: "TOP NOTES", items: "Bergamot, Pink Pepper, Cardamom" },
  { title: "HEART NOTES", items: "Oud, Rose, Geranium" },
  { title: "BASE NOTES", items: "Amber, Sandalwood, Vetiver" },
];
