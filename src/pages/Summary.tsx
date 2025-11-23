import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/Button";
import { ModuleCard } from "@/components/ModuleCard";
import { useProgression } from "@/hooks/useProgression";
import dolphinCharacter from "@/assets/dolphin-character.png";
import turtleCharacter from "@/assets/turtle-character.png";

const Summary = () => {
  const navigate = useNavigate();
  const { markLocationCompleted } = useProgression();

  // Mark deep sea as completed when summary page loads
  useEffect(() => {
    markLocationCompleted("deep-sea");
  }, [markLocationCompleted]);

  return (
    <div className="min-h-screen ocean-gradient py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-bubble drop-shadow-lg animate-float">
            🎊 Amazing Work, Ocean Explorer!
          </h1>
          <p className="text-xl text-bubble/90">
            You've completed your journey through marine soundscapes!
          </p>
        </div>

        <ModuleCard className="mb-8">
          <div className="text-center">
            <div className="flex justify-center gap-8 mb-8">
              <img 
                src={dolphinCharacter} 
                alt="Danny the Dolphin"
                className="w-32 h-32 object-contain animate-float"
              />
              <img 
                src={turtleCharacter} 
                alt="Tessa the Turtle"
                className="w-32 h-32 object-contain animate-float"
                style={{ animationDelay: "0.5s" }}
              />
            </div>
            
            <h2 className="text-3xl font-bold mb-6 text-ocean-deep">
              What You Learned Today 🌊
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6 text-left mb-8">
              <div className="bg-teal/10 rounded-2xl p-6">
                <div className="text-3xl mb-3">🐠</div>
                <h3 className="font-bold text-lg mb-2 text-ocean-deep">Marine Ecosystems</h3>
                <p className="text-foreground/80">
                  You learned what makes ocean communities healthy and how all the creatures work together!
                </p>
              </div>
              
              <div className="bg-teal/10 rounded-2xl p-6">
                <div className="text-3xl mb-3">🎵</div>
                <h3 className="font-bold text-lg mb-2 text-ocean-deep">Ocean Soundscapes</h3>
                <p className="text-foreground/80">
                  You discovered how scientists use sound to understand ocean health without disturbing marine life.
                </p>
              </div>
              
              <div className="bg-teal/10 rounded-2xl p-6">
                <div className="text-3xl mb-3">🔬</div>
                <h3 className="font-bold text-lg mb-2 text-ocean-deep">Audio Analysis</h3>
                <p className="text-foreground/80">
                  You used AI to identify different sounds and learned what they mean for ecosystem health!
                </p>
              </div>
              
              <div className="bg-teal/10 rounded-2xl p-6">
                <div className="text-3xl mb-3">⚠️</div>
                <h3 className="font-bold text-lg mb-2 text-ocean-deep">Conservation</h3>
                <p className="text-foreground/80">
                  You learned how human noise affects marine animals and why protecting ocean soundscapes matters.
                </p>
              </div>
            </div>
          </div>
        </ModuleCard>

        <ModuleCard variant="coral" className="text-accent-foreground mb-8">
          <h2 className="text-2xl font-bold mb-4 text-center">
            🌟 Keep Exploring!
          </h2>
          <p className="text-center text-lg mb-6">
            The ocean has so many more secrets to discover. Keep learning about marine life and how we can protect our oceans for future generations!
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              onClick={() => navigate("/explore")}
              variant="secondary"
            >
              🎧 Listen to More Soundscapes
            </Button>
            <Button
              onClick={() => navigate("/analyze")}
              variant="secondary"
            >
              🔬 Analyze Another Sound
            </Button>
            <Button
              onClick={() => navigate("/map")}
              variant="primary"
            >
              🗺️ View Your Map
            </Button>
          </div>
        </ModuleCard>

        <div className="text-center text-bubble/70 text-sm">
          <p>Built with 💙 for young ocean explorers everywhere</p>
        </div>
      </div>
    </div>
  );
};

export default Summary;
