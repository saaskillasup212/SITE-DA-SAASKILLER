import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";

import { LoadingProvider, useLoading } from "./contexts/LoadingContext";
import LoadingScreen from "./components/LoadingScreen";
import ErrorBoundary from "./components/ErrorBoundary";
import SmoothScroll from "./components/SmoothScroll";
import WhatsAppButton from "./components/WhatsAppButton";
import { AffiliateProvider } from "./contexts/AffiliateContext";

const queryClient = new QueryClient();

const ExtensionCredits = lazy(() => import("./pages/ExtensionCredits"));
const Planos = lazy(() => import("./pages/Planos"));
const NotFound = lazy(() => import("./pages/NotFound"));
const PoliticaPrivacidade = lazy(() => import("./pages/PoliticaPrivacidade"));
const TermosUso = lazy(() => import("./pages/TermosUso"));
const PoliticaReembolso = lazy(() => import("./pages/PoliticaReembolso"));

const AppContent = () => {
  const { isLoading } = useLoading();

  return (
    <SmoothScroll>
      <WhatsAppButton />
      <LoadingScreen isLoading={isLoading} />
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AffiliateProvider>
            <Suspense fallback={null}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/planos" element={<Planos />} />
                <Route
                  path="/extensao-creditos-lovable"
                  element={<ExtensionCredits />}
                />
                <Route
                  path="/creditos-infinitos"
                  element={<ExtensionCredits />}
                />
                <Route path="/politica-de-privacidade" element={<PoliticaPrivacidade />} />
                <Route path="/termos-de-uso" element={<TermosUso />} />
                <Route path="/politica-de-reembolso" element={<PoliticaReembolso />} />
                <Route path="/:afiliado" element={<Index />} />
                <Route path="/:afiliado/planos" element={<Planos />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </AffiliateProvider>
        </BrowserRouter>
      </TooltipProvider>
    </SmoothScroll>
  );
};

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <LoadingProvider>
        <AppContent />
      </LoadingProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
