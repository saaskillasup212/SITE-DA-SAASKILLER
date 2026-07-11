import { useState, useEffect } from "react";

export const useIOSCheck = () => {
  const [isIOS, setIsIOS] = useState(false);
  const [isIOSSafari, setIsIOSSafari] = useState(false);

  useEffect(() => {
    const checkIOS = () => {
      const userAgent = window.navigator.userAgent.toLowerCase();
      const isIOSDevice = /iphone|ipad|ipod/.test(userAgent);
      const isSafari = /safari/.test(userAgent) && !/chrome|crios|fxios/.test(userAgent);
      
      setIsIOS(isIOSDevice);
      setIsIOSSafari(isIOSDevice && isSafari);
    };

    checkIOS();
  }, []);

  return { isIOS, isIOSSafari };
};
