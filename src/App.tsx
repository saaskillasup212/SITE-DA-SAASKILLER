import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PoliticaPrivacidade from "./pages/PoliticaPrivacidade";
import TermosUso from "./pages/TermosUso";
import PoliticaReembolso from "./pages/PoliticaReembolso";

import { LoadingProvider, useLoading } from "./contexts/LoadingContext";
import LoadingScreen from "./components/LoadingScreen";
import ErrorBoundary from "./components/ErrorBoundary";
import Atmosphere from "./components/Atmosphere";
import CustomCursor from "./components/CustomCursor";
import SmoothScroll from "./components/SmoothScroll";

const queryClient = new QueryClient();

const AppContent = () => {
  const { isLoading } = useLoading();
  
  // Desabilitar menu de contexto (clique direito)
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };
    
    document.addEventListener('contextmenu', handleContextMenu);
    return () => document.removeEventListener('contextmenu', handleContextMenu);
  }, []);
  
  return (
    <SmoothScroll>
      <Atmosphere />
      <CustomCursor />
      <LoadingScreen isLoading={isLoading} />
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/:afiliado" element={<Index />} />
            <Route path="/politica-de-privacidade" element={<PoliticaPrivacidade />} />
            <Route path="/termos-de-uso" element={<TermosUso />} />
            <Route path="/politica-de-reembolso" element={<PoliticaReembolso />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
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
