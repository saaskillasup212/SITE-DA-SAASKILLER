import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface LoadingContextType {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within LoadingProvider");
  }
  return context;
};

interface LoadingProviderProps {
  children: ReactNode;
}

export const LoadingProvider = ({ children }: LoadingProviderProps) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Ensure loading screen shows, then wait for page to be fully loaded
    const handleLoad = () => {
      // Add a small delay to ensure smooth transition
      setTimeout(() => {
        setIsLoading(false);
      }, 800);
    };

    // If page is already loaded
    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }

    // Maximum timeout of 3 seconds regardless of loading state
    const maxTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => {
      window.removeEventListener('load', handleLoad);
      clearTimeout(maxTimeout);
    };
  }, []);

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};
