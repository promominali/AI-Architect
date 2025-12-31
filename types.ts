
export interface UserBackground {
  currentRole: string;
  experienceLevel: string;
  technicalSkills: string[];
  interests: string[];
  timeCommitment: string;
}

export interface RoadmapStep {
  title: string;
  description: string;
  duration: string;
  skills: string[];
  projects: string[];
  resources: { name: string; url: string }[];
}

export interface RoadmapData {
  title: string;
  overview: string;
  steps: RoadmapStep[];
  skillDistribution: { subject: string; value: number; fullMark: number }[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
