
import React from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts';

interface SkillChartProps {
  data: { subject: string; value: number; fullMark: number }[];
}

const SkillChart: React.FC<SkillChartProps> = ({ data }) => {
  return (
    <div className="w-full h-[300px] bg-slate-800/50 rounded-xl p-4 border border-slate-700">
      <h3 className="text-sm font-semibold text-slate-400 mb-2 uppercase tracking-wider">Target Proficiency</h3>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid stroke="#475569" />
          <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 12 }} />
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
          <Radar
            name="Skills"
            dataKey="value"
            stroke="#6366f1"
            fill="#6366f1"
            fillOpacity={0.6}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SkillChart;
