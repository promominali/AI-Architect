
import React, { useState } from 'react';
import { UserBackground } from '../types';

interface AssessmentFormProps {
  onSubmit: (data: UserBackground) => void;
  isLoading: boolean;
}

const AssessmentForm: React.FC<AssessmentFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<UserBackground>({
    currentRole: '',
    experienceLevel: 'Intermediate',
    technicalSkills: [],
    interests: [],
    timeCommitment: '10-15 hours/week'
  });

  const [skillInput, setSkillInput] = useState('');

  const handleAddSkill = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && skillInput.trim()) {
      e.preventDefault();
      if (!formData.technicalSkills.includes(skillInput.trim())) {
        setFormData({
          ...formData,
          technicalSkills: [...formData.technicalSkills, skillInput.trim()]
        });
      }
      setSkillInput('');
    }
  };

  const removeSkill = (skill: string) => {
    setFormData({
      ...formData,
      technicalSkills: formData.technicalSkills.filter(s => s !== skill)
    });
  };

  return (
    <div className="max-w-2xl mx-auto bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-2xl">
      <div className="mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
          Architect Your Future
        </h2>
        <p className="text-slate-400 mt-2">Tell us where you are, and we'll show you the path to the summit.</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Current Role</label>
          <input
            type="text"
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            placeholder="e.g. Senior Software Engineer"
            value={formData.currentRole}
            onChange={(e) => setFormData({ ...formData, currentRole: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Experience Level</label>
            <select
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={formData.experienceLevel}
              onChange={(e) => setFormData({ ...formData, experienceLevel: e.target.value })}
            >
              <option>Junior</option>
              <option>Intermediate</option>
              <option>Senior</option>
              <option>Lead/Manager</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Time Commitment</label>
            <select
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={formData.timeCommitment}
              onChange={(e) => setFormData({ ...formData, timeCommitment: e.target.value })}
            >
              <option>5-10 hours/week</option>
              <option>10-15 hours/week</option>
              <option>20+ hours/week</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Technical Skills (Press Enter to add)</label>
          <input
            type="text"
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            placeholder="Python, SQL, AWS, Kubernetes..."
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyDown={handleAddSkill}
          />
          <div className="flex flex-wrap gap-2 mt-3">
            {formData.technicalSkills.map(skill => (
              <span key={skill} className="bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 px-3 py-1 rounded-full text-xs flex items-center gap-2">
                {skill}
                <button onClick={() => removeSkill(skill)} className="hover:text-white transition-colors">&times;</button>
              </span>
            ))}
          </div>
        </div>

        <button
          onClick={() => onSubmit(formData)}
          disabled={isLoading || !formData.currentRole}
          className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Synthesizing Roadmap...
            </>
          ) : 'Generate My Roadmap'}
        </button>
      </div>
    </div>
  );
};

export default AssessmentForm;
