import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/gold-lightning-logo.png";
import { useIOSCheck } from "@/hooks/use-ios-check";

interface LoadingScreenProps {
  isLoading: boolean;
}

const LoadingScreen = ({ isLoading }: LoadingScreenProps) => {
  const { isIOS } = useIOSCheck();

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-xl"
        >
          {/* Camada de gradiente de profundidade */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/70 pointer-events-none" />
          
          {/* Glow central dourado sutil */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(230,181,74,0.08)_0%,transparent_60%)] pointer-events-none" />

          <div className="relative text-center z-10">
            {isIOS ? (
              // Versão CSS puro para iOS - mesmo visual premium
              <>
                <div className="relative w-32 h-32 sm:w-36 sm:h-36 mx-auto mb-8">
                  {/* Ring orbital CSS */}
                  <div 
                    className="absolute inset-0 rounded-full animate-spin"
                    style={{
                      background: 'conic-gradient(from 0deg, transparent, rgba(230, 181, 74, 0.8), transparent)',
                      maskImage: 'radial-gradient(farthest-side, transparent calc(100% - 3px), black calc(100% - 3px))',
                      WebkitMaskImage: 'radial-gradient(farthest-side, transparent calc(100% - 3px), black calc(100% - 3px))',
                      animationDuration: '2s',
                    }}
                  />
                  
                  {/* Logo com glow */}
                  <img
                    src={logo}
                    alt="SaaSKiller"
                    className="absolute inset-0 m-auto w-20 h-20 sm:w-24 sm:h-24 animate-pulse"
                    style={{
                      filter: 'drop-shadow(0 0 25px rgba(230, 181, 74, 0.6))',
                    }}
                  />
                </div>

                <p 
                  className="text-white/70 text-sm tracking-[0.2em] uppercase font-light animate-pulse"
                  style={{ animationDuration: '2s' }}
                >
                  Carregando
                </p>
              </>
            ) : (
              // Versão completa com framer-motion
              <>
                <div className="relative w-32 h-32 sm:w-36 sm:h-36 mx-auto mb-8">
                  {/* Ring orbital animado */}
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: 'conic-gradient(from 0deg, transparent, rgba(230, 181, 74, 0.8), transparent)',
                      maskImage: 'radial-gradient(farthest-side, transparent calc(100% - 3px), black calc(100% - 3px))',
                      WebkitMaskImage: 'radial-gradient(farthest-side, transparent calc(100% - 3px), black calc(100% - 3px))',
                    }}
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                  
                  {/* Segundo ring - direção oposta, mais sutil */}
                  <motion.div
                    className="absolute inset-2 rounded-full opacity-50"
                    style={{
                      background: 'conic-gradient(from 180deg, transparent, rgba(230, 181, 74, 0.5), transparent)',
                      maskImage: 'radial-gradient(farthest-side, transparent calc(100% - 2px), black calc(100% - 2px))',
                      WebkitMaskImage: 'radial-gradient(farthest-side, transparent calc(100% - 2px), black calc(100% - 2px))',
                    }}
                    animate={{ rotate: -360 }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />

                  {/* Logo com glow pulsante */}
                  <motion.img
                    src={logo}
                    alt="SaaSKiller"
                    className="absolute inset-0 m-auto w-20 h-20 sm:w-24 sm:h-24"
                    style={{
                      filter: 'drop-shadow(0 0 25px rgba(230, 181, 74, 0.6))',
                    }}
                    animate={{
                      scale: [1, 1.05, 1],
                      filter: [
                        'drop-shadow(0 0 25px rgba(230, 181, 74, 0.6))',
                        'drop-shadow(0 0 35px rgba(230, 181, 74, 0.8))',
                        'drop-shadow(0 0 25px rgba(230, 181, 74, 0.6))',
                      ],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </div>

                {/* Texto elegante */}
                <motion.p
                  className="text-white/70 text-sm tracking-[0.2em] uppercase font-light"
                  animate={{ opacity: [0.5, 0.8, 0.5] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  Carregando
                </motion.p>
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
