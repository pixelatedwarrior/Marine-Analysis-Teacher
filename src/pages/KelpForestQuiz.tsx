import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/Button";
import { ModuleCard } from "@/components/ModuleCard";
import { ProgressBubbles } from "@/components/ProgressBubbles";
import { useProgression } from "@/hooks/useProgression";
import dolphinCharacter from "@/assets/dolphin-character.png";

const KelpForestQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const navigate = useNavigate();
  const { markLocationCompleted } = useProgression();

  const questions = [
    {
      question: "What is a kelp forest?",
      options: [
        "A type of fish that lives in the ocean",
        "An underwater ecosystem made of giant seaweeds that can grow up to 200 feet tall",
        "A tool scientists use to listen to ocean sounds",
        "A quiet place with no animals"
      ],
      correct: 1,
      explanation: "A kelp forest is an underwater ecosystem made of giant seaweeds! These amazing plants can grow up to 200 feet tall and create homes for thousands of marine animals."
    },
    {
      question: "What makes a healthy kelp forest?",
      options: [
        "Lots of boat noise and human activity",
        "Cool, nutrient-rich water, lots of different animals, and tall, swaying kelp",
        "Complete silence with no sounds",
        "Only one type of fish"
      ],
      correct: 1,
      explanation: "A healthy kelp forest has cool, nutrient-rich water, lots of different plants and animals living together, and tall, healthy kelp that sways in the currents!"
    },
    {
      question: "What sounds can you hear in a healthy kelp forest?",
      options: [
        "Lots of boat engines and construction noise",
        "Complete silence",
        "Sea otters cracking shells, fish swimming, and kelp swaying",
        "Only human voices"
      ],
      correct: 2,
      explanation: "Healthy kelp forests are full of life! You can hear sea otters cracking shells, fish swimming and feeding, kelp swaying in the currents, and the gentle sounds of waves above."
    },
    {
      question: "Why do scientists listen to kelp forest soundscapes?",
      options: [
        "To count how many fish are there",
        "To understand the health of the ecosystem without disturbing it",
        "To find treasure",
        "To measure water temperature"
      ],
      correct: 1,
      explanation: "Scientists use hydrophones to listen to kelp forest soundscapes 24/7! This helps them understand the ecosystem's health without having to dive down and count every animal."
    },
    {
      question: "What might indicate a kelp forest is in trouble?",
      options: [
        "Lots of animal sounds and activity",
        "Very few animal sounds, lots of boat noise, or missing kelp sounds",
        "Gentle waves and kelp swaying",
        "Sea otters cracking shells"
      ],
      correct: 1,
      explanation: "If a kelp forest is stressed, you might hear very few animal sounds, lots of boat noise, or notice the kelp sounds are missing. Pollution and warming waters can harm these amazing ecosystems."
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
      // Mark kelp forest as completed after quiz
      markLocationCompleted("kelp-forest");
      navigate("/map");
    }
  };

  return (
    <div className="min-h-screen ocean-gradient py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-bubble drop-shadow-lg">
            🌿 Kelp Forest Quiz
          </h1>
          <p className="text-xl text-bubble/90">
            Let's see what you learned about kelp forests!
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
                {currentQuestion < questions.length - 1 ? "Next Question →" : "Complete Kelp Forest! 🌿"}
              </Button>
            )}
          </div>
        </ModuleCard>
      </div>
    </div>
  );
};

export default KelpForestQuiz;