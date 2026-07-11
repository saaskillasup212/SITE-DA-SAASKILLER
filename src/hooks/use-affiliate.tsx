import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface AffiliateLinks {
  essencial: string;
  pro: string;
  supreme: string;
}

// Links padrão (dono) - Lovable App
const defaultLinks: AffiliateLinks = {
  essencial: "https://brsaaskiller.lovable.app/signup-plan?plan=essencial",
  pro: "https://brsaaskiller.lovable.app/signup-plan?plan=pro",
  supreme: "https://brsaaskiller.lovable.app/signup-plan?plan=scale",
};

export function useAffiliate(slug?: string) {
  const [links, setLinks] = useState<AffiliateLinks>(defaultLinks);
  const [isLoading, setIsLoading] = useState(true);
  const [affiliateExists, setAffiliateExists] = useState(true);

  useEffect(() => {
    async function fetchAffiliate() {
      if (!slug) {
        setLinks(defaultLinks);
        setIsLoading(false);
        return;
      }

      // Verifica se o afiliado existe no banco de dados pelo slug
      const { data, error } = await supabase
        .from("affiliates")
        .select("slug")
        .eq("slug", slug.toLowerCase())
        .maybeSingle();

      if (error || !data) {
        console.log("Affiliate not found, using default links");
        setLinks(defaultLinks);
        setAffiliateExists(false);
      } else {
        // Se o afiliado existe, anexamos o slug como parâmetro 'ref' nas URLs do Lovable
        const affiliateSlug = data.slug.toLowerCase();
        setLinks({
          essencial: `https://brsaaskiller.lovable.app/signup-plan?plan=essencial&ref=${affiliateSlug}`,
          pro: `https://brsaaskiller.lovable.app/signup-plan?plan=pro&ref=${affiliateSlug}`,
          supreme: `https://brsaaskiller.lovable.app/signup-plan?plan=scale&ref=${affiliateSlug}`,
        });
        setAffiliateExists(true);
      }
      setIsLoading(false);
    }

    fetchAffiliate();
  }, [slug]);

  return { links, isLoading, affiliateExists };
}
