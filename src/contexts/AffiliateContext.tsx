import React, { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getNormalizedCoupon, AFFILIATE_CODES, OFFER } from "@/config/offer";

interface AffiliateContextType {
  affiliateSlug: string | null;
  normalizedAffiliate: string | null;
}

const AffiliateContext = createContext<AffiliateContextType>({
  affiliateSlug: null,
  normalizedAffiliate: null,
});

export const AffiliateProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [affiliateSlug, setAffiliateSlug] = useState<string | null>(() => {
    // try reading from localStorage initially
    return localStorage.getItem("affiliateSlug") || null;
  });
  const location = useLocation();

  useEffect(() => {
    // Tenta extrair o afiliado da rota atual, assumindo que as rotas de afiliado são no formato /:afiliado ou /:afiliado/planos
    const pathParts = location.pathname.split("/").filter(Boolean);
    if (pathParts.length > 0) {
      const possibleAffiliate = pathParts[0].toLowerCase();
      // Verifica se é um afiliado válido usando a lista de validCoupons
      if (OFFER.validCoupons.includes(possibleAffiliate as any)) {
        setAffiliateSlug(possibleAffiliate);
        localStorage.setItem("affiliateSlug", possibleAffiliate);
      }
    }
  }, [location.pathname]);

  const normalizedAffiliate = affiliateSlug
    ? getNormalizedCoupon(affiliateSlug)
    : null;

  return (
    <AffiliateContext.Provider value={{ affiliateSlug, normalizedAffiliate }}>
      {children}
    </AffiliateContext.Provider>
  );
};

export const useAffiliate = () => useContext(AffiliateContext);
