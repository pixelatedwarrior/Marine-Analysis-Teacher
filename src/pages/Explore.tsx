import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/Button";
import { ModuleCard } from "@/components/ModuleCard";
import { useProgression } from "@/hooks/useProgression";

const Explore = () => {
  const [selectedSound, setSelectedSound] = useState<string | null>(null);
  const navigate = useNavigate();
  const { markLocationCompleted } = useProgression();

  const soundCategories = [
    {
      id: "healthy",
      title: "🐠 Healthy Reef Sounds",
      description: "Listen to the vibrant soundscape of a thriving coral reef with snapping shrimp, chirping fish, and gentle waves.",
      color: "bg-seaweed"
    },
    {
      id: "stressed",
      title: "⚠️ Stressed Ecosystem",
      description: "This recording has fewer natural sounds and more boat noise and human activity.",
      color: "bg-destructive"
    },
    {
      id: "quiet",
      title: "🤫 Very Quiet Area",
      description: "Sometimes silence means animals have left. What do you think happened here?",
      color: "bg-muted-foreground"
    }
  ];

  return (
    <div className="min-h-screen ocean-gradient py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-bubble drop-shadow-lg">
            🎧 Listen to Ocean Soundscapes
          </h1>
          <p className="text-xl text-bubble/90 max-w-2xl mx-auto">
            Click on each soundscape to hear what scientists hear. Can you tell which one is healthy?
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {soundCategories.map((category) => (
            <div 
              key={category.id}
              onClick={() => setSelectedSound(category.id)}
              className="cursor-pointer"
            >
              <ModuleCard 
                className={`transform transition-smooth hover:scale-105 ${
                  selectedSound === category.id ? "ring-4 ring-teal shadow-ocean" : ""
                }`}
              >
              <div className={`w-16 h-16 rounded-full ${category.color} flex items-center justify-center text-3xl mb-4 mx-auto shadow-float`}>
                {category.title.split(" ")[0]}
              </div>
              <h3 className="text-xl font-bold mb-3 text-center text-ocean-deep">
                {category.title}
              </h3>
              <p className="text-center text-foreground/80">
                {category.description}
              </p>
              <div className="mt-6 flex justify-center">
                <Button 
                  variant={selectedSound === category.id ? "accent" : "primary"}
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedSound(category.id);
                  }}
                >
                  {selectedSound === category.id ? "▶️ Playing..." : "▶️ Listen"}
              </Button>
              </div>
            </ModuleCard>
            </div>
          ))}
        </div>

        {selectedSound && (
          <ModuleCard className="bg-teal/10 border-2 border-teal">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4 text-ocean-deep">
                🎵 What You're Hearing
              </h3>
              <div className="bg-background/50 rounded-2xl p-6 mb-6">
                <div className="h-24 bg-ocean-light/20 rounded-lg flex items-center justify-center">
                  <span className="text-ocean-medium font-mono">
                    [Audio visualization placeholder - waveform will appear here]
                  </span>
                </div>
              </div>
              <p className="text-lg mb-4">
                {selectedSound === "healthy" && "Notice all the different clicks, pops, and chirps! That's a sign of lots of animal activity."}
                {selectedSound === "stressed" && "Can you hear the boat engines? Human noise can make it hard for marine animals to communicate."}
                {selectedSound === "quiet" && "This recording is very quiet. There should be more sounds here if the ecosystem was healthy."}
              </p>
            </div>
          </ModuleCard>
        )}

        <div className="flex justify-center gap-4 mt-12">
          <Button
            onClick={() => navigate("/map")}
            variant="ghost"
            className="text-ocean-medium"
          >
            ← Back to Map
          </Button>
          <Button
            onClick={() => {
              // Mark kelp forest as completed
              markLocationCompleted("kelp-forest");
              navigate("/map");
            }}
            variant="accent"
            size="lg"
            disabled={!selectedSound}
          >
            Continue Your Journey! 🌊
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Explore;
