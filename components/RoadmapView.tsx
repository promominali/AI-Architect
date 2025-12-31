
import React from 'react';
import { RoadmapData } from '../types';
import SkillChart from './SkillChart';
import { CheckCircle2, BookOpen, Layers, Rocket } from 'lucide-react';

interface RoadmapViewProps {
  data: RoadmapData;
}

const RoadmapView: React.FC<RoadmapViewProps> = ({ data }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Left Column: Summary & Chart */}
      <div className="lg:col-span-4 space-y-6">
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl sticky top-8">
          <h2 className="text-2xl font-bold text-white mb-4">{data.title}</h2>
          <p className="text-slate-400 text-sm leading-relaxed mb-6">
            {data.overview}
          </p>
          <SkillChart data={data.skillDistribution} />
          
          <div className="mt-8 space-y-4">
            <h4 className="text-xs font-bold uppercase text-slate-500 tracking-widest">Architect Milestones</h4>
            <div className="space-y-3">
              {data.steps.map((step, idx) => (
                <div key={idx} className="flex items-center gap-3 text-slate-300">
                  <div className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-[10px] text-slate-500 font-bold">
                    {idx + 1}
                  </div>
                  <span className="text-sm truncate">{step.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Detailed Steps */}
      <div className="lg:col-span-8 space-y-8">
        {data.steps.map((step, idx) => (
          <div key={idx} className="relative bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500"></div>
            <div className="p-8">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-1 block">Phase {idx + 1}</span>
                  <h3 className="text-2xl font-bold text-white">{step.title}</h3>
                </div>
                <div className="bg-slate-800 px-4 py-1.5 rounded-full text-xs font-medium text-slate-300 border border-slate-700">
                  {step.duration}
                </div>
              </div>

              <p className="text-slate-400 mb-8 leading-relaxed">
                {step.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-indigo-400">
                    <Layers size={18} />
                    <span className="text-sm font-semibold uppercase tracking-wider">Key Skills</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {step.skills.map(skill => (
                      <span key={skill} className="bg-slate-800 text-slate-300 px-3 py-1 rounded-md text-xs border border-slate-700">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-cyan-400">
                    <Rocket size={18} />
                    <span className="text-sm font-semibold uppercase tracking-wider">Practical Projects</span>
                  </div>
                  <ul className="space-y-2">
                    {step.projects.map((project, pIdx) => (
                      <li key={pIdx} className="text-slate-400 text-sm flex gap-3">
                        <CheckCircle2 size={14} className="text-slate-600 mt-1 flex-shrink-0" />
                        {project}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-slate-800/50">
                <div className="flex items-center gap-2 text-emerald-400 mb-4">
                  <BookOpen size={18} />
                  <span className="text-sm font-semibold uppercase tracking-wider">Recommended Resources</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {step.resources.map((res, rIdx) => (
                    <a
                      key={rIdx}
                      href={res.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 p-3 rounded-lg transition-all"
                    >
                      <span className="text-slate-300 text-sm group-hover:text-white transition-colors">{res.name}</span>
                      <svg className="w-4 h-4 text-slate-500 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoadmapView;
