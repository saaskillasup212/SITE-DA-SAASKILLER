import { ALLOWED_UTM_PARAMS } from "./constants";

export type BillingCycle = "monthly" | "annual";

export const SAASKILLER_PRICING = {
  monthly: {
    amountCents: 29400,
    discountedCents: 14700,
    cycle: "monthly",
  },
  annual: {
    amountCents: 59400,
    discountedCents: 29700,
    cycle: "annual",
  },
} as const;

export const getSaaSKillerPriceCents = (
  cycle: BillingCycle,
  hasCoupon: boolean,
) => {
  return hasCoupon 
    ? SAASKILLER_PRICING[cycle].discountedCents 
    : SAASKILLER_PRICING[cycle].amountCents;
};

export const OFFER = {
  plan: "complete",
  name: "SaaSKiller Completo",
  checkoutUrls: {
    monthly: {
      regular:
        "https://checkout.applyfy.com.br/checkout/cmrxrxc6b01h901q44mkb03ph?offer=JE9P1F0",
      discounted:
        "https://checkout.applyfy.com.br/checkout/cmrxrxc6b01h901q44mkb03ph?offer=M39YWU9",
    },
    annual: {
      regular:
        "https://checkout.applyfy.com.br/checkout/cmrxrxc6b01h901q44mkb03ph?offer=ZRCMPG7",
      discounted:
        "https://checkout.applyfy.com.br/checkout/cmrxrxc6b01h901q44mkb03ph?offer=339HDAH",
    },
  },
  validCoupons: ["copa", "copa26", "copa2026", "saaskiller", "desconto50", "black", "mathias", "ruan", "r1an", "guilherme", "gu1h", "ayanna", "ay4nn4", "leandro", "l4and4o"],
} as const;

export const AFFILIATE_CODES: Record<string, string> = {
  "r1an": "ruan",
  "m4thias": "mathias",
  "gu1h": "guilherme",
  "ay4nn4": "ayanna",
  "l4and4o": "leandro"
};

export const getNormalizedCoupon = (coupon: string) => {
  const lower = coupon.toLowerCase();
  return AFFILIATE_CODES[lower] || lower;
};

export const buildRegistrationUrl = (
  cycle: BillingCycle,
  coupon?: string,
  affiliate?: string | null,
  autoDiscount: boolean = false,
  search = typeof window !== "undefined" ? window.location.search : "",
) => {
  const sourceParams = new URLSearchParams(search);
  const normalizedCoupon = coupon ? getNormalizedCoupon(coupon).toUpperCase() : undefined;
  const isAffiliateCoupon = normalizedCoupon === "MATHIAS" || normalizedCoupon === "RUAN" || normalizedCoupon === "GUILHERME" || normalizedCoupon === "AYANNA" || normalizedCoupon === "LEANDRO";
  const priceType = (normalizedCoupon && !isAffiliateCoupon) || autoDiscount ? "discounted" : "regular";
  const checkoutUrl = new URL(OFFER.checkoutUrls[cycle][priceType]);

  if (coupon) {
    checkoutUrl.searchParams.set("coupon", coupon);
  }

  // Se o afiliado na URL for o Guilherme ou se o cupom digitado for o Guilherme
  if (affiliate === "guilherme" || normalizedCoupon === "GUILHERME") {
    checkoutUrl.searchParams.set("code", "8w3oieb");
  } else if (affiliate === "ayanna" || normalizedCoupon === "AYANNA") {
    checkoutUrl.searchParams.set("code", "c92408w");
  } else if (affiliate === "leandro" || normalizedCoupon === "LEANDRO") {
    checkoutUrl.searchParams.set("code", "gk3pukl");
  }

  ALLOWED_UTM_PARAMS.forEach((parameter) => {
    const value = sourceParams.get(parameter);
    if (value) checkoutUrl.searchParams.set(parameter, value);
  });

  return checkoutUrl.toString();
};
