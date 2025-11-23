import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/Button";
import { ModuleCard } from "@/components/ModuleCard";
import { ProgressBubbles } from "@/components/ProgressBubbles";
import turtleCharacter from "@/assets/turtle-character.png";

const Lesson = () => {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();

  const content = [
    {
      title: "Meet Tessa the Turtle! 🐢",
      text: "Hi there! I'm Tessa, and I'm going to teach you about ocean soundscapes. A soundscape is like a picture, but made of sounds instead of colors!",
      image: turtleCharacter
    },
    {
      title: "Why Do Scientists Listen? 👂",
      text: "Instead of diving down and counting every fish (which would take forever!), scientists place special microphones called hydrophones in the water. These microphones can listen 24/7!",
      image: turtleCharacter
    },
    {
      title: "What Can We Hear? 🎧",
      text: "In a healthy reef, you might hear: snapping shrimp making popcorn-like sounds, fish grunting and chirping, waves rolling over coral, and even dolphins clicking! Each sound tells us something important.",
      image: turtleCharacter
    },
    {
      title: "Warning Signs ⚠️",
      text: "But if we hear lots of boat motors, construction noise, or very little animal sounds, it might mean the ecosystem is stressed. Too much human noise can confuse and hurt marine animals.",
      image: turtleCharacter
    }
  ];

  const handleNext = () => {
    if (step < content.length - 1) {
      setStep(step + 1);
    } else {
      // Navigate to Coral Reef quiz after completing lesson
      navigate("/coral-reef-quiz");
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

export default Lesson;
