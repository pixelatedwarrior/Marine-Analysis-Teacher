import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/Button";
import { ModuleCard } from "@/components/ModuleCard";
import { ProgressBubbles } from "@/components/ProgressBubbles";
import dolphinCharacter from "@/assets/dolphin-character.png";

const Intro = () => {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();

  const content = [
    {
      title: "Welcome to the Ocean! 🌊",
      text: "I'm Danny the Dolphin, and I'll be your guide today! The ocean is like a giant neighborhood where millions of plants and animals live together. This is called an ecosystem!",
      image: dolphinCharacter
    },
    {
      title: "What Makes an Ecosystem Healthy? 🐠",
      text: "A healthy ocean ecosystem has clean water, lots of different plants and animals, and the right balance of food for everyone. When everything works together, it's like a perfect underwater orchestra!",
      image: dolphinCharacter
    },
    {
      title: "The Secret Language of the Ocean 🎵",
      text: "Did you know the ocean is actually quite noisy? Fish crackle, whales sing, shrimp snap, and coral reefs hum with life! Scientists can listen to these sounds to tell if an ecosystem is healthy.",
      image: dolphinCharacter
    }
  ];

  const handleNext = () => {
    if (step < content.length - 1) {
      setStep(step + 1);
    } else {
      navigate("/lesson");
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  return (
    <div className="min-h-screen ocean-gradient py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <ProgressBubbles total={3} current={step} className="mb-8" />
        
        <ModuleCard className="bg-card/95 backdrop-blur">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-ocean-deep">
                {content[step].title}
              </h2>
              <p className="text-lg text-foreground leading-relaxed">
                {content[step].text}
              </p>
            </div>
            <div className="order-1 md:order-2 flex justify-center">
              <img 
                src={content[step].image} 
                alt="Danny the Dolphin"
                className="w-64 h-64 object-contain animate-float drop-shadow-lg"
              />
            </div>
          </div>

          <div className="flex justify-between mt-12">
            <div className="flex gap-4">
              {step === 0 && (
                <Button
                  onClick={() => navigate("/map")}
                  variant="ghost"
                  className="text-ocean-medium"
                >
                  ← Back to Map
                </Button>
              )}
              <Button
                onClick={handleBack}
                variant="ghost"
                disabled={step === 0}
                className="text-ocean-medium"
              >
                ← Back
              </Button>
            </div>
            <Button
              onClick={handleNext}
              variant="primary"
            >
              {step < content.length - 1 ? "Next →" : "Let's Learn About Sound! 🎵"}
            </Button>
          </div>
        </ModuleCard>
      </div>
    </div>
  );
};

export default Intro;
