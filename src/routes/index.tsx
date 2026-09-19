import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import {
  Award,
  BadgeCheck,
  Check,
  ChevronDown,
  Clock,
  Flame,
  Gift,
  HeartHandshake,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  PackageCheck,
  Phone,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  Truck,
  UtensilsCrossed,
  X,
} from "lucide-react";
import { useState, type ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { contactDetails, formatPrice, logoImage, products } from "@/lib/shop-data";
import { useCart } from "@/lib/use-cart";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Naidu Pootharekulu | Traditional Andhra Sweet Store" },
      {
        name: "description",
        content:
          "Shop authentic Atreyapuram Naidu Pootharekulu: classic, dry fruit, bellam, and ghee sugar Andhra paper sweets with pan-India delivery.",
      },
      { property: "og:title", content: "Naidu Pootharekulu | Traditional Andhra Sweet Store" },
      {
        property: "og:description",
        content:
          "Handmade paper sweets from Atreyapuram, rolled fresh with pure cow ghee, organic jaggery, sugar, and dry fruits.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const craftSteps = [
  {
    step: "01",
    title: "The Heated Inverted Clay Pot",
    teluguTitle: "కుండ తయారీ & సెగ",
    description:
      "A specialized porous earthenware pot (Kunda) is placed upside-down over a steady wood fire and polished with pure sesame oil until glassy-smooth.",
    highlight: "Traditional Wood-Fired Heat",
    icon: Flame,
  },
  {
    step: "02",
    title: "The Heritage Rice Starch",
    teluguTitle: "జయ బియ్యం పిండి",
    description:
      "Aged coarse Jaya Biyyam rice is soaked overnight and ground into a silky, water-thin emulsion, retaining the natural grain sweetness.",
    highlight: "GI-Origin Jaya Rice",
    icon: UtensilsCrossed,
  },
  {
    step: "03",
    title: "The Wafer-Thin Paper Sheet",
    teluguTitle: "పూత రేకు ఆవిరి",
    description:
      "A fine muslin cloth is dipped into the batter and swiftly wiped across the inverted heated pot, baking a translucent edible film in under 2 seconds.",
    highlight: "Micro-Thin Edible Paper",
    icon: Sparkles,
  },
  {
    step: "04",
    title: "Layering with Pure Ghee & Nuts",
    teluguTitle: "నెయ్యి & డ్రై ఫ్రూట్స్",
    description:
      "The delicate sheets are layered with warm churned A2 cow ghee, graded Godavari bellam or sugar, and loaded with roasted almonds, cashews & pistachios.",
    highlight: "100% Pure Cow Ghee",
    icon: Award,
  },
];

const giftingTiers = [
  {
    id: "royal-wedding",
    name: "Royal Wedding Hamper",
    tagline: "The gold standard for wedding return gifts",
    serves: "Custom bulk quantities (25 - 1000+ boxes)",
    priceInfo: "Special wholesale tiered pricing",
    badge: "Bestseller for Marriages",
    popular: true,
    features: [
      "Rigid gold-foil embossed luxury gift box",
      "Assorted Dry Fruit & Special Bellam Pootharekulu",
      "Personalized bride & groom auspicious blessing card",
      "Breakage-free air delivery direct to wedding venues",
    ],
  },
  {
    id: "festive-family",
    name: "Festive Celebration Box",
    tagline: "For Sankranti, Diwali, Ugadi & Housewarmings",
    serves: "Box of 20 pieces",
    priceInfo: "₹799 per gift box",
    badge: "Festival Favorite",
    popular: false,
    features: [
      "Dual-chamber festive pack (Sugar & Bellam mix)",
      "Cardamom aroma with roasted cashew crunch",
      "Triple moisture-locked vacuum freshness seal",
      "Complimentary personalized greeting note",
    ],
  },
  {
    id: "corporate-signature",
    name: "Corporate Executive Gift",
    tagline: "Authentic Andhra heritage for clients and teams",
    serves: "Bulk custom orders with GST invoice",
    priceInfo: "Volume corporate rates",
    badge: "Corporate Choice",
    popular: false,
    features: [
      "Sleek matte keepsake tin with gold badge",
      "Custom branded sleeve with your company logo",
      "Pan-India multi-address courier dispatch",
      "Priority express air shipping with live tracking",
    ],
  },
];

const customerReviews = [
  {
    name: "Srinivas Rao",
    location: "Hyderabad, Telangana",
    rating: 5,
    date: "Verified Order • 3 days ago",
    sweet: "Dry Fruit Pootharekulu",
    comment:
      "The dry fruit pootharekulu took me right back to our ancestral home in East Godavari. Delivered in 24 hours to Banjara Hills, completely intact without a single crack. The ghee fragrance is divine!",
  },
  {
    name: "Ananya Krishnan",
    location: "Bengaluru, Karnataka",
    rating: 5,
    date: "Verified Order • 1 week ago",
    sweet: "Wedding Gifting Hamper",
    comment:
      "Ordered 80 boxes for our daughter's half-saree event return gifts. The packaging was royal and guests called us asking where we ordered them from. Truly the most authentic paper sweet you can buy online.",
  },
  {
    name: "Venkat Raman",
    location: "Chennai, Tamil Nadu",
    rating: 5,
    date: "Verified Order • 2 weeks ago",
    sweet: "Bellam Pootharekulu",
    comment:
      "Authentic Atreyapuram taste. The bellam pootharekulu has the exact right balance of jaggery crumble and wafer crispness. Fresh, crunchy, and packed with utmost care.",
  },
];

const faqs = [
  {
    question: "How do you ensure paper sweets don't break during pan-India courier?",
    answer:
      "Every box of Naidu Pootharekulu is vacuum-sealed in a moisture-barrier pouch, nested inside high-density corrugated honeycomb cushioning, and packed inside a rigid shock-absorbent outer box. We guarantee zero-breakage delivery anywhere in India, or we replace it for free.",
  },
  {
    question: "How long does Pootharekulu remain fresh and crispy?",
    answer:
      "In our unopened sealed boxes, Pootharekulu stays crunchy and fresh for up to 45 days. Once opened, store in an airtight container away from humidity to enjoy the authentic crunch for up to 25 days.",
  },
  {
    question: "Are your sweets made with 100% pure cow ghee?",
    answer:
      "Yes! We use only pure, traditionally churned cow ghee sourced from local dairy farmers. We never use dalda, hydrogenated oils, palm oil, or synthetic preservatives.",
  },
  {
    question: "Do you accept custom bulk orders for weddings and events?",
    answer:
      "Yes, we specialize in wedding and festival bulk orders! We provide custom box designs, personalized tags, and coordinated venue delivery across India. Reach us directly on WhatsApp (+91 72072 24597) for tasting samples and wholesale pricing.",
  },
];

function Index() {
  const { addItem, totalItems } = useCart();
  const [addedProductId, setAddedProductId] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeCraftIndex, setActiveCraftIndex] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const heroProduct = products.find((product) => product.id === "dry-fruit-pootharekulu");

  const handleAddItem = (productId: string) => {
    addItem(productId);
    setAddedProductId(productId);
    window.setTimeout(() => setAddedProductId(null), 900);
  };

  const whatsappMessage = encodeURIComponent(
    "Hello Naidu Pootharekulu! I would like to inquire about wedding/festival bulk sweet box orders.",
  );

  if (!heroProduct) {
    return null;
  }

  return (
    <div className="min-h-screen overflow-hidden bg-background text-foreground">
      {/* Header Navigation */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-xl">
        <nav className="mx-auto grid h-20 max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 sm:px-6 md:flex md:justify-between lg:px-8">
          <Link to="/" className="flex min-w-0 items-center gap-3">
            <img
              src={logoImage}
              alt="Naidu Pootharekulu logo"
              width={58}
              height={58}
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = "/favicon.png";
              }}
              className="h-12 w-12 shrink-0 rounded-full border border-shop-gold object-cover shadow-sweet sm:h-14 sm:w-14"
            />
            <div className="min-w-0">
              <p className="truncate font-display text-base font-bold leading-none text-shop-maroon sm:text-lg md:text-xl lg:text-2xl">
                Naidu Pootharekulu
              </p>
              <p className="mt-1 hidden text-xs font-semibold uppercase tracking-widest text-muted-foreground sm:block">
                Atreyapuram speciality sweets
              </p>
            </div>
          </Link>

          <div className="hidden items-center gap-6 text-sm font-semibold text-muted-foreground md:flex lg:gap-8">
            <a href="#sweets" className="transition-colors hover:text-shop-red">
              Sweets
            </a>
            <a href="#craft" className="transition-colors hover:text-shop-red">
              The Craft
            </a>
            <a href="#gifting" className="transition-colors hover:text-shop-red">
              Gifting
            </a>
            <a href="#reviews" className="transition-colors hover:text-shop-red">
              Reviews
            </a>
            <a href="#contact" className="transition-colors hover:text-shop-red">
              Contact
            </a>
          </div>

          <div className="flex items-center gap-2">
            <Button asChild variant="sweet" className="relative">
              <Link to="/cart" aria-label={`Open cart with ${totalItems} items`}>
                <ShoppingBag />
                <span className="hidden sm:inline">My Cart</span>
                <span className="grid h-6 min-w-6 place-items-center rounded-full bg-primary px-2 text-xs text-primary-foreground">
                  {totalItems}
                </span>
              </Link>
            </Button>
            <button
              type="button"
              className="grid h-10 w-10 place-items-center rounded-lg border border-border bg-background text-foreground transition-colors hover:bg-accent md:hidden"
              onClick={() => setIsMenuOpen((open) => !open)}
              aria-expanded={isMenuOpen}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile menu dropdown */}
        <div
          className={cn(
            "absolute left-0 right-0 top-full border-b border-border/70 bg-background/95 backdrop-blur-xl transition-all duration-200 md:hidden",
            isMenuOpen
              ? "pointer-events-auto opacity-100 translate-y-0"
              : "pointer-events-none opacity-0 -translate-y-2",
          )}
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3 sm:px-6">
            <a
              href="#sweets"
              className="rounded-lg px-3 py-3 text-base font-semibold text-foreground transition-colors hover:bg-accent"
              onClick={() => setIsMenuOpen(false)}
            >
              Sweets
            </a>
            <a
              href="#craft"
              className="rounded-lg px-3 py-3 text-base font-semibold text-foreground transition-colors hover:bg-accent"
              onClick={() => setIsMenuOpen(false)}
            >
              The Craft of Pootharekulu
            </a>
            <a
              href="#gifting"
              className="rounded-lg px-3 py-3 text-base font-semibold text-foreground transition-colors hover:bg-accent"
              onClick={() => setIsMenuOpen(false)}
            >
              Wedding & Festive Gifting
            </a>
            <a
              href="#reviews"
              className="rounded-lg px-3 py-3 text-base font-semibold text-foreground transition-colors hover:bg-accent"
              onClick={() => setIsMenuOpen(false)}
            >
              Reviews & FAQs
            </a>
            <a
              href="#contact"
              className="rounded-lg px-3 py-3 text-base font-semibold text-foreground transition-colors hover:bg-accent"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact & Store
            </a>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative isolate flex min-h-[92vh] items-center overflow-hidden bg-shop-hero px-4 pb-10 pt-28 text-primary-foreground sm:px-6 lg:px-8">
          <img
            src={heroProduct.image}
            alt=""
            aria-hidden="true"
            width={heroProduct.width}
            height={heroProduct.height}
            className="animate-sweet-drift absolute inset-y-0 right-0 -z-10 h-full w-full object-cover object-center opacity-50 mix-blend-luminosity sm:w-3/4 sm:opacity-65 lg:w-[62%]"
          />
          <div className="absolute inset-0 -z-10 bg-shop-image-fade" />
          <div className="absolute inset-0 -z-10 opacity-20 [background:linear-gradient(90deg,var(--shop-gold)_1px,transparent_1px),linear-gradient(180deg,var(--shop-gold)_1px,transparent_1px)] [background-size:54px_54px]" />
          <div className="mx-auto w-full max-w-7xl">
            <div className="animate-sweet-rise max-w-3xl pb-2">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-shop-gold/50 bg-shop-maroon/55 px-4 py-2 text-sm font-semibold text-shop-cream backdrop-blur">
                <Truck className="h-4 w-4" />
                Pan-India shipping available • 100% Breakage-Free Guarantee
              </div>
              <h1 className="max-w-4xl font-display text-5xl font-bold leading-[0.96] text-shop-cream sm:text-7xl lg:text-8xl">
                Naidu Pootharekulu
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-shop-cream/90 sm:text-xl">
                Handmade paper sweets from Andhra tradition, rolled fresh with pure ghee, organic
                jaggery, sugar, and rich dry fruit fillings.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Button asChild size="lg" variant="sweet" className="text-base font-bold shadow-shop">
                  <a href="#sweets">
                    <ShoppingBag className="mr-2 h-5 w-5" />
                    Explore Sweets
                  </a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-shop-gold/60 bg-shop-maroon/40 text-shop-cream hover:bg-shop-maroon/70 hover:text-white backdrop-blur"
                >
                  <a href="#craft">
                    <Sparkles className="mr-2 h-4 w-4 text-shop-gold" />
                    Discover The Craft
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Sweets Grid Section */}
        <section id="sweets" className="bg-shop-soft px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <p className="text-sm font-bold uppercase tracking-widest text-shop-red">
                  Signature selection
                </p>
                <h2 className="mt-3 font-display text-4xl font-bold text-shop-maroon sm:text-5xl">
                  Fresh Pootharekulu boxes
                </h2>
              </div>
              <p className="max-w-xl text-base leading-7 text-muted-foreground">
                Classic rolls, dry fruit specials, bellam batches, and ghee sugar packs for gifting
                or home celebrations. Rolled fresh each morning.
              </p>
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {products.map((product) => (
                <Card key={product.id} className="sweet-card overflow-hidden border-border bg-card shadow-sweet">
                  <div className="relative aspect-square overflow-hidden bg-muted">
                    <img
                      src={product.image}
                      alt={product.imageAlt}
                      width={product.width}
                      height={product.height}
                      loading="lazy"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = "/favicon.png";
                      }}
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <span className="absolute left-4 top-4 rounded-full bg-shop-gold px-3 py-1 text-xs font-bold text-shop-gold-foreground shadow-sweet">
                      {product.badge}
                    </span>
                  </div>
                  <CardHeader className="p-5 pb-3">
                    <CardTitle className="font-display text-2xl text-shop-maroon">
                      {product.name}
                    </CardTitle>
                    <p className="text-sm font-semibold text-shop-red">{product.pack}</p>
                  </CardHeader>
                  <CardContent className="px-5 pb-4 pt-0">
                    <p className="min-h-20 text-sm leading-6 text-muted-foreground">
                      {product.description}
                    </p>
                  </CardContent>
                  <CardFooter className="flex items-center justify-between gap-3 p-5 pt-0">
                    <p className="font-display text-2xl font-bold text-foreground">
                      {formatPrice(product.price)}
                    </p>
                    <Button
                      variant="sweet"
                      className={addedProductId === product.id ? "animate-add-pop" : undefined}
                      onClick={() => handleAddItem(product.id)}
                      aria-label={`Add ${product.name} to cart`}
                    >
                      {addedProductId === product.id ? <Check /> : <ShoppingBag />}
                      {addedProductId === product.id ? "Added" : "Add"}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 1: The Traditional Craft of Atreyapuram */}
        <section id="craft" className="relative overflow-hidden bg-background px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-shop-gold/60 bg-shop-soft px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-shop-maroon">
                <Sparkles className="h-3.5 w-3.5 text-shop-red" />
                GI-Tagged Andhra Heritage
              </span>
              <h2 className="mt-4 font-display text-4xl font-bold text-shop-maroon sm:text-5xl lg:text-6xl">
                The 300-Year Craft of Edible Paper
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
                Pootharekulu (పూతరేకులు) translates to “coated sheets”. In our ancestral village of Atreyapuram on the Godavari riverbanks, master artisans turn rice starch and pure ghee into wafer-thin confectionery poetry.
              </p>
            </div>

            {/* Interactive Process Tabs */}
            <div className="mt-14 grid gap-8 lg:grid-cols-12 lg:items-center">
              {/* Step Navigation Cards */}
              <div className="grid gap-3 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
                {craftSteps.map((step, index) => {
                  const StepIcon = step.icon;
                  const isActive = activeCraftIndex === index;
                  return (
                    <button
                      key={step.step}
                      type="button"
                      onClick={() => setActiveCraftIndex(index)}
                      className={cn(
                        "group relative flex items-start gap-4 rounded-2xl border p-5 text-left transition-all duration-300",
                        isActive
                          ? "border-shop-gold bg-shop-soft shadow-sweet"
                          : "border-border bg-card hover:border-shop-gold/50 hover:bg-shop-soft/40",
                      )}
                    >
                      <div
                        className={cn(
                          "grid h-12 w-12 shrink-0 place-items-center rounded-xl font-display text-lg font-bold transition-colors",
                          isActive
                            ? "bg-shop-maroon text-shop-cream shadow-sweet"
                            : "bg-muted text-muted-foreground group-hover:bg-shop-gold group-hover:text-shop-gold-foreground",
                        )}
                      >
                        {step.step}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-display text-lg font-bold text-shop-maroon">
                            {step.title}
                          </p>
                        </div>
                        <p className="mt-1 text-xs font-semibold text-shop-red">
                          {step.teluguTitle}
                        </p>
                        <span className="mt-2 inline-block rounded-full bg-shop-gold/20 px-2.5 py-0.5 text-xs font-semibold text-shop-maroon">
                          {step.highlight}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Active Step Feature Display */}
              {(() => {
                const activeStep = craftSteps[activeCraftIndex] ?? craftSteps[0]!;
                return (
                  <div className="relative overflow-hidden rounded-3xl border border-shop-gold/40 bg-gradient-to-br from-shop-maroon via-shop-maroon/95 to-shop-maroon/90 p-8 text-shop-cream shadow-shop lg:col-span-7 lg:p-12">
                    <div className="absolute right-0 top-0 -mr-16 -mt-16 h-64 w-64 rounded-full bg-shop-gold/10 blur-3xl pointer-events-none" />
                    <div className="relative z-10">
                      <div className="inline-flex items-center gap-2 rounded-full border border-shop-gold/40 bg-shop-maroon/80 px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-shop-gold">
                        <Clock className="h-3.5 w-3.5" />
                        Step {activeStep.step} of 04
                      </div>

                      <h3 className="mt-6 font-display text-3xl font-bold leading-tight text-shop-cream sm:text-4xl">
                        {activeStep.title}
                      </h3>
                      <p className="mt-2 text-sm font-semibold text-shop-gold sm:text-base">
                        {activeStep.teluguTitle}
                      </p>

                      <p className="mt-6 text-base leading-8 text-shop-cream/90 sm:text-lg">
                        {activeStep.description}
                      </p>

                      <div className="mt-8 grid gap-4 sm:grid-cols-2">
                        <div className="rounded-2xl border border-shop-gold/30 bg-shop-maroon/50 p-4 backdrop-blur">
                          <p className="text-xs font-bold uppercase tracking-wider text-shop-gold">
                            Key Ingredient / Technique
                          </p>
                          <p className="mt-1 font-semibold text-shop-cream">
                            {activeStep.highlight}
                          </p>
                        </div>
                        <div className="rounded-2xl border border-shop-gold/30 bg-shop-maroon/50 p-4 backdrop-blur">
                          <p className="text-xs font-bold uppercase tracking-wider text-shop-gold">
                            Artisan Guarantee
                          </p>
                          <p className="mt-1 font-semibold text-shop-cream">
                            100% Handmade • Zero Preservatives
                          </p>
                        </div>
                      </div>

                      <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-shop-gold/20 pt-6 text-xs text-shop-cream/80">
                        <span className="flex items-center gap-1.5 font-semibold">
                          <ShieldCheck className="h-4 w-4 text-shop-gold" /> Authentic Atreyapuram Origin
                        </span>
                        <span className="h-1 w-1 rounded-full bg-shop-gold" />
                        <span className="flex items-center gap-1.5 font-semibold">
                          <Award className="h-4 w-4 text-shop-gold" /> Pure A2 Churned Cow Ghee
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* Heritage Highlights Bar */}
            <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5 shadow-sweet">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-shop-soft text-shop-maroon">
                  <Award className="h-6 w-6 text-shop-red" />
                </div>
                <div>
                  <p className="font-display text-2xl font-bold text-shop-maroon">35+ Years</p>
                  <p className="text-xs font-semibold text-muted-foreground">Generational Heritage</p>
                </div>
              </div>
              <div className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5 shadow-sweet">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-shop-soft text-shop-maroon">
                  <Sparkles className="h-6 w-6 text-shop-gold" />
                </div>
                <div>
                  <p className="font-display text-2xl font-bold text-shop-maroon">100% Pure</p>
                  <p className="text-xs font-semibold text-muted-foreground">Country Ghee & Bellam</p>
                </div>
              </div>
              <div className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5 shadow-sweet">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-shop-soft text-shop-maroon">
                  <PackageCheck className="h-6 w-6 text-shop-leaf" />
                </div>
                <div>
                  <p className="font-display text-2xl font-bold text-shop-maroon">0% Broken</p>
                  <p className="text-xs font-semibold text-muted-foreground">Transit Cushioning</p>
                </div>
              </div>
              <div className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5 shadow-sweet">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-shop-soft text-shop-maroon">
                  <Truck className="h-6 w-6 text-shop-red" />
                </div>
                <div>
                  <p className="font-display text-2xl font-bold text-shop-maroon">Pan-India</p>
                  <p className="text-xs font-semibold text-muted-foreground">24-48 Hr Express Air</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Wedding, Festival & Corporate Gifting */}
        <section id="gifting" className="relative bg-shop-soft px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-shop-red/30 bg-background px-4 py-1 text-xs font-bold uppercase tracking-wider text-shop-red">
                  <Gift className="h-3.5 w-3.5" />
                  Bespoke Hampers & Bulk Orders
                </span>
                <h2 className="mt-3 font-display text-4xl font-bold text-shop-maroon sm:text-5xl">
                  Weddings & Festive Celebrations
                </h2>
              </div>
              <p className="max-w-xl text-base leading-7 text-muted-foreground">
                Impress your wedding guests, family, and corporate patrons with authentic Andhra heritage. Sealed in gold-foiled luxury boxes guaranteed to arrive fresh and crack-free.
              </p>
            </div>

            <div className="mt-12 grid gap-8 lg:grid-cols-3">
              {giftingTiers.map((tier) => (
                <Card
                  key={tier.id}
                  className={cn(
                    "relative flex flex-col justify-between overflow-hidden rounded-3xl border bg-card p-8 shadow-sweet transition-all duration-300 hover:-translate-y-1.5",
                    tier.popular
                      ? "border-shop-gold ring-2 ring-shop-gold/50 shadow-shop"
                      : "border-border",
                  )}
                >
                  {tier.popular && (
                    <div className="absolute right-0 top-0 rounded-bl-xl bg-shop-gold px-4 py-1 text-xs font-bold text-shop-gold-foreground shadow-sweet">
                      {tier.badge}
                    </div>
                  )}

                  <div>
                    {!tier.popular && (
                      <span className="inline-block rounded-full bg-muted px-3 py-1 text-xs font-bold text-muted-foreground">
                        {tier.badge}
                      </span>
                    )}

                    <h3 className="mt-4 font-display text-2xl font-bold text-shop-maroon">
                      {tier.name}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">{tier.tagline}</p>

                    <div className="mt-6 rounded-2xl bg-shop-soft p-4">
                      <p className="text-xs font-bold uppercase tracking-wider text-shop-red">
                        Recommended For
                      </p>
                      <p className="mt-1 font-semibold text-foreground">{tier.serves}</p>
                      <p className="mt-2 text-sm font-bold text-shop-maroon">{tier.priceInfo}</p>
                    </div>

                    <div className="mt-6 space-y-3">
                      <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        Includes:
                      </p>
                      {tier.features.map((feat) => (
                        <div key={feat} className="flex items-start gap-2.5 text-sm text-foreground">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-shop-leaf" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 pt-4">
                    <Button
                      asChild
                      variant={tier.popular ? "sweet" : "outline"}
                      className="w-full text-sm font-bold"
                    >
                      <a
                        href={`https://wa.me/917207224597?text=${whatsappMessage}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <MessageCircle className="mr-2 h-4 w-4" />
                        Inquire on WhatsApp
                      </a>
                    </Button>
                  </div>
                </Card>
              ))}
            </div>

            {/* Custom Concierge Callout */}
            <div className="mt-12 flex flex-col items-center justify-between gap-6 rounded-3xl border border-shop-gold/50 bg-gradient-to-r from-shop-maroon via-shop-maroon to-[#55101a] p-8 text-shop-cream shadow-shop sm:flex-row sm:p-10">
              <div className="flex items-center gap-5">
                <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-shop-gold text-shop-gold-foreground">
                  <HeartHandshake className="h-7 w-7" />
                </div>
                <div>
                  <h4 className="font-display text-xl font-bold text-shop-cream sm:text-2xl">
                    Need Custom Sweet Boxes or Event Sampling?
                  </h4>
                  <p className="mt-1 text-sm text-shop-cream/80">
                    We personalize box designs, greeting tags, and deliver across multiple wedding venues.
                  </p>
                </div>
              </div>
              <Button
                asChild
                size="lg"
                className="shrink-0 bg-shop-gold text-shop-gold-foreground hover:bg-shop-gold/90 font-bold"
              >
                <a href={`tel:${contactDetails.phone}`}>
                  <Phone className="mr-2 h-4 w-4" />
                  Call {contactDetails.phone}
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* SECTION 3: Reviews, Guarantees & FAQs */}
        <section id="reviews" className="bg-background px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="text-center">
              <p className="text-sm font-bold uppercase tracking-widest text-shop-red">
                Customer Testimonials
              </p>
              <h2 className="mt-3 font-display text-4xl font-bold text-shop-maroon sm:text-5xl">
                Loved by Pootharekulu Connoisseurs
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
                Hear from sweet lovers across India who enjoy the nostalgic, authentic crunch of Naidu Pootharekulu.
              </p>
            </div>

            {/* Reviews Grid */}
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {customerReviews.map((rev) => (
                <Card key={rev.name} className="flex flex-col justify-between rounded-2xl border border-border bg-card p-6 shadow-sweet">
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex gap-1 text-shop-gold">
                        {Array.from({ length: rev.rating }).map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-shop-gold text-shop-gold" />
                        ))}
                      </div>
                      <span className="text-xs font-semibold text-shop-red">{rev.sweet}</span>
                    </div>

                    <p className="mt-4 text-sm leading-relaxed text-foreground/90 italic">
                      "{rev.comment}"
                    </p>
                  </div>

                  <div className="mt-6 border-t border-border/70 pt-4">
                    <p className="font-display font-bold text-shop-maroon">{rev.name}</p>
                    <p className="text-xs text-muted-foreground">{rev.location}</p>
                    <p className="mt-1 text-[11px] font-semibold text-shop-leaf">{rev.date}</p>
                  </div>
                </Card>
              ))}
            </div>

            {/* FAQ Accordion Section */}
            <div className="mt-20">
              <div className="text-center">
                <span className="inline-flex items-center gap-2 rounded-full border border-border bg-shop-soft px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-shop-maroon">
                  Got Questions?
                </span>
                <h3 className="mt-3 font-display text-3xl font-bold text-shop-maroon sm:text-4xl">
                  Frequently Asked Questions
                </h3>
              </div>

              <div className="mx-auto mt-8 max-w-3xl space-y-4">
                {faqs.map((faq, idx) => {
                  const isOpen = openFaqIndex === idx;
                  return (
                    <div
                      key={faq.question}
                      className="overflow-hidden rounded-2xl border border-border bg-card transition-all duration-200"
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                        className="flex w-full items-center justify-between gap-4 p-5 text-left font-display text-lg font-bold text-shop-maroon hover:text-shop-red"
                      >
                        <span>{faq.question}</span>
                        <ChevronDown
                          className={cn(
                            "h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200",
                            isOpen && "rotate-180 text-shop-red",
                          )}
                        />
                      </button>
                      {isOpen && (
                        <div className="border-t border-border/70 px-5 pb-5 pt-3 text-sm leading-relaxed text-muted-foreground">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="bg-shop-hero px-4 py-20 text-primary-foreground sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <img
                src={logoImage}
                alt="Naidu Pootharekulu logo"
                width={160}
                height={160}
                loading="lazy"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = "/favicon.png";
                }}
                className="h-32 w-32 rounded-full border-4 border-shop-gold object-cover shadow-shop"
              />
              <h2 className="mt-8 font-display text-4xl font-bold text-shop-cream sm:text-5xl">
                Contact us
              </h2>
              <p className="mt-4 max-w-xl text-shop-cream/85">
                Order for festivals, weddings, return gifts, and family sweet boxes.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <ContactCard icon={<Phone className="h-5 w-5" />} label="Phone" value={contactDetails.phone} />
              <ContactCard icon={<Phone className="h-5 w-5" />} label="WhatsApp" value={contactDetails.whatsapp} />
              <ContactCard icon={<Mail className="h-5 w-5" />} label="Email" value={contactDetails.email} />
              <ContactCard icon={<MapPin className="h-5 w-5" />} label="Store" value={contactDetails.address} />
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/70 bg-card py-8 text-center text-xs text-muted-foreground">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <img src={logoImage} alt="" className="h-8 w-8 rounded-full border border-shop-gold object-cover" />
            <span className="font-display font-bold text-shop-maroon">Naidu Pootharekulu</span>
            <span>• Atreyapuram, Andhra Pradesh</span>
          </div>
          <p>© {new Date().getFullYear()} Naidu Pootharekulu. All rights reserved. Pan-India Delivery.</p>
        </div>
      </footer>
    </div>
  );
}

function ContactCard({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-shop-gold/40 bg-shop-maroon/45 p-5 text-shop-cream shadow-sweet backdrop-blur">
      <div className="flex items-center gap-3 text-shop-gold">
        {icon}
        <p className="text-sm font-bold uppercase tracking-widest">{label}</p>
      </div>
      <p className="mt-4 text-base font-semibold leading-7">{value}</p>
    </div>
  );
}
