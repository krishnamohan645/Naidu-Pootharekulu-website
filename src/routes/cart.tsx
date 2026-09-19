import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatPrice, logoImage, products, type Product } from "@/lib/shop-data";
import { type CartItem, useCart } from "@/lib/use-cart";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "My Cart | Naidu Pootharekulu" },
      {
        name: "description",
        content: "Review your Naidu Pootharekulu sweet boxes, update quantities, and see your order total.",
      },
      { property: "og:title", content: "My Cart | Naidu Pootharekulu" },
      {
        property: "og:description",
        content: "Review Pootharekulu sweet boxes and update your cart before ordering.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CartPage,
});

type CartProduct = {
  item: CartItem;
  product: Product;
};

function isCartProduct(value: CartProduct | null): value is CartProduct {
  return value !== null;
}

function CartPage() {
  const { items, totalItems, updateQuantity, removeItem, clearCart } = useCart();
  const cartProducts = items
    .map<CartProduct | null>((item) => {
      const product = products.find((entry) => entry.id === item.productId);
      if (!product) {
        return null;
      }

      return { item, product };
    })
    .filter(isCartProduct);
  const subtotal = cartProducts.reduce(
    (total, { item, product }) => total + item.quantity * product.price,
    0,
  );
  const delivery = subtotal > 999 || subtotal === 0 ? 0 : 79;
  const total = subtotal + delivery;

  return (
    <div className="min-h-screen bg-shop-soft text-foreground">
      <header className="border-b border-border bg-background/90 backdrop-blur-xl">
        <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-3">
            <img
              src={logoImage}
              alt="Naidu Pootharekulu logo"
              width={54}
              height={54}
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = "/favicon.png";
              }}
              className="h-13 w-13 rounded-full border border-shop-gold object-cover shadow-sweet"
            />
            <div>
              <p className="font-display text-xl font-bold text-shop-maroon">Naidu Pootharekulu</p>
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">My cart</p>
            </div>
          </Link>
          <Button asChild variant="outline">
            <Link to="/">
              <ArrowLeft />
              Continue shopping
            </Link>
          </Button>
        </nav>
      </header>

      <main className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_380px] lg:px-8">
        <section>
          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-shop-red">Your order</p>
              <h1 className="mt-2 font-display text-5xl font-bold text-shop-maroon">My Cart</h1>
            </div>
            <p className="text-sm font-semibold text-muted-foreground">
              {totalItems} {totalItems === 1 ? "item" : "items"} selected
            </p>
          </div>

          {cartProducts.length === 0 ? (
            <Card className="border-border bg-card shadow-sweet">
              <CardContent className="grid min-h-80 place-items-center p-10 text-center">
                <div>
                  <ShoppingBag className="mx-auto h-12 w-12 text-shop-red" />
                  <h2 className="mt-5 font-display text-3xl font-bold text-shop-maroon">
                    Your cart is empty
                  </h2>
                  <p className="mt-3 text-muted-foreground">Add Pootharekulu boxes from the shop.</p>
                  <Button asChild variant="sweet" className="mt-6">
                    <Link to="/">Shop sweets</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {cartProducts.map(({ item, product }) => (
                <Card key={product.id} className="border-border bg-card shadow-sweet">
                  <CardContent className="grid gap-5 p-4 sm:grid-cols-[132px_1fr_auto] sm:items-center">
                    <img
                      src={product.image}
                      alt={product.imageAlt}
                      width={product.width}
                      height={product.height}
                      loading="lazy"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = "/favicon.png";
                      }}
                      className="aspect-square w-full rounded-xl object-cover sm:w-32"
                    />
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-shop-red">{product.pack}</p>
                      <h2 className="mt-1 font-display text-2xl font-bold text-shop-maroon">
                        {product.name}
                      </h2>
                      <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
                        {product.description}
                      </p>
                      <p className="mt-3 font-bold text-foreground">{formatPrice(product.price)}</p>
                    </div>
                    <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
                      <div className="flex items-center gap-2 rounded-full border border-border bg-background p-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          aria-label={`Decrease ${product.name}`}
                          onClick={() => updateQuantity(product.id, item.quantity - 1)}
                        >
                          <Minus />
                        </Button>
                        <span className="grid h-9 min-w-10 place-items-center rounded-full bg-shop-gold px-3 text-sm font-bold text-shop-gold-foreground">
                          {item.quantity}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          aria-label={`Increase ${product.name}`}
                          onClick={() => updateQuantity(product.id, item.quantity + 1)}
                        >
                          <Plus />
                        </Button>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        aria-label={`Remove ${product.name}`}
                        onClick={() => removeItem(product.id)}
                      >
                        <Trash2 />
                        Remove
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </section>

        <aside className="lg:sticky lg:top-8 lg:self-start">
          <Card className="border-border bg-card shadow-shop">
            <CardHeader>
              <CardTitle className="font-display text-3xl text-shop-maroon">Order summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <SummaryRow label="Subtotal" value={formatPrice(subtotal)} />
              <SummaryRow label="Delivery" value={delivery === 0 ? "Free" : formatPrice(delivery)} />
              <div className="border-t border-border pt-5">
                <SummaryRow label="Total" value={formatPrice(total)} prominent />
              </div>
              <Button variant="sweet" className="h-12 w-full text-base" disabled={cartProducts.length === 0}>
                Place dummy order
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={clearCart}
                disabled={cartProducts.length === 0}
              >
                Clear cart
              </Button>
              <p className="text-center text-xs leading-5 text-muted-foreground">
                Free delivery above ₹999. Final confirmation can be handled by phone or WhatsApp.
              </p>
            </CardContent>
          </Card>
        </aside>
      </main>
    </div>
  );
}

function SummaryRow({ label, value, prominent = false }: { label: string; value: string; prominent?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className={prominent ? "text-lg font-bold text-shop-maroon" : "text-sm font-semibold text-muted-foreground"}>
        {label}
      </span>
      <span className={prominent ? "font-display text-3xl font-bold text-shop-maroon" : "font-bold text-foreground"}>
        {value}
      </span>
    </div>
  );
}