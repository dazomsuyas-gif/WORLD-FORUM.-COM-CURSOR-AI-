import { z } from "zod";

export type MarketplaceCategory = "electronics" | "fashion" | "food";

export type MarketplaceProduct = {
  id: string;
  slug: string;
  title: string;
  category: MarketplaceCategory;
  brand?: string;
  images?: string[];
  baseInternationalUsd: number;
  // Optional local “seller price” (USD) — for low-cost items (<$2, etc.)
  sellerUsd?: number;
  tags?: string[];
};

export const MARKETPLACE_PRODUCTS: MarketplaceProduct[] = [
  // Electronics (digital products)
  {
    id: "p-iphone-13",
    slug: "iphone-13",
    title: "Apple iPhone 13 (128GB)",
    category: "electronics",
    brand: "Apple",
    baseInternationalUsd: 450,
    tags: ["phone", "ios"],
  },
  {
    id: "p-samsung-a15",
    slug: "samsung-galaxy-a15",
    title: "Samsung Galaxy A15",
    category: "electronics",
    brand: "Samsung",
    baseInternationalUsd: 160,
    tags: ["phone", "android"],
  },
  {
    id: "p-phone-cover",
    slug: "phone-cover-silicone",
    title: "Silicone Phone Cover",
    category: "electronics",
    baseInternationalUsd: 4,
    sellerUsd: 1.5,
    tags: ["accessory", "cover"],
  },
  {
    id: "p-screen-protector",
    slug: "screen-glass-protector",
    title: "Tempered Glass Screen Protector",
    category: "electronics",
    baseInternationalUsd: 3,
    sellerUsd: 1.2,
    tags: ["accessory", "protector"],
  },
  {
    id: "p-camera",
    slug: "camera-1080p-webcam",
    title: "1080p Webcam Camera",
    category: "electronics",
    baseInternationalUsd: 25,
    tags: ["camera"],
  },
  {
    id: "p-speaker",
    slug: "bluetooth-speaker",
    title: "Bluetooth Speaker",
    category: "electronics",
    baseInternationalUsd: 18,
    tags: ["speaker", "audio"],
  },

  // Fashion (international + cultural)
  {
    id: "p-sneakers",
    slug: "trend-sneakers",
    title: "Trending Sneakers",
    category: "fashion",
    baseInternationalUsd: 45,
    tags: ["shoes", "trending"],
  },
  {
    id: "p-dress-cultural",
    slug: "cultural-dress",
    title: "Cultural Dress (Handmade Style)",
    category: "fashion",
    baseInternationalUsd: 30,
    tags: ["clothes", "cultural"],
  },
  {
    id: "p-tshirt",
    slug: "basic-tshirt",
    title: "Basic T‑Shirt",
    category: "fashion",
    baseInternationalUsd: 6,
    sellerUsd: 1.9,
    tags: ["clothes"],
  },

  // Food (eggs, meat, fish, oil, potatoes, bananas, flour, grains)
  {
    id: "p-eggs-tray",
    slug: "eggs-tray-30",
    title: "Eggs (Tray of 30)",
    category: "food",
    baseInternationalUsd: 6,
    tags: ["eggs"],
  },
  {
    id: "p-meat-beef",
    slug: "beef-1kg",
    title: "Beef (1kg)",
    category: "food",
    baseInternationalUsd: 8,
    tags: ["meat"],
  },
  {
    id: "p-fish",
    slug: "fresh-fish-1kg",
    title: "Fresh Fish (1kg)",
    category: "food",
    baseInternationalUsd: 7,
    tags: ["fish"],
  },
  {
    id: "p-small-fish",
    slug: "small-fish-dagaa-1kg",
    title: "Small Fish / Dagaa (1kg)",
    category: "food",
    baseInternationalUsd: 5,
    tags: ["fish"],
  },
  {
    id: "p-oil",
    slug: "cooking-oil-1l",
    title: "Cooking Oil (1L)",
    category: "food",
    baseInternationalUsd: 4,
    tags: ["oil"],
  },
  {
    id: "p-potatoes",
    slug: "potatoes-1kg",
    title: "Potatoes (1kg)",
    category: "food",
    baseInternationalUsd: 2.2,
    tags: ["potatoes"],
  },
  {
    id: "p-banana-ripe",
    slug: "bananas-ripe-1kg",
    title: "Bananas (Ripe, 1kg)",
    category: "food",
    baseInternationalUsd: 1.8,
    tags: ["banana"],
  },
  {
    id: "p-plantain",
    slug: "bananas-plantain-1kg",
    title: "Bananas (Plantain, 1kg)",
    category: "food",
    baseInternationalUsd: 2.0,
    tags: ["banana", "plantain"],
  },
  {
    id: "p-flour-wheat",
    slug: "wheat-flour-2kg",
    title: "Wheat Flour (2kg)",
    category: "food",
    baseInternationalUsd: 3.5,
    tags: ["flour", "wheat"],
  },
  {
    id: "p-rice",
    slug: "rice-5kg",
    title: "Rice (5kg)",
    category: "food",
    baseInternationalUsd: 10,
    tags: ["rice"],
  },
  {
    id: "p-corn-flour",
    slug: "corn-flour-2kg",
    title: "Corn Flour (2kg)",
    category: "food",
    baseInternationalUsd: 3.0,
    tags: ["flour", "corn"],
  },
  {
    id: "p-maize-raw",
    slug: "maize-raw-10kg",
    title: "Maize (Raw, 10kg)",
    category: "food",
    baseInternationalUsd: 8.5,
    tags: ["maize"],
  },
  {
    id: "p-maize-fresh",
    slug: "maize-fresh-10pcs",
    title: "Maize (Fresh, 10pcs)",
    category: "food",
    baseInternationalUsd: 3.2,
    tags: ["maize", "fresh"],
  },
];

export function predictPriceUsd(product: MarketplaceProduct) {
  // MVP predictor:
  // - Use international baseline + a lightweight market multiplier
  // - If seller price exists (e.g. <$2), bias toward seller price.
  const baseline = Math.max(0, product.baseInternationalUsd);
  const seller = typeof product.sellerUsd === "number" ? product.sellerUsd : null;

  const categoryMultiplier =
    product.category === "electronics"
      ? 1.18
      : product.category === "fashion"
        ? 1.12
        : 1.08;

  const predicted = baseline * categoryMultiplier;
  if (seller != null) {
    // Blend: 70% seller, 30% predicted baseline
    return Math.max(0.5, seller * 0.7 + predicted * 0.3);
  }
  return predicted;
}

export function convertUsdToTzs(usd: number) {
  const rate = 2600; // MVP: fixed. Later: live FX feed.
  return usd * rate;
}

export const SellerProductInputSchema = z.object({
  title: z.string().min(3).max(80),
  category: z.enum(["electronics", "fashion", "food"]),
  baseInternationalUsd: z.number().min(0.1).max(100000),
  sellerUsd: z.number().min(0.5).max(100000).optional(),
});

