import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/Button";
import { ModuleCard } from "@/components/ModuleCard";
import { ProgressBubbles } from "@/components/ProgressBubbles";

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const navigate = useNavigate();

  const questions = [
    {
      question: "What is a soundscape?",
      options: [
        "A picture of the ocean",
        "All the sounds in an environment",
        "A type of fish",
        "Ocean pollution"
      ],
      correct: 1,
      explanation: "A soundscape is like a picture made of sounds! Scientists use soundscapes to understand what's happening in the ocean."
    },
    {
      question: "Which sound tells us a reef is healthy?",
      options: [
        "Lots of boat engines",
        "Complete silence",
        "Snapping shrimp and chirping fish",
        "Construction noise"
      ],
      correct: 2,
      explanation: "Healthy reefs are full of life! Snapping shrimp, fish calls, and other animal sounds mean the ecosystem is thriving."
    },
    {
      question: "What tool do scientists use to record ocean sounds?",
      options: [
        "A camera",
        "A hydrophone",
        "A telescope",
        "A microscope"
      ],
      correct: 1,
      explanation: "A hydrophone is a special underwater microphone that can record sounds deep in the ocean 24 hours a day!"
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
      navigate("/summary");
    }
  };

  return (
    <div className="min-h-screen ocean-gradient py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-bubble drop-shadow-lg">
            📝 Ocean Soundscape Quiz
          </h1>
          <p className="text-xl text-bubble/90">
            Let's see what you learned!
          </p>
        </div>

        <ProgressBubbles 
          total={questions.length} 
          current={currentQuestion} 
          className="mb-8" 
        />

        <ModuleCard>
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6 text-ocean-deep">
              Question {currentQuestion + 1} of {questions.length}
            </h2>
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
                  ? "🎉 Correct!"
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
                {currentQuestion < questions.length - 1 ? "Next Question →" : "See Results! 🎊"}
              </Button>
            )}
          </div>
        </ModuleCard>
      </div>
    </div>
  );
};

export default Quiz;
