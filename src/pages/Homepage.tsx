import { useNavigate } from "react-router-dom";
import { Button } from "@/components/Button";
import underwaterScene from "@/assets/underwater-scene.jpg";

const Homepage = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background with underwater scene */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${underwaterScene})`,
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-ocean-deep/60 via-ocean-deep/40 to-ocean-deep/60" />
        
        {/* Animated bubbles overlay */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-bubble/30 bubble-float"
              style={{
                left: `${Math.random() * 100}%`,
                bottom: `${Math.random() * 20}%`,
                width: `${20 + Math.random() * 30}px`,
                height: `${20 + Math.random() * 30}px`,
                animationDelay: `${Math.random() * 6}s`,
                animationDuration: `${4 + Math.random() * 4}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="relative z-30 pt-8 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center gap-4 md:gap-8">
            <Button
              onClick={() => navigate("/map")}
              variant="accent"
              size="lg"
              className="backdrop-blur-sm bg-white/10 hover:bg-white/20 border-2 border-white/30 text-white shadow-lg hover:scale-105 transition-all duration-300"
            >
              🏛️ Museum Learning Experience
            </Button>
            <Button
              onClick={() => navigate("/analyze")}
              variant="primary"
              size="lg"
              className="backdrop-blur-sm bg-white/10 hover:bg-white/20 border-2 border-white/30 text-white shadow-lg hover:scale-105 transition-all duration-300"
            >
              🎵 Marine Sound Analysis
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen px-4 text-center pb-32">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Title */}
          <h1 className="text-6xl md:text-8xl font-bold mb-6 drop-shadow-2xl animate-float">
            <span className="bg-gradient-to-r from-bubble via-ocean-light to-bubble bg-clip-text text-transparent">
              Ocean Explorer
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-2xl md:text-3xl mb-8 text-bubble drop-shadow-lg font-medium">
            Dive into the depths of marine discovery
          </p>
          
          {/* Description */}
          <p className="text-lg md:text-xl text-bubble/90 max-w-2xl mx-auto drop-shadow-md leading-relaxed">
            Explore the wonders of the ocean through interactive learning experiences 
            and discover the hidden sounds of marine life.
          </p>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-20 left-10 opacity-30">
          <div className="w-32 h-32 border-4 border-ocean-light rounded-full animate-pulse" />
        </div>
        <div className="absolute top-40 right-10 opacity-20">
          <div className="w-24 h-24 border-4 border-teal rounded-full animate-pulse" style={{ animationDelay: "1s" }} />
        </div>
        <div className="absolute bottom-40 right-20 opacity-25">
          <div className="w-16 h-16 border-4 border-coral rounded-full animate-pulse" style={{ animationDelay: "2s" }} />
        </div>
      </div>

      {/* Wave animation at bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg
          className="w-full h-32"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="hsl(195, 75%, 65%)"
            fillOpacity="0.3"
            d="M0,160L48,138.7C96,117,192,75,288,74.7C384,75,480,117,576,138.7C672,160,768,160,864,138.7C960,117,1056,75,1152,64C1248,53,1344,75,1392,85.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            className="wave-animation"
          />
        </svg>
      </div>
    </div>
  );
};

export default Homepage;

