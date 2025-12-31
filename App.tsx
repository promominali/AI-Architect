
import React, { useState } from 'react';
import { UserBackground, RoadmapData } from './types';
import AssessmentForm from './components/AssessmentForm';
import RoadmapView from './components/RoadmapView';
import MentorBot from './components/MentorBot';
import { generateRoadmap } from './services/geminiService';
import { Cpu, ChevronLeft, Layout } from 'lucide-react';

const App: React.FC = () => {
  const [roadmap, setRoadmap] = useState<RoadmapData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [view, setView] = useState<'form' | 'roadmap'>('form');

  const handleGenerate = async (background: UserBackground) => {
    setIsLoading(true);
    try {
      const data = await generateRoadmap(background);
      setRoadmap(data);
      setView('roadmap');
    } catch (error) {
      console.error("Error generating roadmap:", error);
      alert("Failed to generate roadmap. Please check your network or try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      {/* Navigation */}
      <nav className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <Cpu className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight text-white">AI Architect <span className="text-indigo-500">Forge</span></h1>
                <p className="text-[10px] text-slate-500 font-mono font-medium uppercase tracking-[0.2em]">Engineering Professional Excellence</p>
              </div>
            </div>
            
            {view === 'roadmap' && (
              <button 
                onClick={() => setView('form')}
                className="flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white transition-colors"
              >
                <ChevronLeft size={18} />
                Generate New
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {view === 'form' ? (
          <div className="space-y-12">
            <div className="text-center space-y-4 max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"></span>
                The Standard for AI Leadership
              </div>
              <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight text-white leading-tight">
                Master the Art of <span className="bg-gradient-to-r from-indigo-500 via-blue-400 to-cyan-400 bg-clip-text text-transparent">AI Architecture</span>
              </h1>
              <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                Transition from software developer to AI architect with personalized roadmaps, skill visualization, and expert mentorship.
              </p>
            </div>
            <AssessmentForm onSubmit={handleGenerate} isLoading={isLoading} />
          </div>
        ) : (
          <div className="animate-in fade-in zoom-in-95 duration-500">
            {roadmap && <RoadmapView data={roadmap} />}
          </div>
        )}
      </main>

      {/* Floating Mentor Bot */}
      <MentorBot />

      {/* Footer */}
      <footer className="mt-24 border-t border-slate-800 py-12 bg-slate-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-6 opacity-50">
             <Layout size={20} className="text-indigo-500" />
             <span className="font-bold tracking-wider uppercase text-xs">Architectural Excellence</span>
          </div>
          <p className="text-slate-500 text-sm">
            Powered by Gemini AI • Built for the next generation of AI Leaders
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
