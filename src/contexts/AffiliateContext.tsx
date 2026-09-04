import React, { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getNormalizedCoupon, AFFILIATE_CODES, OFFER } from "@/config/offer";

interface AffiliateContextType {
  affiliateSlug: string | null;
  normalizedAffiliate: string | null;
  autoDiscount: boolean;
}

const AffiliateContext = createContext<AffiliateContextType>({
  affiliateSlug: null,
  normalizedAffiliate: null,
  autoDiscount: false,
});

export const AffiliateProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const location = useLocation();

  const getAffiliateData = () => {
    const pathParts = location.pathname.split("/").filter(Boolean);
    if (pathParts.length > 0) {
      let possibleAffiliate = pathParts[0].toLowerCase();
      let hasVip = false;

      if (possibleAffiliate.endsWith("-vip")) {
        hasVip = true;
        possibleAffiliate = possibleAffiliate.replace("-vip", "");
      }

      if (OFFER.validCoupons.includes(possibleAffiliate as any)) {
        return {
          slug: possibleAffiliate,
          autoDiscount: hasVip,
        };
      }
    }
    
    return {
      slug: null,
      autoDiscount: false,
    };
  };

  const { slug: affiliateSlug, autoDiscount } = getAffiliateData();

  const normalizedAffiliate = affiliateSlug
    ? getNormalizedCoupon(affiliateSlug)
    : null;

  return (
    <AffiliateContext.Provider value={{ affiliateSlug, normalizedAffiliate, autoDiscount }}>
      {children}
    </AffiliateContext.Provider>
  );
};

export const useAffiliate = () => useContext(AffiliateContext);
