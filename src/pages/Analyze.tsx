import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/Button";
import { ModuleCard } from "@/components/ModuleCard";
import { useProgression } from "@/hooks/useProgression";

const Analyze = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState<any>(null);
  const navigate = useNavigate();
  const { markLocationCompleted } = useProgression();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      setResults(null);
    }
  };

  const handleAnalyze = () => {
    setAnalyzing(true);
    // Simulate AI analysis
    setTimeout(() => {
      setResults({
        animalSounds: 45,
        humanNoise: 15,
        naturalAmbient: 40,
        healthScore: 75,
        detected: ["Snapping Shrimp", "Fish Calls", "Wave Action", "Distant Boat"]
      });
      setAnalyzing(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen ocean-gradient py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-bubble drop-shadow-lg">
            🔬 Hands-On Analysis Lab
          </h1>
          <p className="text-xl text-bubble/90 max-w-2xl mx-auto">
            Upload your own ocean recording or use one of our examples to see what our AI can detect!
          </p>
        </div>

        <ModuleCard className="mb-8">
          <h2 className="text-2xl font-bold mb-6 text-ocean-deep">
            Step 1: Choose Your Sound
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="border-2 border-dashed border-primary rounded-2xl p-8 text-center hover:border-teal transition-smooth cursor-pointer">
              <label htmlFor="file-upload" className="cursor-pointer">
                <div className="text-4xl mb-4">📤</div>
                <p className="font-semibold text-ocean-deep mb-2">Upload Your Recording</p>
                <p className="text-sm text-muted-foreground">WAV, MP3, or M4A files</p>
                <input
                  id="file-upload"
                  type="file"
                  accept="audio/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>
            <div className="border-2 border-primary rounded-2xl p-8 text-center hover:border-teal transition-smooth cursor-pointer">
              <div className="text-4xl mb-4">🎵</div>
              <p className="font-semibold text-ocean-deep mb-2">Use Example Sound</p>
              <p className="text-sm text-muted-foreground">Pre-loaded reef recording</p>
            </div>
          </div>
          {uploadedFile && (
            <div className="mt-6 p-4 bg-teal/10 rounded-xl text-center">
              <p className="text-ocean-deep">✅ File ready: <span className="font-semibold">{uploadedFile.name}</span></p>
            </div>
          )}
        </ModuleCard>

        {(uploadedFile || true) && (
          <ModuleCard className="mb-8">
            <h2 className="text-2xl font-bold mb-6 text-ocean-deep">
              Step 2: Analyze the Soundscape
            </h2>
            <div className="flex justify-center">
              <Button
                onClick={handleAnalyze}
                variant="accent"
                size="lg"
                disabled={analyzing}
              >
                {analyzing ? "🔄 Analyzing..." : "🤖 Run AI Analysis"}
              </Button>
            </div>
          </ModuleCard>
        )}

        {results && (
          <ModuleCard variant="ocean" className="text-bubble">
            <h2 className="text-2xl font-bold mb-6">
              📊 Analysis Results
            </h2>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-background/20 rounded-xl p-6 text-center backdrop-blur">
                <div className="text-4xl font-bold mb-2">{results.animalSounds}%</div>
                <div className="text-sm">Animal Sounds</div>
              </div>
              <div className="bg-background/20 rounded-xl p-6 text-center backdrop-blur">
                <div className="text-4xl font-bold mb-2">{results.humanNoise}%</div>
                <div className="text-sm">Human Noise</div>
              </div>
              <div className="bg-background/20 rounded-xl p-6 text-center backdrop-blur">
                <div className="text-4xl font-bold mb-2">{results.naturalAmbient}%</div>
                <div className="text-sm">Natural Ambient</div>
              </div>
            </div>
            <div className="bg-background/20 rounded-xl p-6 backdrop-blur mb-6">
              <h3 className="font-bold mb-3">🎵 Detected Sounds:</h3>
              <div className="flex flex-wrap gap-2">
                {results.detected.map((sound: string, index: number) => (
                  <span key={index} className="bg-teal/30 px-4 py-2 rounded-full text-sm">
                    {sound}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-seaweed/20 rounded-xl p-6 text-center backdrop-blur">
              <div className="text-3xl font-bold mb-2">
                Health Score: {results.healthScore}/100
              </div>
              <p className="text-sm">
                {results.healthScore >= 70 ? "🎉 This sounds like a healthy ecosystem!" : 
                 results.healthScore >= 40 ? "⚠️ This ecosystem might be under stress..." : 
                 "😟 This ecosystem needs help!"}
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
              // Mark open ocean as completed when results are shown
              if (results) {
                markLocationCompleted("open-ocean");
              }
              navigate("/map");
            }}
            variant="primary"
            size="lg"
            disabled={!results}
          >
            Continue Your Journey! 🌊
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Analyze;
