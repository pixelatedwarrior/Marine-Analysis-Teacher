import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/Button";
import beachScene from "@/assets/beach-scene.jpg";
import underwaterScene from "@/assets/underwater-scene.jpg";

const Hero = () => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const navigate = useNavigate();

  const handleBeginJourney = () => {
    setIsTransitioning(true);
    // After animation, navigate to ocean map
    setTimeout(() => {
      navigate("/map");
    }, 2000);
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Beach Scene */}
      <div 
        className={`absolute inset-0 transition-all duration-[2000ms] ${
          isTransitioning ? "opacity-0 scale-110" : "opacity-100 scale-100"
        }`}
        style={{
          backgroundImage: `url(${beachScene})`,
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/20" />
      </div>

      {/* Underwater Scene */}
      <div 
        className={`absolute inset-0 transition-all duration-[2000ms] ${
          isTransitioning ? "opacity-100 scale-100" : "opacity-0 scale-90"
        }`}
        style={{
          backgroundImage: `url(${underwaterScene})`,
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-ocean-deep/40 to-ocean-deep/60" />
      </div>

      {/* Wave Animation Overlay */}
      {isTransitioning && (
        <div className="absolute inset-0 z-10">
          <svg
            className="absolute bottom-0 w-full"
            viewBox="0 0 1440 320"
            style={{ transform: "translateY(100%)", animation: "slideWave 2s ease-in-out forwards" }}
          >
            <path
              fill="hsl(195, 75%, 65%)"
              fillOpacity="0.8"
              d="M0,160L48,138.7C96,117,192,75,288,74.7C384,75,480,117,576,138.7C672,160,768,160,864,138.7C960,117,1056,75,1152,64C1248,53,1344,75,1392,85.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            />
          </svg>
        </div>
      )}

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full px-4 text-center">
        <div 
          className={`transition-all duration-1000 ${
            isTransitioning ? "opacity-0 -translate-y-20" : "opacity-100 translate-y-0"
          }`}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-lg">
            <span className={isTransitioning ? "text-bubble" : "text-ocean-deep"}>
              Sea Life Explorer
            </span>
          </h1>
          <p className={`text-xl md:text-2xl mb-8 max-w-2xl mx-auto drop-shadow-md ${
            isTransitioning ? "text-bubble" : "text-ocean-medium"
          }`}>
            Ever wondered what a healthy ecosystem is like?
          </p>
          {!isTransitioning && (
            <Button
              onClick={handleBeginJourney}
              variant="accent"
              size="lg"
              className="animate-float"
            >
              🌊 Begin Your Journey
            </Button>
          )}
        </div>

        {isTransitioning && (
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 text-bubble text-2xl font-bold animate-pulse">
            Diving into the ocean...
          </div>
        )}
      </div>

      <style>{`
        @keyframes slideWave {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(-100%);
          }
        }
      `}</style>
    </div>
  );
};

export default Hero;

