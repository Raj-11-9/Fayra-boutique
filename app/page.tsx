"use client";

import {
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Heart,
  Mail,
  MessageCircle,
  Menu,
  Minus,
  Plus,
  Phone,
  Search,
  ShoppingBag,
  Sparkles,
  X,
} from "lucide-react";
import Image from "next/image";
import { FormEvent, useEffect, useId, useMemo, useState, type ReactNode } from "react";
import { collectionFilters, dressCategories, dressDesignCount, products, type DressCategory, type Product } from "../lib/products";

const heroSlides = [
  {
    image: "/images/products/pexels-11748805.webp",
    alt: "Deep maroon embroidered bridal lehenga",
    eyebrow: "The Fayra occasion edit · 2026",
    title: <>Find your<br /><em className="font-normal">expression.</em></>,
    description: "A considered collection of Indian occasionwear, chosen for the details, silhouettes, and moments that feel like you.",
    primary: "Explore the edit",
    secondary: "Shop the collection",
    filter: "All dresses",
  },
  {
    image: "/images/products/pexels-14928074.webp",
    alt: "Red Indian saree with a gold border",
    eyebrow: "The art of the drape",
    title: <>A softer kind<br /><em className="font-normal">of statement.</em></>,
    description: "Discover sarees in expressive colour and timeless silhouettes, selected for celebrations and the moments between.",
    primary: "Discover sarees",
    secondary: "Explore the edit",
    filter: "Sarees",
  },
  {
    image: "/images/products/pexels-14205210.webp",
    alt: "Ivory saree with a soft woven border",
    eyebrow: "Made for your moment",
    title: <>Dressed for<br /><em className="font-normal">what matters.</em></>,
    description: "Find occasionwear for the long lunches, bright evenings, and family gatherings you look forward to.",
    primary: "Find your occasion",
    secondary: "Explore the edit",
    filter: "All dresses",
  },
  {
    image: "/images/products/pexels-34933700.webp",
    alt: "Burgundy Punjabi suit with embroidered details",
    eyebrow: "Rooted in Punjab",
    title: <>Tradition,<br /><em className="font-normal">with a new point of view.</em></>,
    description: "Explore Punjabi silhouettes with expressive colours and details for the season's celebrations.",
    primary: "Shop Punjabi suits",
    secondary: "Shop the collection",
    filter: "Punjabi Edit",
  },
  {
    image: "/images/products/pexels-20777181.webp",
    alt: "Lavender kurta set with a light dupatta",
    eyebrow: "Elegance, made effortless",
    title: <>The beauty<br /><em className="font-normal">of ease.</em></>,
    description: "Discover versatile kurta sets for festive lunches, casual gatherings, and the everyday in between.",
    primary: "Shop kurta sets",
    secondary: "Explore the edit",
    filter: "Kurta Sets",
  },
];

const categoryCards = [
  { title: "Punjabi suits", kicker: "The Patiala & Phulkari edit", image: "/images/products/pexels-20788501.webp", crop: "center 25%", filter: "Punjabi Edit" },
  { title: "Sarees", kicker: "The drape edit", image: "/images/products/pexels-14928074.webp", crop: "center 24%", filter: "Sarees" },
  { title: "Lehengas", kicker: "Made for your moment", image: "/images/products/pexels-12668925.webp", crop: "72% center", filter: "Lehengas" },
  { title: "Salwar suits", kicker: "Everyday, elevated", image: "/images/products/pexels-36325924.webp", crop: "center 28%", filter: "Salwar Suits" },
  { title: "Anarkalis", kicker: "A little more movement", image: "/images/products/pexels-5399874.webp", crop: "center 22%", filter: "Anarkalis" },
  { title: "Sharara sets", kicker: "Made to move", image: "/images/products/pexels-33557615.webp", crop: "center 22%", filter: "Sharara & Gharara" },
  { title: "Kurta sets", kicker: "Easy, considered dressing", image: "/images/products/pexels-25184995.webp", crop: "center 20%", filter: "Kurta Sets" },
  { title: "Indo-Western", kicker: "A modern point of view", image: "/images/products/pexels-38876958.webp", crop: "center 25%", filter: "Indo-Western" },
];

const categoryIntros: Record<DressCategory, string> = {
  "Punjabi Suits": "Phulkari-inspired details, Patiala pleats, and celebratory Punjabi silhouettes.",
  "Salwar Suits": "Timeless kameez and salwar pairings, from easy cottons to occasion silks.",
  Sarees: "Considered six-yard drapes in luminous silk, airy organza, and handwoven textures.",
  Lehengas: "Statement skirts and thoughtfully finished sets for your biggest celebrations.",
  Anarkalis: "Fluid, panelled silhouettes made for graceful movement and festive gatherings.",
  "Sharara & Gharara": "Expressive flares, considered layers, and dupattas made to move with you.",
  "Kurta Sets": "Refined everyday and festive sets selected for comfort and repeat wear.",
  "Indo-Western": "Modern occasion dressing that brings fresh lines to familiar traditions.",
};

const categorySlug = (category: DressCategory) => category.toLowerCase().replace(/[^a-z0-9]+/g, "-");
const sellerWhatsAppNumber = "919294924996";
const sellerPhoneDisplay = `+${sellerWhatsAppNumber.slice(0, 2)} ${sellerWhatsAppNumber.slice(2, 7)} ${sellerWhatsAppNumber.slice(7)}`;
const sellerEmail = "rajkumarsingh07337@gmail.com";
const sellerEmailUrl = `mailto:${sellerEmail}?subject=${encodeURIComponent("Fayra Boutique enquiry")}`;
const complimentaryShippingMinimum = 5000;
const wishlistStorageKey = "fayra-saved-styles";
const formatRupees = (amount: number) => `₹${amount.toLocaleString("en-IN")}`;
const normalizeSearchText = (value: string) => value
  .toLowerCase()
  .normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "")
  .replace(/[^a-z0-9]+/g, " ")
  .trim()
  .replace(/\s+/g, " ");
const matchesProductSearch = (product: Product, rawQuery: string) => {
  const query = rawQuery.trim().toLowerCase();
  const budgetMatch = query.match(/(?:under|below|up to|upto)\s*(?:₹|rs\.?\s*|inr\s*)?([\d,]+)/i);
  const typedBudget = budgetMatch ? Number(budgetMatch[1].replace(/,/g, "")) : null;
  const maxPrice = typedBudget === null ? null : Math.min(typedBudget, complimentaryShippingMinimum);
  if (maxPrice !== null && product.priceValue >= maxPrice) return false;

  const tokens = normalizeSearchText(budgetMatch ? query.replace(budgetMatch[0], " ") : query)
    .split(" ")
    .filter((token) => token.length > 1);
  if (!tokens.length) return true;
  const searchableText = normalizeSearchText([
    product.name,
    product.note,
    product.category,
    product.collection,
    product.tone,
    product.fabric,
    product.craft,
    product.silhouette,
    product.occasion,
    product.description,
  ].join(" "));
  const words = searchableText.split(" ");
  return tokens.every((token) => words.some((word) => word.includes(token) || (token.length > 4 && token.slice(0, -1) === word.slice(0, -1))));
};
const normalizeRecentSearch = (query: string) => {
  const budgetMatch = query.match(/(?:under|below|up to|upto)\s*(?:₹|rs\.?\s*|inr\s*)?([\d,]+)/i);
  if (!budgetMatch) return query.trim();
  const budget = Number(budgetMatch[1].replace(/,/g, ""));
  return budget > complimentaryShippingMinimum ? "under 5000" : query.trim();
};
const recentSearchStorageKey = "fayra-recent-searches";
const bestSellerNames = [
  "Phulkari Patiala Suit",
  "Punjabi Mirror-Work Suit",
  "Chanderi Zari Saree",
  "Banarasi Brocade Saree",
];
const fallbackRecommendationNames = [
  "Embroidered Bridal Lehenga",
  "Floor-Length Anarkali Gown",
  "Pink Embroidered Lehenga Set",
  "Silver Draped Evening Set",
  "Mirror-Work Festive Lehenga",
  "Angrakha Anarkali Suit",
  "Chiffon Sharara Occasion Set",
  "Jacket-Style Saree Gown",
];

function Logo() {
  return (
    <a href="#top" className="brand-lockup group inline-flex items-center gap-3" aria-label="Fayra Boutique home">
      <span className="brand-seal" aria-hidden="true">
        <span className="brand-seal-inner">F</span>
      </span>
      <span className="brand-wordmark">
        <span className="brand-name">FAYRA</span>
        <span className="brand-caption">BOUTIQUE <i>·</i> INDIA</span>
      </span>
    </a>
  );
}

function ProductCard({
  product,
  onAdd,
  onQuickView,
  liked,
  onToggleWishlist,
}: {
  product: Product;
  onAdd: (product: Product) => void;
  onQuickView: (product: Product) => void;
  liked: boolean;
  onToggleWishlist: (product: Product) => void;
}) {
  return (
    <article className="group min-w-0">
      <div className="relative aspect-[3/4.25] overflow-hidden bg-[#ece3d7]">
        <Image
          src={product.image}
          alt={product.name}
          width={640}
          height={850}
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
          className="h-full w-full object-contain p-2 transition duration-700 ease-out group-hover:saturate-110 sm:p-3"
        />
        <div className="absolute left-3 top-3 bg-[#fffaf2]/90 px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.2em] text-[#321b18] backdrop-blur">
          {product.category}
        </div>
        <button
          aria-label={liked ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
          aria-pressed={liked}
          onClick={() => onToggleWishlist(product)}
          className={`product-wishlist-button absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-[#fffaf2]/90 transition hover:bg-white ${liked ? "is-liked" : "text-[#321b18]"}`}
        >
          <Heart size={16} fill={liked ? "currentColor" : "none"} />
        </button>
        <button
          onClick={() => onAdd(product)}
          className="absolute inset-x-3 bottom-3 flex translate-y-0 items-center justify-center gap-2 bg-[#fffaf2] px-3 py-3 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#321b18] opacity-100 transition duration-300 sm:translate-y-2 sm:px-4 sm:text-[10px] sm:tracking-[0.2em] sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100 focus:translate-y-0 focus:opacity-100"
        >
          <Plus size={14} /> Quick add
        </button>
      </div>
      <div className="flex flex-col items-start gap-1 pt-4 sm:flex-row sm:justify-between sm:gap-4">
        <div>
          <p className="mb-1 text-[10px] uppercase tracking-[0.18em] text-[#8c6d5f]">{product.tone}</p>
          <h3 className="font-serif text-[20px] leading-tight text-[#261816]">{product.name}</h3>
          <p className="mt-1.5 text-xs leading-5 text-[#7b6c64]">{product.fabric} · {product.craft}</p>
        </div>
        <p className="whitespace-nowrap pt-1 text-sm text-[#261816] sm:pt-6">{product.price}</p>
      </div>
      <button onClick={() => onQuickView(product)} className="mt-3 inline-flex items-center gap-2 border-b border-[#8d6e5f]/50 pb-1 text-[9px] font-semibold uppercase tracking-[0.16em] text-[#705348] transition hover:border-[#5a1721] hover:text-[#5a1721]">
        View details <ArrowRight size={12} />
      </button>
    </article>
  );
}

type NavMegaMenuItem = {
  label: string;
  detail: string;
  onSelect: () => void;
};

function NavMegaMenu({
  label,
  eyebrow,
  title,
  description,
  items,
  actionLabel,
  onAction,
  featureImage,
  featureAlt,
  featureTitle,
  active = false,
}: {
  label: string;
  eyebrow: string;
  title: string;
  description: string;
  items: NavMegaMenuItem[];
  actionLabel: string;
  onAction: () => void;
  featureImage: string;
  featureAlt: string;
  featureTitle: string;
  active?: boolean;
}) {
  return (
    <details
      className={`category-mega ${active ? "category-mega-active" : ""}`}
      onMouseEnter={(event) => {
        if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
          event.currentTarget.open = true;
        }
      }}
      onMouseLeave={(event) => {
        if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
          event.currentTarget.open = false;
        }
      }}
    >
      <summary className={`nav-link flex list-none items-center gap-1.5 ${active ? "nav-link-active" : ""}`}>
        {label}<ChevronDown size={13} />
      </summary>
      <div className="category-mega-panel">
        <aside className="nav-mega-feature">
          <Image src={featureImage} alt={featureAlt} width={720} height={900} sizes="320px" className="nav-mega-feature-image" />
          <div className="nav-mega-feature-shade" />
          <span className="nav-mega-feature-mark">FAYRA <i>·</i> BOUTIQUE</span>
          <div className="nav-mega-feature-copy">
            <span className="nav-mega-feature-kicker">{eyebrow}</span>
            <h3>{featureTitle}</h3>
            <span className="nav-mega-feature-count">{String(items.length).padStart(2, "0")} CURATED DESTINATIONS</span>
          </div>
        </aside>
        <div className="nav-mega-content">
          <header className="nav-mega-heading">
            <p className="nav-mega-eyebrow"><span />{eyebrow}</p>
            <h2>{title}</h2>
            <p className="nav-mega-description">{description}</p>
          </header>
          <div className="nav-mega-list-heading">
            <span>EXPLORE THE EDIT</span>
            <span>{String(items.length).padStart(2, "0")} LINKS</span>
          </div>
          <div className={`nav-mega-items ${items.length <= 4 ? "nav-mega-items-compact" : ""}`}>
            {items.map((item, index) => (
              <button key={`${item.label}-${index}`} onClick={item.onSelect} className="mega-category-link">
                <span className="nav-mega-number">{String(index + 1).padStart(2, "0")}</span>
                <span className="nav-mega-link-copy">
                  <span className="nav-mega-link-title">{item.label}</span>
                  <span className="nav-mega-link-detail">{item.detail}</span>
                </span>
                <ArrowRight className="nav-mega-link-arrow" size={14} />
              </button>
            ))}
          </div>
          <button onClick={onAction} className="nav-mega-action">
            <span>{actionLabel}</span><ArrowRight size={15} />
          </button>
        </div>
      </div>
    </details>
  );
}

function FeaturedProductSection({
  id,
  eyebrow,
  title,
  description,
  products,
  onAdd,
  onQuickView,
  wishlistNames,
  onToggleWishlist,
  recentSearches,
}: {
  id: string;
  eyebrow: string;
  title: ReactNode;
  description: string;
  products: Product[];
  onAdd: (product: Product) => void;
  onQuickView: (product: Product) => void;
  wishlistNames: string[];
  onToggleWishlist: (product: Product) => void;
  recentSearches?: string[];
}) {
  return (
    <section id={id} className="border-y border-[#3e271f]/10 bg-[#fbf7f0] px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
      <div className="mx-auto max-w-[1500px]">
        <div className="mb-9 flex flex-col justify-between gap-5 sm:mb-12 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow">{eyebrow}</p>
            <h2 className="font-serif text-[clamp(2.6rem,5vw,4.8rem)] leading-[.95] tracking-[-.04em]">{title}</h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-[#74645b]">{description}</p>
        </div>
        {recentSearches && recentSearches.length > 0 && (
          <div className="mb-7 flex flex-wrap items-center gap-2">
            <span className="mr-1 text-[9px] font-semibold uppercase tracking-[.16em] text-[#8c6d5f]">Inspired by</span>
            {recentSearches.slice(0, 3).map((query) => (
              <span key={query} className="border border-[#3e271f]/15 px-3 py-1.5 text-[10px] text-[#705348]">{query}</span>
            ))}
          </div>
        )}
        {products.length > 0 ? (
          <div className="grid grid-cols-2 gap-x-3 gap-y-9 sm:gap-x-5 lg:grid-cols-4 lg:gap-x-6">
            {products.map((product, index) => (
              <div key={product.name} className="reveal" style={{ transitionDelay: `${index * 70}ms` }}>
                <ProductCard product={product} onAdd={onAdd} onQuickView={onQuickView} liked={wishlistNames.includes(product.name)} onToggleWishlist={onToggleWishlist} />
              </div>
            ))}
          </div>
        ) : (
          <p className="py-8 text-sm text-[#74645b]">Your curated edit is being prepared. Explore the collection below in the meantime.</p>
        )}
      </div>
    </section>
  );
}

function ProductQuickView({
  product,
  onClose,
  onAdd,
}: {
  product: Product;
  onClose: () => void;
  onAdd: (product: Product) => void;
}) {
  const [selectedImage, setSelectedImage] = useState(product.image);
  const gallery = product.gallery.length ? product.gallery : [product.image];

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[60] grid place-items-center overflow-y-auto bg-[#1e100d]/60 p-4 backdrop-blur-sm sm:p-8" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section role="dialog" aria-modal="true" aria-labelledby="quick-view-title" className="quick-view-panel relative my-auto grid w-full max-w-5xl overflow-hidden bg-[#fbf7f0] shadow-2xl md:grid-cols-2">
        <button onClick={onClose} className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-[#fbf7f0]/90 transition hover:rotate-90 hover:bg-white" aria-label="Close product details"><X size={20} /></button>
        <div className="bg-[#eee5d9] p-4 sm:p-6">
          <div className="flex h-[min(68vh,620px)] items-center justify-center overflow-hidden bg-[#f7f1e8]">
            <Image key={selectedImage} src={selectedImage} alt={`${product.name} product view`} width={900} height={1200} sizes="(min-width: 768px) 50vw, 100vw" className="h-full w-full object-contain p-2" />
          </div>
          {gallery.length > 1 && (
            <div className="mt-3 grid grid-cols-4 gap-3">
              {gallery.map((image, index) => (
                <button key={image} onClick={() => setSelectedImage(image)} className={`overflow-hidden border-2 bg-[#f7f1e8] ${selectedImage === image ? "border-[#5a1721]" : "border-transparent"}`} aria-label={`View product image ${index + 1}`}>
                  <Image src={image} alt="" width={320} height={240} sizes="(min-width: 768px) 12vw, 25vw" className="aspect-[4/3] w-full object-contain" />
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="flex flex-col px-6 py-10 sm:px-10 sm:py-14">
          <p className="eyebrow !mb-3">{product.category} · {product.tone}</p>
          <h2 id="quick-view-title" className="font-serif text-4xl leading-[1.05] sm:text-5xl">{product.name}</h2>
          <p className="mt-4 font-serif text-2xl text-[#5a1721]">{product.price}</p>
          <p className="mt-6 text-sm leading-6 text-[#74645b]">{product.description}</p>
          <p className="mt-3 text-xs leading-5 text-[#947b6d]">Photo is a style reference. Please confirm the exact colour, fabric, and embroidery with us on WhatsApp before ordering.</p>

          <dl className="mt-8 grid grid-cols-2 gap-x-5 gap-y-5 border-y border-[#3e271f]/12 py-6">
            {[["Fabric", product.fabric], ["Details", product.craft], ["Silhouette", product.silhouette], ["Occasion", product.occasion]].map(([label, value]) => (
              <div key={label}>
                <dt className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#947b6d]">{label}</dt>
                <dd className="mt-1.5 text-xs leading-5 text-[#3d2c26]">{value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-6">
            <p className="mb-3 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#947b6d]">Available size</p>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => <span key={size} className="grid min-h-9 min-w-10 place-items-center border border-[#3e271f]/15 px-2 text-[10px] text-[#3d2c26]">{size}</span>)}
            </div>
          </div>
          <button onClick={() => onAdd(product)} className="mt-auto flex w-full items-center justify-center gap-3 bg-[#4b1922] px-5 py-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-[#6a2431]">
            <Plus size={15} /> Add to bag
          </button>
          <p className="mt-3 text-center text-[9px] text-[#89776c]">Complimentary shipping on orders ₹5,000+</p>
        </div>
      </section>
    </div>
  );
}

export default function Home() {
  const instanceId = useId();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("home");
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchCategory, setSearchCategory] = useState<DressCategory | "All pieces">("All pieces");
  const [searchPriceCap, setSearchPriceCap] = useState("all");
  const [searchSort, setSearchSort] = useState("relevance");
  const [searchVisibleCount, setSearchVisibleCount] = useState(6);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [recentSearchesLoaded, setRecentSearchesLoaded] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [wishlistNames, setWishlistNames] = useState<string[]>([]);
  const [wishlistLoaded, setWishlistLoaded] = useState(false);
  const [activeFilter, setActiveFilter] = useState<(typeof collectionFilters)[number]>("All dresses");
  const [sortOrder, setSortOrder] = useState("featured");
  const [visibleCount, setVisibleCount] = useState(12);
  const [heroIndex, setHeroIndex] = useState(0);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<{ product: Product; quantity: number }[]>([]);
  const [orderReference, setOrderReference] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const filteredProducts = useMemo(
    () => {
      if (activeFilter === "All dresses") return products;
      if (activeFilter === "Punjabi Edit") return products.filter((item) => item.collection === "Punjabi Edit");
      return products.filter((item) => item.category === activeFilter);
    },
    [activeFilter],
  );
  const sortedProducts = useMemo(() => {
    if (sortOrder === "price-low") return [...filteredProducts].sort((a, b) => a.priceValue - b.priceValue);
    if (sortOrder === "price-high") return [...filteredProducts].sort((a, b) => b.priceValue - a.priceValue);
    if (sortOrder === "name") return [...filteredProducts].sort((a, b) => a.name.localeCompare(b.name));
    return filteredProducts;
  }, [filteredProducts, sortOrder]);
  const visibleProducts = sortedProducts.slice(0, visibleCount);
  const currentHero = heroSlides[heroIndex];
  const bestSellingProducts = useMemo(
    () => bestSellerNames
      .map((name) => products.find((product) => product.name === name))
      .filter((product): product is Product => product !== undefined),
    [],
  );
  const recommendationProducts = useMemo(() => {
    const bestSellerSet = new Set(bestSellingProducts.map((product) => product.name));
    const matches = recentSearches.flatMap((recentQuery) => {
      const query = recentQuery.trim().toLowerCase();
      if (!query) return [];
      if (query.includes("under") && (query.includes("5000") || query.includes("5,000"))) {
        return products.filter((product) => product.priceValue < 5000);
      }
      return products.filter((product) =>
        `${product.name} ${product.note} ${product.category} ${product.collection} ${product.fabric} ${product.craft} ${product.occasion}`
          .toLowerCase()
          .includes(query),
      );
    });
    const recommended = [...matches, ...fallbackRecommendationNames
      .map((name) => products.find((product) => product.name === name))
      .filter((product): product is Product => product !== undefined)];
    const uniqueRecommendations = new Map<string, Product>();
    recommended.forEach((product) => {
      if (!bestSellerSet.has(product.name)) uniqueRecommendations.set(product.name, product);
    });
    return [...uniqueRecommendations.values()].slice(0, 4);
  }, [bestSellingProducts, recentSearches]);
  const searchResults = useMemo(() => {
    const selectedBudget = searchPriceCap === "all" ? null : Number(searchPriceCap);
    const maxPrice = selectedBudget === null ? null : Math.min(selectedBudget, complimentaryShippingMinimum);

    let matches = products.filter((product) => {
      if (searchCategory !== "All pieces" && product.category !== searchCategory) return false;
      if (maxPrice !== null && product.priceValue >= maxPrice) return false;
      return !searchQuery.trim() || matchesProductSearch(product, searchQuery);
    });

    if (searchSort === "price-low") matches = [...matches].sort((a, b) => a.priceValue - b.priceValue);
    if (searchSort === "price-high") matches = [...matches].sort((a, b) => b.priceValue - a.priceValue);
    if (searchSort === "name") matches = [...matches].sort((a, b) => a.name.localeCompare(b.name));
    return matches;
  }, [searchQuery, searchCategory, searchPriceCap, searchSort]);
  const hasSearchFilters = Boolean(searchQuery.trim()) || searchCategory !== "All pieces" || searchPriceCap !== "all" || searchSort !== "relevance";

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cart.reduce((total, item) => total + item.product.priceValue * item.quantity, 0);
  const wishlistProducts = useMemo(
    () => wishlistNames
      .map((name) => products.find((product) => product.name === name))
      .filter((product): product is Product => product !== undefined),
    [wishlistNames],
  );
  const shippingAmountRemaining = Math.max(0, complimentaryShippingMinimum - cartTotal);
  const activeOrderReference = orderReference ?? `AV-${instanceId.replace(/[^a-zA-Z0-9]/g, "").toUpperCase()}`;
  const whatsappMessage = [
    "Hello Fayra Boutique, I would like to place this order:",
    "",
    `Order reference: ${activeOrderReference}`,
    ...cart.map(({ product, quantity }) => `• ${product.name} (${product.category}) × ${quantity} — ${formatRupees(product.priceValue * quantity)}`),
    "",
    `Total: ${formatRupees(cartTotal)}`,
    "",
    "Please confirm the order and share the next steps for delivery. I look forward to hearing from your seller soon.",
  ].join("\n");
  const whatsappUrl = `https://wa.me/${sellerWhatsAppNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  useEffect(() => {
    const closeContactMenu = (event: MouseEvent) => {
      if ((event.target as HTMLElement).closest(".contact-menu")) return;
      document.querySelectorAll<HTMLDetailsElement>(".contact-menu[open]").forEach((menu) => { menu.open = false; });
    };
    document.addEventListener("click", closeContactMenu);
    return () => document.removeEventListener("click", closeContactMenu);
  }, []);

  useEffect(() => {
    if (!searchOpen && !cartOpen && !wishlistOpen) return;
    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSearchOpen(false);
        setCartOpen(false);
        setWishlistOpen(false);
      }
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [searchOpen, cartOpen, wishlistOpen]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setHeroIndex((index) => (index + 1) % heroSlides.length);
    }, 5500);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const storedSearches = window.localStorage.getItem(recentSearchStorageKey);
        if (storedSearches) {
          const parsedSearches: unknown = JSON.parse(storedSearches);
          if (Array.isArray(parsedSearches)) {
            const validSearches = parsedSearches
              .filter((query): query is string => typeof query === "string" && query.trim().length > 0)
              .map(normalizeRecentSearch)
              .filter((query) => products.some((product) => matchesProductSearch(product, query)));
            setRecentSearches([...new Set(validSearches)].slice(0, 8));
          }
        }
      } catch (error) {
        console.warn("Unable to load recent searches from browser storage.", error);
      } finally {
        setRecentSearchesLoaded(true);
      }
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!recentSearchesLoaded) return;
    try {
      window.localStorage.setItem(recentSearchStorageKey, JSON.stringify(recentSearches));
    } catch (error) {
      console.warn("Unable to save recent searches to browser storage.", error);
    }
  }, [recentSearches, recentSearchesLoaded]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const storedWishlist = window.localStorage.getItem(wishlistStorageKey);
        if (storedWishlist) {
          const parsedWishlist: unknown = JSON.parse(storedWishlist);
          if (Array.isArray(parsedWishlist)) {
            const validNames = parsedWishlist.filter((name): name is string =>
              typeof name === "string" && products.some((product) => product.name === name),
            );
            setWishlistNames([...new Set(validNames)]);
          }
        }
      } catch (error) {
        console.warn("Unable to load saved styles from browser storage.", error);
      } finally {
        setWishlistLoaded(true);
      }
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!wishlistLoaded) return;
    try {
      window.localStorage.setItem(wishlistStorageKey, JSON.stringify(wishlistNames));
    } catch (error) {
      console.warn("Unable to save styles to browser storage.", error);
    }
  }, [wishlistNames, wishlistLoaded]);

  useEffect(() => {
    const query = searchQuery.trim();
    if (!recentSearchesLoaded || query.length < 2 || !products.some((product) => matchesProductSearch(product, query))) return;
    const timer = window.setTimeout(() => {
      setRecentSearches((previousSearches) => [
        query,
        ...previousSearches.filter((savedQuery) => savedQuery.toLowerCase() !== query.toLowerCase()),
      ].slice(0, 8));
    }, 500);
    return () => window.clearTimeout(timer);
  }, [recentSearchesLoaded, searchQuery]);

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>(".reveal");
    const observer = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            currentObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [visibleProducts.length, activeFilter, visibleCount, sortOrder]);

  useEffect(() => {
    const sectionIds = ["home-hero", "best-selling", "recommended-for-you", "shop", "selection"];
    const updateActiveNav = () => {
      const activeSection = [...sectionIds]
        .reverse()
        .find((id) => {
          const section = document.getElementById(id);
          return section && section.getBoundingClientRect().top <= 150;
        });
      setActiveNav(activeSection === "home-hero" || !activeSection ? "home" : activeSection);
    };
    updateActiveNav();
    window.addEventListener("scroll", updateActiveNav, { passive: true });
    return () => window.removeEventListener("scroll", updateActiveNav);
  }, []);

  const changeHero = (direction: number) => {
    setHeroIndex((index) => (index + direction + heroSlides.length) % heroSlides.length);
  };

  const selectFilter = (filter: (typeof collectionFilters)[number]) => {
    setActiveFilter(filter);
    setVisibleCount(12);
  };

  const closeDesktopMenus = () => {
    document.querySelectorAll<HTMLDetailsElement>(".desktop-nav details[open]").forEach((menu) => {
      menu.open = false;
    });
  };

  const navigateToFilter = (filter: (typeof collectionFilters)[number]) => {
    selectFilter(filter);
    setActiveNav("shop");
    document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
    closeDesktopMenus();
  };

  const navigateToSection = (sectionId: string) => {
    setActiveNav(sectionId);
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
    closeDesktopMenus();
  };

  const navigateToCategory = (category: DressCategory) => {
    selectFilter("All dresses");
    setActiveNav("shop");
    setMenuOpen(false);
    closeDesktopMenus();
    window.setTimeout(() => {
      document.getElementById(`category-${categorySlug(category)}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 0);
  };

  const openMenuProduct = (product: Product, sectionId: string) => {
    closeDesktopMenus();
    setActiveNav(sectionId === "shop" ? "shop" : sectionId);
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    setQuickViewProduct(product);
    setMenuOpen(false);
  };

  const addToCart = (product: Product) => {
    setOrderReference(null);
    setCart((items) => {
      const existing = items.find((item) => item.product.name === product.name);
      return existing
        ? items.map((item) => item.product.name === product.name ? { ...item, quantity: item.quantity + 1 } : item)
        : [...items, { product, quantity: 1 }];
    });
    setCartOpen(true);
  };

  const toggleWishlist = (product: Product) => {
    setWishlistNames((names) => names.includes(product.name)
      ? names.filter((name) => name !== product.name)
      : [...names, product.name]);
  };

  const updateQuantity = (name: string, change: number) => {
    setOrderReference(null);
    setCart((items) => items
      .map((item) => item.product.name === name ? { ...item, quantity: item.quantity + change } : item)
      .filter((item) => item.quantity > 0));
  };

  const handleSubscribe = (event: FormEvent) => {
    event.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail("");
  };

  return (
    <main id="top" className="min-h-screen overflow-x-clip bg-[#f7f1e8] text-[#271815]">
      <div className="bg-[#5a1721] px-4 py-2.5 text-center text-[9px] font-medium uppercase tracking-[0.24em] text-[#fff9ef] sm:text-[10px]">
        Private appointments now open <span className="mx-3 opacity-50">•</span> Complimentary shipping on orders ₹5,000+
      </div>

      <header className="site-header sticky top-0 z-40 border-b border-[#3e271f]/10 bg-[#f7f1e8]/95 backdrop-blur-xl">
        <div className="header-inner mx-auto flex h-[78px] max-w-[1500px] items-center justify-between gap-4 px-4 sm:px-8 lg:h-[86px] lg:px-12">
          <div className="flex shrink-0 items-center gap-2 sm:gap-4">
            <button className="menu-toggle grid h-10 w-10 place-items-center rounded-full border border-[#3e271f]/15 transition hover:bg-[#efe4d6] xl:hidden" onClick={() => setMenuOpen(true)} aria-label="Open menu"><Menu size={19} /></button>
            <Logo />
          </div>
          <nav
            className="desktop-nav hidden items-center gap-1 xl:flex"
            aria-label="Main navigation"
            onKeyDown={(event) => {
              if (event.key === "Escape") closeDesktopMenus();
            }}
          >
            <NavMegaMenu
              label="Collections"
              eyebrow="The complete collection"
              title="Find your next favourite."
              description="Explore every silhouette in the Fayra wardrobe, from everyday kurta sets to occasion-ready heirlooms."
              items={[
                { label: "Punjabi Edit", detail: "Phulkari, Patiala & festive suits", onSelect: () => navigateToFilter("Punjabi Edit") },
                ...dressCategories.map((category) => ({
                  label: category,
                  detail: `${products.filter((product) => product.category === category).length} styles to explore`,
                  onSelect: () => navigateToCategory(category),
                })),
              ]}
              actionLabel={`Shop all ${products.length} styles`}
              onAction={() => navigateToFilter("All dresses")}
              featureImage={products.find((product) => product.category === "Lehengas")?.image ?? heroSlides[0].image}
              featureAlt="Embroidered lehenga from the Fayra occasionwear collection"
              featureTitle="Dress for the moment."
              active={activeNav === "shop" && activeFilter === "All dresses"}
            />
            <NavMegaMenu
              label="Punjabi edit"
              eyebrow="Rooted in Punjab"
              title="Tradition, with a new point of view."
              description="Discover expressive Phulkari details, graceful Patiala pleats, and modern Punjabi occasionwear."
              items={[
                { label: "All Punjabi Edit", detail: "The complete Punjabi collection", onSelect: () => navigateToFilter("Punjabi Edit") },
                { label: "Punjabi Suits", detail: `${products.filter((product) => product.category === "Punjabi Suits").length} Punjabi suit styles`, onSelect: () => navigateToCategory("Punjabi Suits") },
                ...products.filter((product) => product.category === "Punjabi Suits").slice(0, 4).map((product) => ({
                  label: product.name,
                  detail: `${product.fabric} · ${product.craft}`,
                  onSelect: () => openMenuProduct(product, "shop"),
                })),
              ]}
              actionLabel="Explore the Punjabi edit"
              onAction={() => navigateToFilter("Punjabi Edit")}
              featureImage={products.find((product) => product.category === "Punjabi Suits")?.image ?? heroSlides[0].image}
              featureAlt="Punjabi suit from the Fayra traditional collection"
              featureTitle="Made for moments that matter."
              active={activeNav === "shop" && activeFilter === "Punjabi Edit"}
            />
            <NavMegaMenu
              label="Best sellers"
              eyebrow="The collection favourites"
              title="Loved for a reason."
              description="A quick path to the pieces shoppers return to for celebrations, gatherings, and everything in between."
              items={bestSellingProducts.map((product) => ({
                label: product.name,
                detail: `${product.category} · ${product.price}`,
                onSelect: () => openMenuProduct(product, "best-selling"),
              }))}
              actionLabel="See all best sellers"
              onAction={() => navigateToSection("best-selling")}
              featureImage={bestSellingProducts[0]?.image ?? heroSlides[0].image}
              featureAlt="A favourite from the Fayra best-selling collection"
              featureTitle="The pieces you return to."
              active={activeNav === "best-selling"}
            />
            <NavMegaMenu
              label="For you"
              eyebrow="A personal edit"
              title="Picked around your style."
              description={recentSearches.length
                ? "Open a recommendation shaped by the styles and details you have recently explored."
                : "A considered edit to inspire you. Your recommendations adapt as you search the collection."}
              items={recommendationProducts.map((product) => ({
                label: product.name,
                detail: `${product.category} · ${product.price}`,
                onSelect: () => openMenuProduct(product, "recommended-for-you"),
              }))}
              actionLabel="Explore your recommendations"
              onAction={() => navigateToSection("recommended-for-you")}
              featureImage={recommendationProducts[0]?.image ?? heroSlides[0].image}
              featureAlt="A personally selected look from the Fayra collection"
              featureTitle="A little something, just for you."
              active={activeNav === "recommended-for-you"}
            />
            <NavMegaMenu
              label="Categories"
              eyebrow="The Fayra wardrobe"
              title="Find your silhouette."
              description="Browse by the silhouette and occasion that feels right to you."
              items={dressCategories.map((category) => ({
                label: category,
                detail: `${products.filter((product) => product.category === category).length} styles`,
                onSelect: () => navigateToCategory(category),
              }))}
              actionLabel="Explore every category"
              onAction={() => navigateToFilter("All dresses")}
              featureImage={products.find((product) => product.category === "Sarees")?.image ?? heroSlides[0].image}
              featureAlt="Traditional Indian saree from the Fayra wardrobe"
              featureTitle="Find the form that feels like you."
              active={activeNav === "shop" && activeFilter !== "All dresses" && activeFilter !== "Punjabi Edit"}
            />
            <NavMegaMenu
              label="Our selection"
              eyebrow="Beyond the clothes"
              title="The details make the story."
              description="Explore the collection, book personal styling, and discover new arrivals."
              items={[
                { label: "Inside the collection", detail: "Textile, silhouette & hand finish", onSelect: () => navigateToSection("selection") },
                { label: "Private styling", detail: "Begin with your occasion", onSelect: () => navigateToSection("private-styling") },
                { label: "The Fayra letter", detail: "Seasonal stories & new arrivals", onSelect: () => navigateToSection("consultation") },
              ]}
              actionLabel="Discover the Fayra collection"
              onAction={() => navigateToSection("selection")}
              featureImage="/images/ivory-saree.png"
              featureAlt="Handwoven ivory saree detail from the Fayra collection"
              featureTitle="Find your next favourite."
              active={activeNav === "selection"}
            />
          </nav>
          <div className="header-actions flex shrink-0 items-center gap-1 sm:gap-2">
            <button className="header-action grid h-10 w-10 place-items-center rounded-full transition hover:bg-[#efe4d6]" onClick={() => { setSearchQuery(""); setSearchCategory("All pieces"); setSearchPriceCap("all"); setSearchSort("relevance"); setSearchVisibleCount(6); setSearchOpen(true); }} aria-label="Search"><Search size={18} /></button>
            <details className="contact-menu relative" onMouseEnter={(event) => { if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) event.currentTarget.open = true; }} onMouseLeave={(event) => { if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return; const nextTarget = event.relatedTarget; if (nextTarget instanceof Node && event.currentTarget.contains(nextTarget)) return; event.currentTarget.open = false; }} onKeyDown={(event) => { if (event.key === "Escape") { event.preventDefault(); event.currentTarget.open = false; event.currentTarget.querySelector("summary")?.focus(); } }}>
              <summary onClick={(event) => { if (event.detail === 0 || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return; event.preventDefault(); event.currentTarget.parentElement?.setAttribute("open", ""); }} className="header-action contact-trigger inline-flex h-10 w-10 list-none items-center justify-center gap-2 rounded-full px-2 transition hover:bg-[#efe4d6] md:w-auto md:px-3" aria-label="Contact Fayra" title="Contact Fayra"><Phone size={17} /><span className="hidden text-[9px] font-semibold uppercase tracking-[.12em] md:inline">Contact</span></summary>
              <div className="contact-menu-panel absolute right-0 top-full z-50 w-[min(88vw,340px)] overflow-hidden border border-[#3e271f]/10 bg-[#fbf7f0] text-left shadow-[0_18px_50px_rgba(42,23,18,.18)]">
                <div className="border-b border-[#3e271f]/10 bg-[#f3eadf] px-5 py-4"><p className="text-[8px] font-semibold uppercase tracking-[.2em] text-[#8c5b49]">Fayra Boutique</p><p className="mt-1 font-serif text-xl text-[#321b18]">How can we help?</p></div>
                <div className="p-2">
                  <a href={`https://wa.me/${sellerWhatsAppNumber}?text=${encodeURIComponent("Hello Fayra Boutique, I have a question about your collection.")}`} target="_blank" rel="noreferrer" onClick={(event) => { event.currentTarget.closest("details")?.removeAttribute("open"); }} className="contact-option flex items-center gap-3 px-3 py-3.5 transition hover:bg-white">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#e7f0e9] text-[#176b4b]"><MessageCircle size={17} /></span><span className="min-w-0 flex-1"><span className="block text-[10px] font-semibold uppercase tracking-[.13em] text-[#321b18]">WhatsApp</span><span className="mt-1 block text-[10px] text-[#88776d]">Chat with the boutique</span></span><ArrowRight size={14} className="text-[#9b8376]" />
                  </a>
                  <a href={sellerEmailUrl} onClick={(event) => { event.currentTarget.closest("details")?.removeAttribute("open"); }} className="contact-option flex items-center gap-3 px-3 py-3.5 transition hover:bg-white">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#f0e8f3] text-[#76547f]"><Mail size={17} /></span><span className="min-w-0 flex-1"><span className="block text-[10px] font-semibold uppercase tracking-[.13em] text-[#321b18]">Email</span><span className="mt-1 block break-all text-[10px] text-[#88776d]">{sellerEmail}</span></span><ArrowRight size={14} className="text-[#9b8376]" />
                  </a>
                  <a href={`tel:+${sellerWhatsAppNumber}`} onClick={(event) => { event.currentTarget.closest("details")?.removeAttribute("open"); }} className="contact-option flex items-center gap-3 px-3 py-3.5 transition hover:bg-white">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#f4eadc] text-[#8c5b49]"><Phone size={17} /></span><span className="min-w-0 flex-1"><span className="block text-[10px] font-semibold uppercase tracking-[.13em] text-[#321b18]">Call</span><span className="mt-1 block text-[10px] text-[#88776d]">{sellerPhoneDisplay}</span></span><ArrowRight size={14} className="text-[#9b8376]" />
                  </a>
                </div>
              </div>
            </details>
            <button className="header-action wishlist-header-button relative grid h-10 w-10 place-items-center rounded-full transition hover:bg-[#efe4d6]" onClick={() => { setCartOpen(false); setWishlistOpen(true); }} aria-label={`Open wishlist with ${wishlistProducts.length} saved ${wishlistProducts.length === 1 ? "style" : "styles"}`} aria-haspopup="dialog" aria-expanded={wishlistOpen} aria-controls="wishlist-dialog" title="Saved styles">
              <Heart size={18} fill={wishlistProducts.length ? "currentColor" : "none"} />
              {wishlistProducts.length > 0 && <span className="wishlist-count absolute -right-0.5 -top-0.5 grid h-[17px] min-w-[17px] place-items-center rounded-full px-1 text-[8px] font-semibold text-white">{wishlistProducts.length}</span>}
            </button>
            <button className="header-action relative grid h-10 w-10 place-items-center rounded-full transition hover:bg-[#efe4d6]" onClick={() => { setWishlistOpen(false); setCartOpen(true); }} aria-label={`Open bag with ${cartCount} items`}>
              <ShoppingBag size={18} />
              {cartCount > 0 && <span className="absolute right-0 top-0 grid h-[17px] min-w-[17px] place-items-center rounded-full bg-[#5a1721] px-1 text-[9px] text-white">{cartCount}</span>}
            </button>
          </div>
        </div>
        <div className="header-shortcuts border-b border-[#3e271f]/10 bg-[#fbf7f0] xl:hidden">
        <nav aria-label="Shop popular categories" className="mx-auto flex max-w-[1500px] items-center gap-7 overflow-x-auto px-5 py-3 sm:gap-9 sm:px-8 lg:px-12">
          <button onClick={() => navigateToFilter("All dresses")} className={`header-shortcut ${activeFilter === "All dresses" ? "header-shortcut-active" : ""}`}>Shop all</button>
          <button onClick={() => navigateToFilter("Punjabi Edit")} className={`header-shortcut ${activeFilter === "Punjabi Edit" ? "header-shortcut-active" : ""}`}>Punjabi edit</button>
          {dressCategories.filter((category) => category !== "Punjabi Suits").map((category) => (
            <button key={category} onClick={() => navigateToCategory(category)} className={`header-shortcut ${activeFilter === category ? "header-shortcut-active" : ""}`}>{category}</button>
          ))}
          <button onClick={() => navigateToSection("best-selling")} className={`header-shortcut ${activeNav === "best-selling" ? "header-shortcut-active" : ""}`}>Fayra edit</button>
        </nav>
        </div>
      </header>

      <section id="home-hero" className="hero-section relative overflow-hidden lg:min-h-[min(86vh,900px)]" aria-roledescription="carousel" aria-label="Fayra collection highlights">
        <div className="hero-media relative h-[min(62svh,620px)] min-h-[360px] w-full overflow-hidden bg-[#39211d] lg:absolute lg:inset-y-0 lg:right-0 lg:h-full lg:w-[65%]">
          <Image key={currentHero.image} src={currentHero.image} alt={currentHero.alt} fill priority sizes="(min-width: 1024px) 65vw, 100vw" className="hero-image object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#271815]/45 via-transparent to-transparent lg:bg-gradient-to-r lg:from-[#4a2d28]/72 lg:via-[#4a2d28]/20 lg:to-transparent" />
          <div className="hero-image-note absolute right-5 top-5 hidden border border-white/45 bg-[#f7f1e8]/90 px-5 py-4 text-[#321b18] backdrop-blur-sm sm:block lg:right-8 lg:top-8">
            <p className="text-[8px] font-semibold uppercase tracking-[.2em] text-[#8d5a4e]">The Fayra edit</p>
            <p className="mt-1 font-serif text-xl">A look for every moment</p>
            <p className="mt-1 text-[9px] uppercase tracking-[.13em] text-[#74645b]">55 curated styles · ₹1,199–₹4,999</p>
          </div>
          <div className="absolute bottom-5 left-5 flex gap-2 sm:bottom-8 sm:left-8">
            {heroSlides.map((slide, index) => (
              <button key={slide.eyebrow} onClick={() => setHeroIndex(index)} className={`hero-dot ${index === heroIndex ? "hero-dot-active" : ""}`} aria-label={`Show featured slide ${index + 1}`} aria-current={index === heroIndex ? "true" : undefined} />
            ))}
          </div>
          <div className="hero-controls absolute bottom-3 right-3 flex items-center gap-2 text-[#fffaf2] sm:bottom-5 sm:right-6">
            <span className="mr-1 text-[9px] tabular-nums tracking-[0.18em]">{String(heroIndex + 1).padStart(2, "0")} <span className="opacity-60">/ {String(heroSlides.length).padStart(2, "0")}</span></span>
            <button onClick={() => changeHero(-1)} className="hero-control" aria-label="Previous featured collection"><ChevronLeft size={17} /></button>
            <button onClick={() => changeHero(1)} className="hero-control" aria-label="Next featured collection"><ChevronRight size={17} /></button>
          </div>
        </div>
        <div className="relative z-10 mx-auto flex w-full max-w-[1500px] items-center px-5 py-10 sm:px-8 sm:py-12 lg:min-h-[min(86vh,900px)] lg:px-12 lg:py-14">
          <div key={heroIndex} className="hero-copy max-w-[570px] text-[#fffaf2]">
            <p className="mb-5 flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.28em]"><span className="h-px w-9 bg-current" /> {currentHero.eyebrow}</p>
            <h1 className="font-serif text-[clamp(3rem,12vw,4.8rem)] leading-[0.9] tracking-[-0.045em] lg:text-[clamp(4rem,6.6vw,7.2rem)]">{currentHero.title}</h1>
            <p className="mt-6 max-w-md text-sm leading-6 text-[#fffaf2]/82 sm:text-base sm:leading-7">{currentHero.description}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <button onClick={() => navigateToFilter(currentHero.filter)} className="hero-cta group inline-flex items-center gap-5 bg-[#fffaf2] px-6 py-4 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#321b18] transition hover:bg-white">{currentHero.primary} <ArrowRight size={15} className="transition group-hover:translate-x-1" /></button>
              <a href="#selection" className="hero-secondary inline-flex items-center border border-[#fffaf2]/55 px-6 py-4 text-[10px] font-semibold uppercase tracking-[0.22em] transition hover:bg-[#fffaf2]/10">{currentHero.secondary}</a>
            </div>
          </div>
        </div>
      </section>

      <div className="overflow-hidden border-b border-[#3e271f]/10 bg-[#efe4d6] py-3.5">
        <div className="marquee-track flex w-max items-center text-[9px] uppercase tracking-[0.22em] text-[#5f4a40]">
          {["A considered edit", "Indian occasionwear", "Complimentary shipping ₹5k+", "Personal styling", "New favourites, often", "A considered edit", "Indian occasionwear", "Complimentary shipping ₹5k+", "Personal styling", "New favourites, often"].map((item, index) => (
            <span key={`${item}-${index}`} className="flex items-center"><Sparkles className="mx-8" size={12} />{item}</span>
          ))}
        </div>
      </div>

      <div className="border-b border-[#3e271f]/10 bg-[#fbf7f0] px-5 py-5 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-[1300px] grid-cols-2 gap-5 text-center sm:grid-cols-4 sm:gap-8">
          {[["✳", "Curated Indian wear"], ["◇", "Considered selection"], ["↗", "Free shipping ₹5k+"], ["♡", "Personal styling"]].map(([icon, text]) => (
            <div key={text} className="flex items-center justify-center gap-2 text-[9px] uppercase tracking-[0.14em] text-[#665149] sm:text-[10px] sm:tracking-[0.16em]">
              <span className="font-serif text-base text-[#9b6b53]">{icon}</span>{text}
            </div>
          ))}
        </div>
      </div>

      <section id="private-styling" className="mx-auto max-w-[1500px] px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <div className="mb-10 flex flex-col justify-between gap-5 sm:mb-14 sm:flex-row sm:items-end">
          <div><p className="eyebrow">Explore the Fayra wardrobe</p><h2 className="section-title">A style for <em>every story.</em></h2></div>
          <p className="max-w-sm text-sm leading-6 text-[#74645b]">Browse eight distinct edits, from easy kurta sets to occasionwear, and find the silhouette that feels like you.</p>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {categoryCards.map((card, index) => (
            <a key={card.title} href="#shop" onClick={() => selectFilter(card.filter as (typeof collectionFilters)[number])} className="category-card category-card-compact reveal group relative overflow-hidden" style={{ transitionDelay: `${index * 70}ms` }}>
              <Image src={card.image} alt={card.title} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover transition duration-700 group-hover:scale-105" style={{ objectPosition: card.crop }} />
              <div className="absolute inset-0 bg-gradient-to-t from-[#23110e]/75 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6 text-[#fffaf2] sm:p-8">
                <div><p className="mb-2 text-[9px] uppercase tracking-[0.25em] opacity-80">{card.kicker}</p><h3 className="font-serif text-3xl">{card.title}</h3></div>
                <span className="grid h-10 w-10 place-items-center rounded-full border border-current transition group-hover:bg-[#fffaf2] group-hover:text-[#321b18]"><ArrowRight size={16} /></span>
              </div>
            </a>
          ))}
        </div>
      </section>

      <FeaturedProductSection
        id="best-selling"
        eyebrow="The collection favourites"
        title={<>Best <em className="font-normal">selling.</em></>}
        description="A considered edit of much-loved Punjabi suits and occasion sarees, chosen for their craft, colour, and enduring appeal."
        products={bestSellingProducts}
        onAdd={addToCart}
        onQuickView={setQuickViewProduct}
        wishlistNames={wishlistNames}
        onToggleWishlist={toggleWishlist}
      />

      <FeaturedProductSection
        id="recommended-for-you"
        eyebrow="A personal edit"
        title={<>For <em className="font-normal">you.</em></>}
        description={recentSearches.length
          ? "Selected around the styles and details you have recently explored. Your search history stays on this device."
          : "A premium edit to inspire your next look. Search the collection and this selection will adapt to your interests."}
        products={recommendationProducts}
        onAdd={addToCart}
        onQuickView={setQuickViewProduct}
        wishlistNames={wishlistNames}
        onToggleWishlist={toggleWishlist}
        recentSearches={recentSearches}
      />

      <section id="shop" className="border-y border-[#3e271f]/10 bg-[#fbf7f0] px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <div className="mx-auto max-w-[1500px]">
          <div className="mb-8 flex flex-col justify-between gap-5 lg:mb-10 lg:flex-row lg:items-end">
            <div><p className="eyebrow">{products.length} dress options · {dressDesignCount} designs · 8 categories</p><h2 className="section-title">Punjabi &amp; Indian<br /><em>occasionwear.</em></h2></div>
            <label className="flex items-center gap-3 self-start border-b border-[#3e271f]/20 pb-2 text-[9px] font-semibold uppercase tracking-[0.15em] text-[#7b6c64] lg:self-auto">
              Sort by
              <select value={sortOrder} onChange={(event) => setSortOrder(event.target.value)} className="max-w-[180px] cursor-pointer bg-transparent py-2 text-[10px] text-[#321b18] outline-none">
                <option value="featured">Featured</option>
                <option value="price-low">Price: low to high</option>
                <option value="price-high">Price: high to low</option>
                <option value="name">Name: A to Z</option>
              </select>
            </label>
          </div>
          <p className="mb-6 max-w-3xl text-sm leading-6 text-[#74645b]">Explore Punjabi Phulkari and Patiala suits alongside sarees, lehengas, shararas, anarkalis, kurta sets, and contemporary Indian silhouettes.</p>
          <div className="catalog-filters mb-9 flex gap-2 overflow-x-auto pb-2" role="group" aria-label="Filter by collection or dress category">
            {collectionFilters.map((filter) => {
              const filterCount = filter === "All dresses"
                ? products.length
                : filter === "Punjabi Edit"
                  ? products.filter((item) => item.collection === "Punjabi Edit").length
                  : products.filter((item) => item.category === filter).length;
              return (
                <button key={filter} onClick={() => selectFilter(filter)} aria-pressed={activeFilter === filter} className={`catalog-filter shrink-0 ${activeFilter === filter ? "catalog-filter-active" : ""}`}>
                  {filter}<span className="ml-1.5 opacity-65">{filterCount}</span>
                </button>
              );
            })}
          </div>
          {activeFilter === "All dresses" ? (
            <div className="space-y-16 sm:space-y-20">
              {dressCategories.map((category, categoryIndex) => {
                const categoryProducts = sortedProducts.filter((product) => product.category === category);
                return (
                  <section key={category} id={`category-${categorySlug(category)}`} className="category-section scroll-mt-28">
                    <div className="mb-7 flex flex-col gap-4 border-b border-[#3e271f]/10 pb-5 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
                      <div className="max-w-2xl">
                        <p className="mb-2 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#987464]">0{categoryIndex + 1} / {categoryProducts.length} styles</p>
                        <h3 className="font-serif text-3xl tracking-[-0.025em] text-[#321b18] sm:text-4xl">{category}</h3>
                        <p className="mt-2 text-xs leading-5 text-[#74645b] sm:text-sm">{categoryIntros[category]}</p>
                      </div>
                      <button onClick={() => selectFilter(category)} className="inline-flex shrink-0 items-center gap-3 self-start border-b border-[#5a1721]/40 pb-2 text-[9px] font-semibold uppercase tracking-[0.17em] text-[#5a1721] transition hover:gap-4 sm:self-auto">
                        Explore {category} <ArrowRight size={14} />
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-x-3 gap-y-9 sm:gap-x-5 lg:grid-cols-4 lg:gap-x-6">
                      {categoryProducts.slice(0, 4).map((product, index) => (
                        <div key={product.name} className="reveal" style={{ transitionDelay: `${index * 70}ms` }}>
                          <ProductCard product={product} onAdd={addToCart} onQuickView={setQuickViewProduct} liked={wishlistNames.includes(product.name)} onToggleWishlist={toggleWishlist} />
                        </div>
                      ))}
                    </div>
                  </section>
                );
              })}
            </div>
          ) : (
            <>
              <div className="mb-5 flex items-center justify-between border-b border-[#3e271f]/10 pb-3">
                <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#8c6d5f]">{activeFilter}</p>
                <p className="text-[9px] uppercase tracking-[0.14em] text-[#958177]">{filteredProducts.length} styles</p>
              </div>
              <div className="grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-5 lg:grid-cols-4 lg:gap-x-6">
                {visibleProducts.map((product, index) => <div key={product.name} className="reveal" style={{ transitionDelay: `${(index % 4) * 70}ms` }}><ProductCard product={product} onAdd={addToCart} onQuickView={setQuickViewProduct} liked={wishlistNames.includes(product.name)} onToggleWishlist={toggleWishlist} /></div>)}
              </div>
              <div className="mt-14 flex flex-col items-center gap-4">
                <p className="text-[10px] uppercase tracking-[0.17em] text-[#958177]">Showing {visibleProducts.length} of {filteredProducts.length} styles</p>
                {visibleProducts.length < filteredProducts.length && (
                  <button onClick={() => setVisibleCount((count) => count + 12)} className="inline-flex items-center gap-5 border-b border-[#321b18] pb-2 text-[10px] font-semibold uppercase tracking-[0.22em]">
                    View more styles <ArrowRight size={14} />
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </section>

      <section id="selection" className="selection-editorial relative grid overflow-hidden bg-[#241816] text-[#fff7ec] lg:min-h-[660px] lg:grid-cols-[1.05fr_.95fr]">
        <div className="selection-editorial-image relative min-h-[420px] overflow-hidden lg:min-h-[660px]">
          <Image src="/images/products/pexels-20788501.webp" alt="Ivory and red Punjabi suit with a printed dupatta" fill sizes="(min-width: 1024px) 53vw, 100vw" className="object-cover object-[center_35%]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#241816]/55 via-transparent to-transparent" />
          <span className="absolute bottom-7 left-7 text-[10px] font-medium uppercase tracking-[.22em] text-white/85">Fayra Boutique · The occasion edit</span>
        </div>
        <div className="selection-editorial-copy flex items-center px-7 py-16 sm:px-14 lg:px-[12%] lg:py-24">
          <div className="max-w-xl">
            <p className="eyebrow !text-[#d6b187]">A collection, carefully chosen</p>
            <h2 className="font-serif text-[clamp(3.2rem,6vw,6.4rem)] leading-[.94] tracking-[-.045em]">Pieces for<br /><em className="font-normal">your moments.</em></h2>
            <p className="mt-7 max-w-md text-sm leading-7 text-[#fff7ec]/72 sm:text-base">From everyday favourites to occasionwear that makes an entrance, discover Indian silhouettes selected for how you want to feel.</p>
            <div className="mt-9 grid max-w-lg grid-cols-3 border-y border-white/15 py-5">
              {[['01','Punjabi edit'],['02','Saree edit'],['03','Occasionwear']].map(([num, label]) => <div key={num} className="border-r border-white/15 px-3 first:pl-0 last:border-0 sm:px-5"><p className="font-serif text-2xl">{num}</p><p className="mt-1 text-[9px] uppercase tracking-[.15em] text-[#dfc2a4]">{label}</p></div>)}
            </div>
            <a href="#shop" className="mt-9 inline-flex items-center gap-4 bg-[#fff7ec] px-6 py-4 text-[10px] font-semibold uppercase tracking-[.2em] text-[#321b18] transition hover:bg-white">Shop the collection <ArrowRight size={15} /></a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1500px] px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <div className="grid items-center gap-14 lg:grid-cols-[.85fr_1.15fr] lg:gap-20">
          <div>
            <p className="eyebrow">Fayra private styling</p>
            <h2 className="section-title">Your occasion,<br /><em>beautifully considered.</em></h2>
            <p className="mt-7 max-w-md text-sm leading-7 text-[#74645b]">Explore a guided styling experience designed around your celebration, preferred silhouette, and the details that make a look feel personal.</p>
            <a href="#consultation" className="mt-8 inline-flex items-center gap-5 bg-[#321b18] px-6 py-4 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#fffaf2]">Start your consultation <ArrowRight size={14} /></a>
          </div>
          <div className="grid gap-px overflow-hidden border border-[#3e271f]/10 bg-[#3e271f]/10 sm:grid-cols-2">
            {[['01','The wedding guest','Distinctive, effortless pieces for every ceremony.'],['02','The festive host','Ease and polish for a celebration at home.'],['03','The intimate bride','Modern heirlooms with room for personal detail.'],['04','The thoughtful gift','A considered edit for someone memorable.']].map(([num,title,text]) => (
              <a href="#consultation" key={title} className="group bg-[#f7f1e8] p-7 transition hover:bg-[#efe3d6] sm:p-9">
                <div className="mb-12 flex items-center justify-between text-[10px] text-[#8f6e60]"><span>{num}</span><ArrowRight size={14} className="transition group-hover:translate-x-1" /></div>
                <h3 className="font-serif text-2xl">{title}</h3><p className="mt-3 max-w-xs text-xs leading-5 text-[#74645b]">{text}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="consultation" className="mx-5 mb-20 overflow-hidden bg-[#d9b593] sm:mx-8 sm:mb-28 lg:mx-12">
        <div className="mx-auto grid max-w-[1400px] lg:grid-cols-[1.2fr_.8fr]">
          <div className="px-6 py-16 sm:px-12 sm:py-20 lg:px-16">
            <p className="eyebrow">The Fayra letter</p>
            <h2 className="font-serif text-[clamp(2.8rem,5vw,5rem)] leading-[.95] tracking-[-0.035em]">A slower way to<br /><em className="font-normal">discover what’s new.</em></h2>
            <p className="mt-6 max-w-lg text-sm leading-6 text-[#4d352d]/75">Seasonal stories, textile notes, private previews, and thoughtful styling—sent occasionally.</p>
          </div>
          <form onSubmit={handleSubscribe} className="flex items-center border-t border-[#4d352d]/20 px-6 py-10 sm:px-12 lg:border-l lg:border-t-0">
            {subscribed ? (
              <div className="flex items-center gap-3 font-serif text-2xl"><span className="grid h-9 w-9 place-items-center rounded-full bg-[#4b1922] text-white"><Check size={16} /></span>You’re on the list.</div>
            ) : (
              <div className="w-full"><label htmlFor="email" className="mb-4 block text-[9px] font-semibold uppercase tracking-[0.22em]">Your email address</label><div className="flex border-b border-[#4d352d]"><input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="min-w-0 flex-1 bg-transparent py-4 text-sm outline-none placeholder:text-[#4d352d]/45" /><button className="px-3" aria-label="Subscribe"><ArrowRight size={18} /></button></div><p className="mt-3 text-[10px] text-[#4d352d]/60">By subscribing, you agree to receive Fayra updates.</p></div>
            )}
          </form>
        </div>
      </section>

      <footer className="site-footer relative overflow-hidden px-5 pb-6 text-[#f8efe3] sm:px-8 lg:px-12">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto max-w-[1500px]">
          <section className="footer-feature flex flex-col gap-8 border-b border-white/10 py-14 sm:py-16 lg:flex-row lg:items-end lg:justify-between lg:gap-12 lg:py-20">
            <div className="max-w-3xl">
              <p className="footer-eyebrow"><span aria-hidden="true" /> The Fayra edit · Chosen for your story</p>
              <h2 className="mt-6 max-w-3xl font-serif text-[clamp(3.2rem,8vw,7rem)] leading-[.82] tracking-[-.045em]">Find your <em>expression.</em></h2>
              <p className="mt-6 max-w-xl text-sm leading-7 text-[#f8efe3]/60 sm:text-base">A thoughtful selection of Indian occasionwear, everyday favourites, and pieces that feel like you.</p>
            </div>
            <a href="#shop" className="footer-feature-link group inline-flex w-fit items-center gap-5 border border-[#d8bd99]/40 px-5 py-4 text-[9px] font-semibold uppercase tracking-[.2em] text-[#f8efe3] transition hover:border-[#e8c895] hover:bg-white/[.04]">
              Explore the collection <span className="grid h-8 w-8 place-items-center rounded-full border border-[#d8bd99]/35 text-[#e8c895] transition group-hover:translate-x-1"><ArrowRight size={15} /></span>
            </a>
          </section>

          <div className="grid gap-12 py-12 sm:grid-cols-2 lg:grid-cols-[1.15fr_.7fr_1.1fr_.8fr] lg:gap-10 lg:py-14">
            <div className="footer-brand-lockup sm:col-span-2 lg:col-span-1">
              <Logo />
              <p className="mt-6 max-w-xs text-xs leading-6 text-[#f8efe3]/55">A considered wardrobe of festive sets, sarees, and everyday Indian style, selected for the moments you make your own.</p>
              <a href="#selection" className="footer-brand-link mt-7 inline-flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[.16em] text-[#e2c49a] transition hover:text-white">Meet the selection <ArrowRight size={14} /></a>
            </div>

            <nav aria-label="Footer explore links">
              <p className="footer-heading">Explore</p>
              <div className="space-y-3.5">
                {[
                  { label: "Shop all styles", href: "#shop" },
                  { label: "Sarees", href: "#shop" },
                  { label: "Kurta sets", href: "#shop" },
                  { label: "Fayra edit", href: "#best-selling" },
                ].map(({ label, href }) => <a href={href} key={label} onClick={() => { if (label === "Sarees") selectFilter("Sarees"); if (label === "Kurta sets") selectFilter("Kurta Sets"); }} className="footer-nav-link group flex items-center justify-between gap-3 text-xs text-[#f8efe3]/60 transition hover:text-white"><span>{label}</span><ArrowRight size={13} className="opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100" /></a>)}
              </div>
            </nav>

            <div>
              <p className="footer-heading">Contact the boutique</p>
              <div className="space-y-2.5">
                <a href={`https://wa.me/${sellerWhatsAppNumber}`} target="_blank" rel="noreferrer" className="footer-contact-card group flex items-center gap-3 p-3 transition">
                  <span className="footer-contact-icon text-[#a8c7ad]"><MessageCircle size={16} /></span>
                  <span className="min-w-0 flex-1"><span className="block text-[9px] font-semibold uppercase tracking-[.15em] text-[#f8efe3]">WhatsApp</span><span className="mt-1 block text-[10px] text-[#f8efe3]/45">Chat with the boutique</span></span>
                  <ArrowRight size={14} className="shrink-0 text-[#c7a879] transition group-hover:translate-x-1" />
                </a>
                <a href={sellerEmailUrl} className="footer-contact-card group flex items-center gap-3 p-3 transition">
                  <span className="footer-contact-icon text-[#d8b7dc]"><Mail size={16} /></span>
                  <span className="min-w-0 flex-1"><span className="block text-[9px] font-semibold uppercase tracking-[.15em] text-[#f8efe3]">Email</span><span className="mt-1 block break-all text-[10px] text-[#f8efe3]/45">{sellerEmail}</span></span>
                  <ArrowRight size={14} className="shrink-0 text-[#c7a879] transition group-hover:translate-x-1" />
                </a>
                <a href={`tel:+${sellerWhatsAppNumber}`} className="footer-contact-card group flex items-center gap-3 p-3 transition">
                  <span className="footer-contact-icon text-[#e4bd8c]"><Phone size={16} /></span>
                  <span className="min-w-0 flex-1"><span className="block text-[9px] font-semibold uppercase tracking-[.15em] text-[#f8efe3]">Call</span><span className="mt-1 block text-[10px] text-[#f8efe3]/45">{sellerPhoneDisplay}</span></span>
                  <ArrowRight size={14} className="shrink-0 text-[#c7a879] transition group-hover:translate-x-1" />
                </a>
              </div>
            </div>

            <div className="footer-guidance sm:col-span-2 lg:col-span-1 lg:border-l lg:border-white/10 lg:pl-6">
              <p className="footer-heading">A little guidance</p>
              <h3 className="font-serif text-2xl leading-tight text-[#f8efe3]">For the moments that matter.</h3>
              <p className="mt-3 text-xs leading-6 text-[#f8efe3]/50">Explore personal styling or keep up with new pieces and seasonal edits.</p>
              <div className="mt-5 space-y-3">
                <a href="#private-styling" className="footer-guidance-link">Personal styling <ArrowRight size={13} /></a>
                <a href="#consultation" className="footer-guidance-link">The Fayra letter <ArrowRight size={13} /></a>
                <a href="#selection" className="footer-guidance-link">Our selection <ArrowRight size={13} /></a>
              </div>
            </div>
          </div>

          <div className="footer-bottom flex flex-col justify-between gap-4 border-t border-white/10 pt-6 text-[9px] uppercase tracking-[.15em] text-[#f8efe3]/40 md:flex-row md:items-center">
            <p>© 2026 Fayra Boutique</p>
            <p className="footer-bottom-note">Indian occasionwear · Personal styling · Worldwide shipping</p>
            <a href="#top" className="inline-flex items-center gap-2 text-[#e2c49a] transition hover:text-white">Back to top <ChevronDown size={13} className="rotate-180" /></a>
          </div>
        </div>
      </footer>

      {menuOpen && (
        <div className="mobile-menu fixed inset-0 z-50 flex flex-col bg-[#f7f1e8] p-5 sm:p-8">
          <div className="flex shrink-0 items-center justify-between border-b border-[#3e271f]/10 pb-5">
            <Logo />
            <button onClick={() => setMenuOpen(false)} className="grid h-10 w-10 place-items-center rounded-full border border-[#3e271f]/15" aria-label="Close menu"><X size={21} /></button>
          </div>
          <div className="mt-7 flex-1 overflow-y-auto pb-16">
            <p className="eyebrow !mb-3">Explore the collections</p>
            <nav aria-label="Mobile category navigation" className="space-y-1">
              <button onClick={() => navigateToFilter("All dresses")} className={`mobile-nav-link ${activeNav === "shop" && activeFilter === "All dresses" ? "mobile-nav-link-active" : ""}`} aria-current={activeNav === "shop" && activeFilter === "All dresses" ? "location" : undefined}>Shop all dresses<ArrowRight size={17} /></button>
              <button onClick={() => navigateToFilter("Punjabi Edit")} className={`mobile-nav-link ${activeNav === "shop" && activeFilter === "Punjabi Edit" ? "mobile-nav-link-active" : ""}`} aria-current={activeNav === "shop" && activeFilter === "Punjabi Edit" ? "location" : undefined}>Punjabi edit<ArrowRight size={17} /></button>
              <button onClick={() => navigateToSection("best-selling")} className={`mobile-nav-link ${activeNav === "best-selling" ? "mobile-nav-link-active" : ""}`} aria-current={activeNav === "best-selling" ? "location" : undefined}>Best sellers<ArrowRight size={17} /></button>
              <button onClick={() => navigateToSection("recommended-for-you")} className={`mobile-nav-link ${activeNav === "recommended-for-you" ? "mobile-nav-link-active" : ""}`} aria-current={activeNav === "recommended-for-you" ? "location" : undefined}>For you<ArrowRight size={17} /></button>
              {dressCategories.map((category, index) => (
                <button key={category} onClick={() => navigateToCategory(category)} className={`mobile-nav-link ${activeNav === "shop" && activeFilter === category ? "mobile-nav-link-active" : ""}`} aria-current={activeNav === "shop" && activeFilter === category ? "location" : undefined}>
                  <span><small className="mr-3 font-sans text-[9px] text-[#9b7b6d]">0{index + 1}</small>{category}</span><ArrowRight size={17} />
                </button>
              ))}
              <button onClick={() => navigateToSection("selection")} className={`mobile-nav-link ${activeNav === "selection" ? "mobile-nav-link-active" : ""}`} aria-current={activeNav === "selection" ? "location" : undefined}>Our selection<ArrowRight size={17} /></button>
            </nav>
          </div>
          <p className="shrink-0 border-t border-[#3e271f]/10 pt-4 text-[9px] uppercase tracking-[0.2em] text-[#8a7167]">Contemporary Indian occasionwear</p>
        </div>
      )}

      {searchOpen && (
        <div className="search-overlay fixed inset-0 z-50 overflow-y-auto bg-[#f7f1e8] text-[#271815]" role="dialog" aria-modal="true" aria-labelledby="search-title">
          <header className="search-topbar sticky top-0 z-10 border-b border-[#3e271f]/10 bg-[#f7f1e8]/95 px-5 backdrop-blur-xl sm:px-10">
            <div className="mx-auto flex h-[76px] max-w-[1480px] items-center justify-between">
              <Logo />
              <button className="search-close inline-flex items-center gap-2 rounded-full border border-[#3e271f]/15 px-4 py-2.5 text-[9px] font-semibold uppercase tracking-[.16em] transition hover:border-[#5a1721]/35 hover:bg-white" onClick={() => setSearchOpen(false)} aria-label="Close search"><span className="hidden sm:inline">Close</span><X size={17} /></button>
            </div>
          </header>
          <div className="mx-auto max-w-[1480px] px-5 pb-14 pt-9 sm:px-10 sm:pt-14">
            <div className="mb-8 flex flex-col justify-between gap-4 md:mb-10 md:flex-row md:items-end">
              <div><p className="eyebrow !mb-3">The Fayra collection</p><h2 id="search-title" className="font-serif text-[clamp(2.7rem,6vw,5rem)] leading-[.92] tracking-[-.04em]">Find your next <em>favourite.</em></h2></div>
              <p className="max-w-sm text-xs leading-5 text-[#74645b]">Search by colour, silhouette, occasion, or fabric. Refine by category and price as you explore.</p>
            </div>

            <div className="search-input-shell flex items-center gap-3 border border-[#3e271f]/12 bg-[#fffdf9] px-4 shadow-[0_12px_36px_rgba(47,26,18,.06)] sm:px-6">
              <Search size={20} className="shrink-0 text-[#8b6655]" />
              <input autoFocus value={searchQuery} onChange={(event) => { setSearchQuery(event.target.value); setSearchVisibleCount(6); }} onKeyDown={(event) => { if (event.key === "Escape") setSearchOpen(false); }} placeholder="Try ‘embroidered’, ‘saree’ or ‘wedding guest’" aria-label="Search by name, colour, fabric, or occasion" className="min-w-0 flex-1 bg-transparent py-4 font-serif text-xl outline-none placeholder:font-sans placeholder:text-xs placeholder:tracking-normal placeholder:text-[#9b8b81] sm:py-5 sm:text-2xl sm:placeholder:text-sm" />
              {searchQuery && <button onClick={() => { setSearchQuery(""); setSearchVisibleCount(6); }} className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-[#806b61] transition hover:bg-[#f0e7dd]" aria-label="Clear search"><X size={16} /></button>}
            </div>

            <div className="search-refiners mt-6 border-b border-[#3e271f]/10 pb-6">
              <div className="mb-4 flex items-center justify-between gap-4">
                <p className="text-[9px] font-semibold uppercase tracking-[.18em] text-[#8c6d5f]">Shop by category</p>
                <label className="flex shrink-0 items-center gap-2 text-[9px] font-semibold uppercase tracking-[.12em] text-[#8c6d5f]">Sort
                  <select value={searchSort} onChange={(event) => setSearchSort(event.target.value)} className="search-sort rounded-full border border-[#3e271f]/12 bg-[#fffdf9] px-3 py-2 text-[10px] font-medium normal-case tracking-normal text-[#3d2c26] outline-none focus:border-[#8d5a4e]">
                    <option value="relevance">Recommended</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option><option value="name">Name: A to Z</option>
                  </select>
                </label>
              </div>
              <div className="search-category-chips flex gap-2 overflow-x-auto pb-2" role="group" aria-label="Filter search by category">
                {(["All pieces", ...dressCategories] as const).map((category) => (
                  <button key={category} onClick={() => { setSearchCategory(category); setSearchVisibleCount(6); }} aria-pressed={searchCategory === category} className={`search-chip shrink-0 ${searchCategory === category ? "search-chip-active" : ""}`}>{category}</button>
                ))}
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span className="mr-1 text-[9px] font-semibold uppercase tracking-[.16em] text-[#8c6d5f]">Price</span>
                {[["all", "Any price"], ["2500", "Under ₹2,500"], ["3500", "Under ₹3,500"], ["5000", "Under ₹5,000"]].map(([value, label]) => (
                  <button key={value} onClick={() => { setSearchPriceCap(value); setSearchVisibleCount(6); }} aria-pressed={searchPriceCap === value} className={`search-chip ${searchPriceCap === value ? "search-chip-active" : ""}`}>{label}</button>
                ))}
              </div>
            </div>

            {hasSearchFilters ? (
              <div className="mt-7">
                <div className="mb-4 flex items-end justify-between gap-4">
                  <div><p className="eyebrow !mb-1">Your edit</p><p className="font-serif text-2xl">{searchResults.length} {searchResults.length === 1 ? "piece" : "pieces"} found</p></div>
                  <button onClick={() => { setSearchQuery(""); setSearchCategory("All pieces"); setSearchPriceCap("all"); setSearchSort("relevance"); setSearchVisibleCount(6); }} className="text-[9px] font-semibold uppercase tracking-[.16em] text-[#8d5a4e] transition hover:text-[#5a1721]">Clear filters</button>
                </div>
                {searchResults.length ? (
                  <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                    {searchResults.slice(0, searchVisibleCount).map((product) => (
                      <article key={product.name} className="search-result-card flex min-w-0 gap-4 border border-[#3e271f]/10 bg-[#fffdf9] p-3 transition hover:border-[#8d5a4e]/45 hover:shadow-[0_12px_30px_rgba(47,26,18,.08)] sm:p-4">
                        <button onClick={() => { setQuickViewProduct(product); setSearchOpen(false); }} className="search-result-image shrink-0 overflow-hidden bg-[#eee5d9]" aria-label={`View ${product.name} details`}><Image src={product.image} alt={product.name} width={160} height={200} sizes="96px" className="h-full w-full object-contain p-1 transition duration-300" /></button>
                        <div className="flex min-w-0 flex-1 flex-col justify-between py-1">
                          <div><p className="text-[8px] font-semibold uppercase tracking-[.16em] text-[#967566]">{product.category}</p><h3 className="mt-1 line-clamp-2 font-serif text-lg leading-tight">{product.name}</h3><p className="mt-1 text-[10px] text-[#7b6c64]">{product.tone}</p></div>
                          <div className="mt-3 flex items-center justify-between gap-2"><span className="text-sm font-medium text-[#5a1721]">{product.price}</span><button onClick={() => { addToCart(product); setSearchOpen(false); }} className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[#4b1922] px-3 py-2 text-[8px] font-semibold uppercase tracking-[.13em] text-white transition hover:bg-[#6a2431]"><Plus size={12} /> Add</button></div>
                        </div>
                      </article>
                    ))}
                  </div>
                ) : (
                  <div className="search-empty-state border border-dashed border-[#3e271f]/20 bg-[#fbf7f0] px-5 py-10 text-center sm:py-14">
                    <Search className="mx-auto mb-3 text-[#9a7c6e]" size={23} strokeWidth={1.4} /><h3 className="font-serif text-2xl">No exact matches yet.</h3><p className="mt-2 text-xs text-[#74645b]">Try a broader term or clear one of your filters.</p>
                    <button onClick={() => { setSearchQuery(""); setSearchCategory("All pieces"); setSearchPriceCap("all"); }} className="mt-5 border-b border-[#5a1721]/35 pb-1 text-[9px] font-semibold uppercase tracking-[.16em] text-[#5a1721]">Reset search</button>
                  </div>
                )}
                {searchResults.length > searchVisibleCount && <button onClick={() => setSearchVisibleCount((count) => count + 6)} className="mx-auto mt-7 flex items-center gap-3 border-b border-[#321b18]/30 pb-2 text-[9px] font-semibold uppercase tracking-[.17em] text-[#5a1721]">Show more pieces <ArrowRight size={13} /></button>}
              </div>
            ) : (
              <div className="mt-8 grid gap-8 md:grid-cols-[1fr_1fr]">
                <div><div className="mb-4 flex items-center justify-between"><p className="eyebrow !mb-0">Explore a category</p></div><div className="flex flex-wrap gap-2">{dressCategories.map((category) => <button key={category} onClick={() => setSearchCategory(category)} className="search-chip">{category}<ArrowRight size={11} className="ml-1.5" /></button>)}</div></div>
                <div>{recentSearches.length > 0 ? <><div className="mb-4 flex items-center justify-between"><p className="eyebrow !mb-0">Recently explored</p><button onClick={() => setRecentSearches([])} className="text-[8px] font-semibold uppercase tracking-[.13em] text-[#8d5a4e] hover:text-[#5a1721]">Clear</button></div><div className="flex flex-wrap gap-2">{recentSearches.slice(0, 6).map((query) => <button key={query} onClick={() => { setSearchQuery(query); setSearchVisibleCount(6); }} className="search-chip"><Search size={11} className="mr-1.5" />{query}</button>)}</div></> : <p className="border-l border-[#b89a83] pl-4 text-xs leading-5 text-[#74645b]">Your recent searches will appear here on this device.</p>}</div>
              </div>
            )}
          </div>
        </div>
      )}

      {quickViewProduct && <ProductQuickView product={quickViewProduct} onClose={() => setQuickViewProduct(null)} onAdd={(product) => { setQuickViewProduct(null); addToCart(product); }} />}

      <div className={`wishlist-overlay fixed inset-0 z-[60] transition ${wishlistOpen ? "pointer-events-auto" : "pointer-events-none"}`} aria-hidden={!wishlistOpen}>
        <button className={`absolute inset-0 bg-[#1e100d]/55 transition-opacity ${wishlistOpen ? "opacity-100" : "opacity-0"}`} onClick={() => setWishlistOpen(false)} aria-label="Close wishlist" tabIndex={wishlistOpen ? 0 : -1} />
        <aside id="wishlist-dialog" role="dialog" aria-modal={wishlistOpen} aria-labelledby="wishlist-title" aria-hidden={!wishlistOpen} inert={!wishlistOpen} className={`wishlist-drawer absolute right-0 top-0 flex h-full w-full max-w-lg flex-col bg-[#fbf7f0] shadow-2xl transition-transform duration-500 ${wishlistOpen ? "translate-x-0" : "translate-x-full"}`}>
          <div className="wishlist-drawer-header flex items-center justify-between border-b border-[#3e271f]/10 px-5 py-5 sm:px-8 sm:py-6">
            <div><p className="eyebrow !mb-1">Your personal edit</p><h2 id="wishlist-title" className="font-serif text-3xl">Saved styles <span className="text-lg text-[#91776b]">({wishlistProducts.length})</span></h2></div>
            <button onClick={() => setWishlistOpen(false)} className="grid h-10 w-10 place-items-center rounded-full border border-[#3e271f]/12 transition hover:bg-white" aria-label="Close wishlist"><X size={19} /></button>
          </div>

          <div className="wishlist-scroll flex-1 overflow-auto px-5 sm:px-8">
            {wishlistProducts.length === 0 ? (
              <div className="flex min-h-full flex-col items-center justify-center py-12 text-center">
                <div className="wishlist-empty-mark mb-6 grid h-20 w-20 place-items-center rounded-full"><Heart size={28} strokeWidth={1.25} /></div>
                <p className="eyebrow !mb-2">A collection of your own</p>
                <h3 className="font-serif text-3xl">Keep the pieces you love.</h3>
                <p className="mt-3 max-w-xs text-xs leading-6 text-[#7b6c64]">Tap the heart on any style to save it here. Your selection stays on this device.</p>
                <button onClick={() => { setWishlistOpen(false); navigateToFilter("All dresses"); }} className="mt-7 inline-flex items-center gap-3 bg-[#321b18] px-6 py-4 text-[9px] font-semibold uppercase tracking-[.18em] text-white transition hover:bg-[#5a1721]">Explore the collection <ArrowRight size={14} /></button>
              </div>
            ) : (
              <div className="py-6">
                <div className="mb-4 flex items-center justify-between"><p className="text-[9px] font-semibold uppercase tracking-[.17em] text-[#8c6d5f]">Saved for another day</p><span className="text-[9px] uppercase tracking-[.12em] text-[#a18b7f]">{wishlistProducts.length} {wishlistProducts.length === 1 ? "style" : "styles"}</span></div>
                <div className="space-y-3">
                  {wishlistProducts.map((product) => (
                    <article key={product.name} className="wishlist-item flex gap-3 border border-[#3e271f]/10 bg-[#fffdf9] p-3 sm:gap-4 sm:p-4">
                      <button onClick={() => { setWishlistOpen(false); setQuickViewProduct(product); }} className="wishlist-item-image h-[112px] w-[82px] shrink-0 overflow-hidden bg-[#eee5d9] sm:h-[132px] sm:w-[96px]" style={{ backgroundImage: `url("${product.image}")` }} aria-label={`View ${product.name} details`} />
                      <div className="flex min-w-0 flex-1 flex-col justify-between py-0.5">
                        <div className="flex items-start justify-between gap-2"><div className="min-w-0"><p className="text-[8px] font-semibold uppercase tracking-[.15em] text-[#967566]">{product.category}</p><h3 className="mt-1 line-clamp-2 font-serif text-lg leading-tight">{product.name}</h3><p className="mt-1 text-[10px] text-[#877269]">{product.fabric} · As pictured</p></div><button onClick={() => toggleWishlist(product)} className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-[#742c39] transition hover:bg-[#f3e9e4]" aria-label={`Remove ${product.name} from wishlist`}><Heart size={15} fill="currentColor" /></button></div>
                        <div className="mt-3 flex items-center justify-between gap-2"><span className="text-sm font-medium text-[#321b18]">{product.price}</span><button onClick={() => { setWishlistOpen(false); addToCart(product); }} className="inline-flex items-center gap-2 rounded-full bg-[#321b18] px-3 py-2.5 text-[8px] font-semibold uppercase tracking-[.14em] text-white transition hover:bg-[#5a1721] sm:px-4"><ShoppingBag size={13} /> Add to bag</button></div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )}
          </div>

          {wishlistProducts.length > 0 && <div className="border-t border-[#3e271f]/10 bg-[#fbf7f0] px-5 py-4 sm:px-8 sm:py-5"><button onClick={() => { setWishlistOpen(false); navigateToFilter("All dresses"); }} className="flex w-full items-center justify-center gap-3 border border-[#321b18]/20 px-4 py-4 text-[9px] font-semibold uppercase tracking-[.16em] text-[#321b18] transition hover:border-[#321b18] hover:bg-white">Continue exploring <ArrowRight size={14} /></button></div>}
        </aside>
      </div>

      <div className={`cart-overlay fixed inset-0 z-50 transition ${cartOpen ? "pointer-events-auto" : "pointer-events-none"}`} aria-hidden={!cartOpen}>
        <button className={`cart-backdrop absolute inset-0 bg-[#1e100d]/55 transition-opacity ${cartOpen ? "opacity-100" : "opacity-0"}`} onClick={() => setCartOpen(false)} aria-label="Close bag" tabIndex={cartOpen ? 0 : -1} />
        <aside role="dialog" aria-modal={cartOpen} aria-labelledby="cart-title" className={`cart-drawer absolute right-0 top-0 flex h-full w-full max-w-lg flex-col bg-[#fbf7f0] shadow-2xl transition-transform duration-500 ${cartOpen ? "translate-x-0" : "translate-x-full"}`}>
          <div className="cart-header flex items-center justify-between border-b border-[#3e271f]/10 px-5 py-5 sm:px-8 sm:py-6">
            <div><p className="eyebrow !mb-1">Your Fayra edit</p><h2 id="cart-title" className="font-serif text-3xl">Shopping bag <span className="text-lg text-[#91776b]">({cartCount})</span></h2></div>
            <button onClick={() => setCartOpen(false)} className="grid h-10 w-10 place-items-center rounded-full border border-[#3e271f]/12 transition hover:bg-white" aria-label="Close bag"><X size={19} /></button>
          </div>

          <div className="cart-scroll flex-1 overflow-auto px-5 sm:px-8">
            {cart.length === 0 ? (
              <div className="flex min-h-full flex-col justify-center py-8">
                <div className="cart-empty-mark mx-auto mb-5 grid h-16 w-16 place-items-center rounded-full border border-[#a17e69]/25 bg-white text-[#8a6250]"><ShoppingBag size={25} strokeWidth={1.3} /></div>
                <div className="text-center"><p className="eyebrow !mb-2">A little space for something lovely</p><h3 className="font-serif text-3xl">Your bag is waiting.</h3><p className="mx-auto mt-2 max-w-xs text-xs leading-5 text-[#7b6c64]">Explore the collection and save a piece for your next occasion.</p></div>
                <div className="mt-8">
                  <div className="mb-3 flex items-center justify-between"><p className="text-[9px] font-semibold uppercase tracking-[.16em] text-[#8c6d5f]">Fayra favourites</p><span className="text-[9px] uppercase tracking-[.12em] text-[#a18b7f]">Under ₹5,000</span></div>
                  <div className="space-y-3">
                    {bestSellingProducts.slice(0, 2).map((product) => <div key={product.name} className="cart-suggestion flex items-center gap-3 border border-[#3e271f]/10 bg-[#fffdf9] p-3"><Image src={product.image} alt={product.name} width={124} height={156} sizes="62px" className="h-[78px] w-[62px] bg-[#eee5d9] object-contain" /><div className="min-w-0 flex-1"><p className="line-clamp-2 font-serif text-base leading-tight">{product.name}</p><p className="mt-1 text-xs text-[#5a1721]">{product.price}</p></div><button onClick={() => addToCart(product)} className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[#3e271f]/15 transition hover:border-[#5a1721] hover:bg-[#5a1721] hover:text-white" aria-label={`Add ${product.name} to bag`}><Plus size={14} /></button></div>)}
                  </div>
                </div>
                <button onClick={() => { setCartOpen(false); document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" }); }} className="mt-7 flex w-full items-center justify-center gap-3 bg-[#321b18] px-5 py-4 text-[9px] font-semibold uppercase tracking-[.18em] text-white transition hover:bg-[#5a1721]">Explore the collection <ArrowRight size={14} /></button>
              </div>
            ) : (
              <>
                <div className="cart-shipping-progress mt-5 border border-[#3e271f]/10 bg-[#fffdf9] p-4 sm:p-5" aria-live="polite">
                  <div className="flex items-start justify-between gap-3"><div><p className="text-[9px] font-semibold uppercase tracking-[.17em] text-[#8c6d5f]">Complimentary shipping</p><p className="mt-1 font-serif text-lg">{shippingAmountRemaining === 0 ? "Unlocked for your order" : `Add ${formatRupees(shippingAmountRemaining)} more to unlock`}</p></div><span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#f3eae0] text-[#8c5b49]"><ArrowRight size={15} /></span></div>
                  <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[#eee5d9]"><span className="block h-full rounded-full bg-[#8c5b49] transition-[width] duration-500" style={{ width: `${Math.min(100, cartTotal / complimentaryShippingMinimum * 100)}%` }} /></div>
                </div>
                <div className="space-y-3 py-5">
                  {cart.map(({ product, quantity }) => (
                    <article key={product.name} className="cart-item-card flex gap-3 border border-[#3e271f]/10 bg-[#fffdf9] p-3 sm:gap-4 sm:p-4">
                      <Image src={product.image} alt={product.name} width={164} height={224} sizes="82px" className="h-28 w-[82px] shrink-0 bg-[#eee5d9] object-contain p-1" />
                      <div className="flex min-w-0 flex-1 flex-col justify-between py-0.5">
                        <div className="flex items-start justify-between gap-2"><div className="min-w-0"><p className="text-[8px] font-semibold uppercase tracking-[.15em] text-[#967566]">{product.category}</p><h3 className="mt-1 line-clamp-2 font-serif text-lg leading-tight">{product.name}</h3><p className="mt-1 text-[10px] text-[#877269]">{product.tone} · As pictured</p></div><button onClick={() => updateQuantity(product.name, -quantity)} className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-[#937b6e] transition hover:bg-[#f2e8dd] hover:text-[#5a1721]" aria-label={`Remove ${product.name} from bag`}><X size={15} /></button></div>
                        <div className="mt-3 flex items-end justify-between gap-3"><div className="cart-quantity-control flex h-9 items-center border border-[#3e271f]/15 bg-[#fbf7f0]"><button onClick={() => updateQuantity(product.name, -1)} className="grid h-full w-9 place-items-center transition hover:bg-white" aria-label={`Decrease ${product.name} quantity`}><Minus size={12} /></button><span className="w-7 text-center text-xs tabular-nums">{quantity}</span><button onClick={() => updateQuantity(product.name, 1)} className="grid h-full w-9 place-items-center transition hover:bg-white" aria-label={`Increase ${product.name} quantity`}><Plus size={12} /></button></div><div className="text-right"><p className="text-[8px] uppercase tracking-[.12em] text-[#9a877d]">Line total</p><span className="text-sm font-medium text-[#321b18]">{formatRupees(product.priceValue * quantity)}</span></div></div>
                      </div>
                    </article>
                  ))}
                </div>
              </>
            )}
          </div>

          {cart.length > 0 && (
            <div className="cart-checkout border-t border-[#3e271f]/10 bg-[#fbf7f0] px-5 pb-5 pt-4 sm:px-8 sm:pb-7">
              {orderReference && (
                <div className="mb-4 border border-[#28664c]/20 bg-[#edf5ee] p-4" role="status" aria-live="polite">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#28664c]">Order ready to confirm</p>
                  <p className="mt-1 font-serif text-lg text-[#271815]">Reference {orderReference}</p>
                  <p className="mt-2 text-xs leading-5 text-[#52675b]">Your order message is prepared in WhatsApp. Tap Send there to share it with Fayra; the seller will connect with you soon after receiving it.</p>
                </div>
              )}
              <div className="mb-2 flex justify-between text-xs text-[#74645b]"><span>Subtotal · {cartCount} {cartCount === 1 ? "piece" : "pieces"}</span><span>{formatRupees(cartTotal)}</span></div>
              <div className="mb-4 flex justify-between border-b border-[#3e271f]/10 pb-4 font-serif text-xl"><span>Order total</span><span>{formatRupees(cartTotal)}</span></div>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" onClick={() => setOrderReference(activeOrderReference)} className="flex w-full items-center justify-center gap-3 rounded-sm bg-[#176b4b] px-4 py-4 text-[10px] font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-[#12583e]"><MessageCircle size={17} /> {orderReference ? "Open WhatsApp order" : "Confirm order on WhatsApp"}</a>
              <p className="mt-3 text-center text-[9px] leading-4 text-[#8a7167]">WhatsApp opens with your order details ready. Your order is confirmed when you tap Send there.</p>
            </div>
          )}
        </aside>
      </div>
    </main>
  );
}
