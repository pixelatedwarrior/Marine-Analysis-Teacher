import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/Button";
import { ModuleCard } from "@/components/ModuleCard";
import { ProgressBubbles } from "@/components/ProgressBubbles";
import turtleCharacter from "@/assets/turtle-character.png";

const KelpForestLesson = () => {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();

  const content = [
    {
      title: "Meet Tessa the Turtle! 🐢",
      text: "Hi there! I'm Tessa, and I'm going to teach you about kelp forest soundscapes. Kelp forests are amazing underwater ecosystems that create unique sounds we can study!",
      image: turtleCharacter
    },
    {
      title: "Why Are Kelp Forests Important? 🌿",
      text: "Kelp forests are like underwater rainforests! They provide food, shelter, and protection for many marine animals. Scientists listen to their sounds to understand how healthy these ecosystems are.",
      image: turtleCharacter
    },
    {
      title: "What Can We Hear in Kelp Forests? 🎧",
      text: "In a healthy kelp forest, you might hear: sea otters cracking shells, fish swimming and feeding, kelp swaying in the currents, and the gentle sounds of waves above. Each sound tells us about the ecosystem's health!",
      image: turtleCharacter
    },
    {
      title: "Warning Signs in Kelp Forests ⚠️",
      text: "If we hear very few animal sounds, lots of boat noise, or notice the kelp sounds are missing, it might mean the ecosystem is stressed. Pollution and warming waters can harm kelp forests.",
      image: turtleCharacter
    }
  ];

  const handleNext = () => {
    if (step < content.length - 1) {
      setStep(step + 1);
    } else {
      navigate("/kelp-forest-quiz");
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
        <ProgressBubbles total={4} current={step} className="mb-8" />
        
        <ModuleCard className="bg-card/95 backdrop-blur">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-ocean-deep">
                {content[step].title}
              </h2>
              <p className="text-lg text-foreground leading-relaxed">
                {content[step].text}
              </p>
            </div>
            <div className="flex justify-center">
              <img 
                src={content[step].image} 
                alt="Tessa the Turtle"
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
                  ← Map
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
              {step < content.length - 1 ? "Next →" : "Take the Quiz! 📝"}
            </Button>
          </div>
        </ModuleCard>
      </div>
    </div>
  );
};

export default KelpForestLesson;