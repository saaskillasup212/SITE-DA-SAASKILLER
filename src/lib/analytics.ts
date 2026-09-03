declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

type AnalyticsValue = string | number | boolean | undefined;

export const trackEvent = (
  eventName: string,
  parameters: Record<string, AnalyticsValue> = {},
) => {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;

  const safeParameters = Object.fromEntries(
    Object.entries(parameters).filter(([, value]) => value !== undefined),
  );

  window.gtag("event", eventName, safeParameters);
};

