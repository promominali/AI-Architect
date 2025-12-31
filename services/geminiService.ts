
import { GoogleGenAI, Type } from "@google/genai";
import { UserBackground, RoadmapData } from "../types";

const API_KEY = process.env.API_KEY || "";

export const generateRoadmap = async (background: UserBackground): Promise<RoadmapData> => {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  const prompt = `Act as an expert AI Strategy and Solutions Architect. 
  Create a personalized intensive career roadmap for someone with this background:
  - Current Role: ${background.currentRole}
  - Experience Level: ${background.experienceLevel}
  - Current Skills: ${background.technicalSkills.join(", ")}
  - Interests: ${background.interests.join(", ")}
  - Availability: ${background.timeCommitment}
  
  Focus on the transition to an AI Architect role. Include technical (ML, MLOps, Data Eng) and strategic (System Design, ROI, Ethics) elements.`;

  const response = await ai.models.generateContent({
    model: "gemini-3-pro-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          overview: { type: Type.STRING },
          steps: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                description: { type: Type.STRING },
                duration: { type: Type.STRING },
                skills: { type: Type.ARRAY, items: { type: Type.STRING } },
                projects: { type: Type.ARRAY, items: { type: Type.STRING } },
                resources: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      name: { type: Type.STRING },
                      url: { type: Type.STRING }
                    },
                    required: ["name", "url"]
                  }
                }
              },
              required: ["title", "description", "duration", "skills", "projects", "resources"]
            }
          },
          skillDistribution: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                subject: { type: Type.STRING },
                value: { type: Type.NUMBER },
                fullMark: { type: Type.NUMBER }
              },
              required: ["subject", "value", "fullMark"]
            }
          }
        },
        required: ["title", "overview", "steps", "skillDistribution"]
      }
    }
  });

  return JSON.parse(response.text);
};

export const getMentorResponse = async (history: { role: string; text: string }[], message: string) => {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  const chat = ai.chats.create({
    model: "gemini-3-flash-preview",
    config: {
      systemInstruction: "You are an elite AI Architect Mentor. Your goal is to guide the user towards architectural mastery in AI systems. Be concise, technical where necessary, and strategic always. Provide actionable advice on systems, scaling, and team management."
    }
  });

  const response = await chat.sendMessage({ message });
  return response.text;
};
