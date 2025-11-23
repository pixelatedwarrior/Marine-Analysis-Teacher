import { useNavigate } from "react-router-dom";
import { useProgression, LocationId } from "@/hooks/useProgression";
import { Button } from "@/components/Button";
import { cn } from "@/lib/utils";

interface LocationCardProps {
  locationId: LocationId;
  name: string;
  emoji: string;
  position: { top: string; left: string };
  unlocked: boolean;
  completed: boolean;
  onClick: () => void;
}

const LocationCard = ({
  locationId,
  name,
  emoji,
  position,
  unlocked,
  completed,
  onClick,
}: LocationCardProps) => {
  return (
    <div
      className="absolute cursor-pointer group"
      style={{ top: position.top, left: position.left }}
      onClick={unlocked ? onClick : undefined}
    >
      <div
        className={cn(
          "relative transition-all duration-500",
          unlocked
            ? "hover:scale-110 cursor-pointer"
            : "opacity-40 cursor-not-allowed grayscale",
          completed && "ring-4 ring-teal ring-offset-4 ring-offset-background rounded-full"
        )}
      >
        {/* Location Icon */}
        <div
          className={cn(
            "w-24 h-24 md:w-32 md:h-32 rounded-full flex items-center justify-center text-4xl md:text-5xl shadow-ocean transition-all",
            unlocked
              ? completed
                ? "bg-teal/20 border-4 border-teal"
                : "bg-bubble/80 border-4 border-ocean-medium hover:border-teal"
              : "bg-muted border-4 border-muted-foreground/30"
          )}
        >
          {emoji}
        </div>

        {/* Location Name */}
        <div
          className={cn(
            "absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-center transition-all",
            unlocked ? "text-ocean-deep font-bold" : "text-muted-foreground"
          )}
        >
          <div className="text-sm md:text-base font-semibold">{name}</div>
          {completed && (
            <div className="text-xs text-teal mt-1">✓ Completed</div>
          )}
          {!unlocked && (
            <div className="text-xs text-muted-foreground mt-1">🔒 Locked</div>
          )}
        </div>

        {/* Pulse animation for unlocked locations */}
        {unlocked && !completed && (
          <div className="absolute inset-0 rounded-full bg-teal/30 animate-ping" />
        )}
      </div>

      {/* Connection line hint (visual path) */}
      {unlocked && (
        <div className="absolute top-1/2 -left-16 w-16 h-0.5 bg-ocean-medium/30 -z-10" />
      )}
    </div>
  );
};

// Animated bubble component
const Bubble = ({ delay, size, left }: { delay: number; size: number; left: string }) => (
  <div
    className="absolute rounded-full bg-bubble/40 backdrop-blur-sm animate-bubble-float"
    style={{
      width: `${size}px`,
      height: `${size}px`,
      left,
      bottom: "-20px",
      animationDelay: `${delay}s`,
      animationDuration: `${4 + delay}s`,
    }}
  />
);

// Animated fish component
const Fish = ({ delay, left, top }: { delay: number; left: string; top: string }) => (
  <div
    className="absolute text-2xl animate-float"
    style={{
      left,
      top,
      animationDelay: `${delay}s`,
      animationDuration: `${3 + delay * 0.5}s`,
    }}
  >
    🐠
  </div>
);

export const OceanMap = () => {
  const navigate = useNavigate();
  const { locations, isLocationUnlocked, resetProgression } = useProgression();

  const handleLocationClick = (locationId: LocationId) => {
    const location = locations.find((loc) => loc.id === locationId);
    if (location && location.unlocked && location.routes.length > 0) {
      navigate(location.routes[0]);
    }
  };

  const locationPositions: Record<LocationId, { top: string; left: string }> = {
    "coral-reef": { top: "20%", left: "10%" },
    "kelp-forest": { top: "35%", left: "35%" },
    "open-ocean": { top: "50%", left: "60%" },
    "deep-sea": { top: "70%", left: "85%" },
  };

  return (
    <div className="min-h-screen ocean-gradient relative overflow-hidden py-12 px-4">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Bubbles */}
        {Array.from({ length: 15 }).map((_, i) => (
          <Bubble
            key={`bubble-${i}`}
            delay={i * 0.3}
            size={20 + Math.random() * 30}
            left={`${Math.random() * 100}%`}
          />
        ))}

        {/* Fish */}
        <Fish delay={0} left="15%" top="25%" />
        <Fish delay={1} left="45%" top="40%" />
        <Fish delay={2} left="70%" top="55%" />
        <Fish delay={1.5} left="25%" top="60%" />
      </div>

      {/* Map Container */}
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-bubble drop-shadow-lg animate-float">
            🌊 Your Ocean Journey
          </h1>
          <p className="text-xl text-bubble/90">
            Explore each location to learn about ocean soundscapes!
          </p>
        </div>

        {/* Map Canvas */}
        <div className="relative bg-card/60 backdrop-blur-md rounded-3xl p-8 md:p-16 shadow-ocean min-h-[600px] border-4 border-ocean-medium/30">
          {/* Path connecting locations - animated */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ zIndex: 1 }}
          >
            <defs>
              <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(var(--ocean-medium))" stopOpacity="0.6" />
                <stop offset="50%" stopColor="hsl(var(--teal))" stopOpacity="0.8" />
                <stop offset="100%" stopColor="hsl(var(--ocean-medium))" stopOpacity="0.6" />
              </linearGradient>
            </defs>
            <path
              d="M 10% 20% Q 20% 25% 35% 35% T 60% 50% T 85% 70%"
              stroke="url(#pathGradient)"
              strokeWidth="6"
              strokeDasharray="15 10"
              fill="none"
              opacity="0.5"
              style={{
                animation: "dash 3s linear infinite",
              }}
            />
          </svg>
          <style>{`
            @keyframes dash {
              to {
                stroke-dashoffset: -100;
              }
            }
          `}</style>

          {/* Location Cards */}
          {locations.map((location) => (
            <LocationCard
              key={location.id}
              locationId={location.id}
              name={location.name}
              emoji={location.emoji}
              position={locationPositions[location.id]}
              unlocked={location.unlocked}
              completed={location.completed}
              onClick={() => handleLocationClick(location.id)}
            />
          ))}

          {/* Decorative Elements */}
          <div className="absolute top-5 left-5 text-3xl opacity-30">🌊</div>
          <div className="absolute top-10 right-10 text-2xl opacity-30">🐚</div>
          <div className="absolute bottom-10 left-10 text-2xl opacity-30">⭐</div>
          <div className="absolute bottom-5 right-5 text-3xl opacity-30">💫</div>
        </div>

        {/* Instructions */}
        <div className="mt-8 text-center space-y-4">
          <p className="text-bubble/80 text-lg">
            {locations.every((loc) => loc.completed)
              ? "🎉 Congratulations! You've explored all locations!"
              : "Click on an unlocked location to begin your adventure!"}
          </p>
          <div className="flex justify-center gap-4">
            <Button
              onClick={() => navigate("/")}
              variant="ghost"
              className="text-bubble/80"
            >
              🏠 Home
            </Button>
            {locations.some((loc) => loc.completed) && (
              <Button
                onClick={() => {
                  if (confirm("Reset your progress and start over?")) {
                    resetProgression();
                  }
                }}
                variant="ghost"
                className="text-bubble/80"
              >
                🔄 Reset Progress
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

