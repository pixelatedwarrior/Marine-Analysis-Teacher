import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProgressionProvider } from "@/hooks/useProgression";
import Homepage from "./pages/Homepage";
import Hero from "./pages/Hero";
import OceanMapPage from "./pages/OceanMapPage";
import Intro from "./pages/Intro";
import Lesson from "./pages/Lesson";
import CoralReefQuiz from "./pages/CoralReefQuiz";
import Explore from "./pages/Explore";
import Analyze from "./pages/Analyze";
import Quiz from "./pages/Quiz";
import Summary from "./pages/Summary";
import NotFound from "./pages/NotFound";
import KelpForestIntro from "./pages/KelpForestIntro";
import KelpForestLesson from "./pages/KelpForestLesson";
import KelpForestQuiz from "./pages/KelpForestQuiz";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <ProgressionProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/hero" element={<Hero />} />
            <Route path="/map" element={<OceanMapPage />} />
            <Route path="/intro" element={<Intro />} />
            <Route path="/lesson" element={<Lesson />} />
            <Route path="/coral-reef-quiz" element={<CoralReefQuiz />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/analyze" element={<Analyze />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/summary" element={<Summary />} />
            <Route path="/kelp-forest-intro" element={<KelpForestIntro />} />
            <Route path="/kelp-forest-lesson" element={<KelpForestLesson />} />
            <Route path="/kelp-forest-quiz" element={<KelpForestQuiz />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ProgressionProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
