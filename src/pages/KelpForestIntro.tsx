import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/Button";
import { ModuleCard } from "@/components/ModuleCard";
import { ProgressBubbles } from "@/components/ProgressBubbles";
import dolphinCharacter from "@/assets/dolphin-character.png";
import seaOtterCharacter from "@/assets/KaitheSeaOtter.png";

const KelpForestIntro = () => {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();

  const content = [
    {
      title: "Welcome to the Kelp Forest! 🌿",
      text: "I'm Kai the Sea Otter, and this part of our journey takes place in the swaying kelp forests! These underwater forests are like giant green playgrounds where animals hide, hunt, play and-most importantly-communicate!",
      image: seaOtterCharacter
    },
    {
      title: "What is a Kelp Forest? 🌊",
      text: "Kelp forests are made of giant seaweeds that can grow up to 200 feet tall! They grow in cool, nutrient-rich waters and provide homes for thousands of different animals.",
      image: seaOtterCharacter
    },
    {
      title: "The Sounds of the Kelp Forest 🎵",
      text: "Just like coral reefs, kelp forests have their own unique soundscape! You'll hear sea otters cracking shells, fish swimming through the kelp, and the gentle swaying of the kelp itself.",
      image: dolphinCharacter
    }
  ];

  const handleNext = () => {
    if (step < content.length - 1) {
      setStep(step + 1);
    } else {
      navigate("/kelp-forest-lesson");
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
                alt={step === 2 ? "Danny the Dolphin" : "Kai the Sea Otter"}
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
              {step < content.length - 1 ? "Next →" : "Let's Learn About Kelp Forests! 🌿"}
            </Button>
          </div>
        </ModuleCard>
      </div>
    </div>
  );
};

export default KelpForestIntro;