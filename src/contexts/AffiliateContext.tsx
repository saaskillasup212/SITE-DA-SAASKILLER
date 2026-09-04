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
  const [affiliateSlug, setAffiliateSlug] = useState<string | null>(() => {
    // try reading from localStorage initially
    return localStorage.getItem("affiliateSlug") || null;
  });
  const [autoDiscount, setAutoDiscount] = useState<boolean>(() => {
    return sessionStorage.getItem("autoDiscount") === "true" || localStorage.getItem("autoDiscount") === "true";
  });
  const location = useLocation();

  useEffect(() => {
    // Tenta extrair o afiliado da rota atual, assumindo que as rotas de afiliado são no formato /:afiliado ou /:afiliado/planos
    const pathParts = location.pathname.split("/").filter(Boolean);
    if (pathParts.length > 0) {
      let possibleAffiliate = pathParts[0].toLowerCase();
      let hasVip = false;

      if (possibleAffiliate.endsWith("-vip")) {
        hasVip = true;
        possibleAffiliate = possibleAffiliate.replace("-vip", "");
      }

      // Verifica se é um afiliado válido usando a lista de validCoupons
      if (OFFER.validCoupons.includes(possibleAffiliate as any)) {
        setAffiliateSlug(possibleAffiliate);
        localStorage.setItem("affiliateSlug", possibleAffiliate);
        
        if (hasVip) {
          setAutoDiscount(true);
          sessionStorage.setItem("autoDiscount", "true");
        } else {
          setAutoDiscount(false);
          sessionStorage.removeItem("autoDiscount");
          localStorage.removeItem("autoDiscount");
        }
        return; // Sai do useEffect prematuramente para não cair na lógica de limpeza abaixo
      }
    }
    
    // Se a execução chegou aqui, significa que a URL atual NÃO contém um slug de afiliado válido
    // (Pode ser a raiz "/", "/planos", "/termos-de-uso", etc.)
    // Vamos garantir a limpeza total para não haver "vazamento" de afiliados
    setAffiliateSlug(null);
    localStorage.removeItem("affiliateSlug");
    setAutoDiscount(false);
    sessionStorage.removeItem("autoDiscount");
    localStorage.removeItem("autoDiscount");
  }, [location.pathname]);

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
