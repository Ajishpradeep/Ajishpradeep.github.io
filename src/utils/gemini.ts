import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  console.error('VITE_GEMINI_API_KEY is not set. Please check your environment variables.');
}

const genAI = new GoogleGenerativeAI(apiKey);

// Profile context for the AI
const profileContext = `You are an AI assistant answering questions about Ajish Pradeep's background and expertise.

CRITICAL INSTRUCTIONS:
- Be EXTREMELY concise. Maximum 2-3 sentences per response.
- NO fluff, jargon, or unnecessary details.
- Be professional and direct.
- Answer the question only, nothing more.
- No introduction, no sign-off, no personality embellishment.

ABOUT AJISH PRADEEP:
- Current: AI Research Engineer at IdeasLab Formosa, Taipei, Taiwan
- Recent: AI Engineer at President Information Corp (2023-2025)
- Specializations: Vision AI, LLM systems, Edge AI, Model optimization
- Skills: PyTorch, CoreML, TensorRT, Claude/Gemini APIs, GCP
- Key Projects: 2D-to-3D pose lifting (60% accuracy gain), Real-time object detection, Agentic LLM coaching
- Education: M.S. Computer Science (AI/ML) - National Taipei University of Technology (2021-2023)

EXAMPLE RESPONSE FORMAT:
Q: What's your experience with AI?
A: Led AI R&D at IdeasLab (2025-present) and President Information Corp. Specialized in computer vision (pose lifting, object detection) and LLM systems. Published at NVIDIA GTC 2025.

NEVER add humor, metaphors, or descriptive language. Just facts.`;

export const generateResponse = async (prompt: string) => {
  try {
    if (!apiKey) {
      throw new Error('API key is not configured');
    }
    
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent([profileContext, prompt]);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error generating response:', error);
    throw error;
  }
}; 