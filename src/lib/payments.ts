export type PaymentMethod = {
  id:
    | "card"
    | "paypal"
    | "alipay"
    | "mpesa"
    | "airtel"
    | "halopesa"
    | "yasmix"
    | "selcom"
    | "btc"
    | "eth"
    | "usdt";
  name: string;
  category:
    | "International"
    | "Mobile Money"
    | "Bank Cards (TZ)"
    | "Cryptocurrency";
  color: string;
};

export const PAYMENT_METHODS: PaymentMethod[] = [
  { id: "card", name: "Visa / Mastercard", category: "International", color: "#1A1F71" },
  { id: "paypal", name: "PayPal", category: "International", color: "#003087" },
  { id: "alipay", name: "Alipay", category: "International", color: "#1677FF" },

  { id: "mpesa", name: "M-PESA", category: "Mobile Money", color: "#E31E24" },
  { id: "airtel", name: "Airtel Money", category: "Mobile Money", color: "#FF0000" },
  { id: "halopesa", name: "HaloPesa", category: "Mobile Money", color: "#00A651" },
  { id: "yasmix", name: "YAS MIX", category: "Mobile Money", color: "#005BAA" },

  { id: "selcom", name: "Selcom (TZ)", category: "Bank Cards (TZ)", color: "#C9A84C" },

  { id: "btc", name: "Bitcoin", category: "Cryptocurrency", color: "#F7931A" },
  { id: "eth", name: "Ethereum", category: "Cryptocurrency", color: "#627EEA" },
  { id: "usdt", name: "USDT", category: "Cryptocurrency", color: "#26A17B" },
];

export type MembershipPlan = {
  id: "free" | "premium" | "pro";
  name: string;
  priceMonthlyUsd: number;
  perks: string[];
  highlighted?: boolean;
};

export const MEMBERSHIP_PLANS: MembershipPlan[] = [
  {
    id: "free",
    name: "Free",
    priceMonthlyUsd: 0,
    perks: ["Read public articles", "Basic search", "Community preview"],
  },
  {
    id: "premium",
    name: "Premium",
    priceMonthlyUsd: 5,
    highlighted: true,
    perks: ["Full articles + extras", "Language Academy access (MVP)", "Early Stories access"],
  },
  {
    id: "pro",
    name: "Pro",
    priceMonthlyUsd: 12,
    perks: ["Everything in Premium", "Certificates (coming)", "Marketplace perks (coming)"],
  },
];

