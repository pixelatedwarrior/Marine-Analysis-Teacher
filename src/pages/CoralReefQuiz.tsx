import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/Button";
import { ModuleCard } from "@/components/ModuleCard";
import { ProgressBubbles } from "@/components/ProgressBubbles";
import { useProgression } from "@/hooks/useProgression";
import dolphinCharacter from "@/assets/dolphin-character.png";

const CoralReefQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const navigate = useNavigate();
  const { markLocationCompleted } = useProgression();

  const questions = [
    {
      question: "What is an ecosystem?",
      options: [
        "A type of fish that lives in the ocean",
        "A giant neighborhood where millions of plants and animals live together",
        "A tool scientists use to listen to ocean sounds",
        "A quiet place with no animals"
      ],
      correct: 1,
      explanation: "An ecosystem is like a giant neighborhood where millions of plants and animals live together! In the ocean, everything works together to create a healthy environment."
    },
    {
      question: "What makes a healthy ocean ecosystem?",
      options: [
        "Lots of boat noise and human activity",
        "Clean water, lots of different plants and animals, and the right balance of food",
        "Complete silence with no sounds",
        "Only one type of fish"
      ],
      correct: 1,
      explanation: "A healthy ocean ecosystem has clean water, lots of different plants and animals, and the right balance of food for everyone. When everything works together, it's like a perfect underwater orchestra!"
    },
    {
      question: "What is a soundscape in marine biology?",
      options: [
        "A picture of the ocean",
        "A collection of sounds in the ocean",
        "A type of coral",
        "A tool for measuring water temperature"
      ],
      correct: 1,
      explanation: "A soundscape is all the different sounds you would hear if you put your ear underwater, just like a land-scape is everything you would see if you looked all around you! Scientists listen to these sounds to learn about the busy underwater world and understand what's happening in the ocean."
    },
    {
      question: "What tool do scientists use to record ocean sounds 24/7?",
      options: [
        "A camera",
        "A hydrophone",
        "A telescope",
        "A microscope"
      ],
      correct: 1,
      explanation: "A hydrophone is a special underwater microphone that can record sounds deep in the ocean 24 hours a day! Scientists place them in the water to listen continuously."
    },
    {
      question: "Which sounds tell us a coral reef is healthy?",
      options: [
        "Lots of boat engines and construction noise",
        "Complete silence",
        "Snapping shrimp, chirping fish, and dolphin clicks",
        "Only human voices"
      ],
      correct: 2,
      explanation: "Healthy reefs are full of life! Snapping shrimp making popcorn-like sounds, fish grunting and chirping, waves rolling over coral, and even dolphins clicking - these all mean the ecosystem is thriving!"
    }
  ];

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowFeedback(true);
    if (answerIndex === questions[currentQuestion].correct) {
      setScore((prevScore) => prevScore + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      // Mark coral reef as completed after quiz
      markLocationCompleted("coral-reef");
      navigate("/map");
    }
  };

  return (
    <div className="min-h-screen ocean-gradient py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-bubble drop-shadow-lg">
            🪸 Coral Reef Quiz
          </h1>
          <p className="text-xl text-bubble/90">
            Let's see what you learned about coral reefs!
          </p>
        </div>

        <ProgressBubbles 
          total={questions.length} 
          current={currentQuestion} 
          className="mb-8" 
        />

        <ModuleCard>
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-6">
              <img 
                src={dolphinCharacter} 
                alt="Danny the Dolphin"
                className="w-16 h-16 object-contain animate-float"
              />
              <h2 className="text-2xl font-bold text-ocean-deep">
                Question {currentQuestion + 1} of {questions.length}
              </h2>
            </div>
            <p className="text-xl text-foreground mb-8">
              {questions[currentQuestion].question}
            </p>

            <div className="space-y-4">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => !showFeedback && handleAnswer(index)}
                  disabled={showFeedback}
                  className={`w-full p-4 rounded-2xl text-left transition-smooth ${
                    showFeedback
                      ? index === questions[currentQuestion].correct
                        ? "bg-seaweed text-white shadow-ocean"
                        : selectedAnswer === index
                        ? "bg-destructive text-white"
                        : "bg-muted text-muted-foreground"
                      : "bg-card hover:bg-primary/10 hover:scale-[1.02] shadow-card hover:shadow-float"
                  }`}
                >
                  <span className="font-semibold">
                    {String.fromCharCode(65 + index)}. {option}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {showFeedback && (
            <div className={`p-6 rounded-2xl mb-6 ${
              selectedAnswer === questions[currentQuestion].correct
                ? "bg-seaweed/10 border-2 border-seaweed"
                : "bg-accent/10 border-2 border-accent"
            }`}>
              <p className="font-bold mb-2 text-lg">
                {selectedAnswer === questions[currentQuestion].correct
                  ? "🎉 Correct! Great job!"
                  : "Not quite! 🤔"}
              </p>
              <p className="text-foreground">
                {questions[currentQuestion].explanation}
              </p>
            </div>
          )}

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Button
                onClick={() => navigate("/map")}
                variant="ghost"
                className="text-ocean-medium"
              >
                ← Map
              </Button>
              <div className="text-ocean-medium font-semibold">
                Score: {score}/{questions.length}
              </div>
            </div>
            {showFeedback && (
              <Button onClick={handleNext} variant="primary">
                {currentQuestion < questions.length - 1 ? "Next Question →" : "Complete Coral Reef! 🪸"}
              </Button>
            )}
          </div>
        </ModuleCard>
      </div>
    </div>
  );
};

export default CoralReefQuiz;

