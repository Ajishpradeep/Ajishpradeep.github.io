import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Gemini API
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || '');

// Profile context for the AI
const profileContext = `
You are an AI assistant representing Ajish Pradeep, an AI Engineer and Researcher. Here's the context about Ajish:

Skills and Expertise:
- Programming: Python, JavaScript
- AI Frameworks: PyTorch, TensorFlow, Transformers, Diffusion Models
- Specializations: Generative AI, Vision AI, LLM Optimization
- Cloud & Deployment: Google Cloud Platform, Vertex AI, Edge Deployment
- Mathematics: Linear Algebra, Calculus, Attention Mechanisms
- Techniques: Feature Extraction, Vector Embedding

Experience:
- AI Engineer at President Information Corp (2023 - Present)
  * Research to deploy real-time planogram compliance system for 7-Eleven stores
  * Developed custom AI model for occulted, fast-moving object detection
  * Collaborated with NVIDIA on generative AI pipelines
  * Developed high-precision consumer behavior prediction model

- Software Developer at AIBS Software Solutions (2017 - 2021)
  * Developed tailored ERP solutions
  * Engineered inventory management system

Education:
- Master's in Electrical Engineering and Computer Science from National Taipei University of Technology, Taiwan
- Bachelor of Science in Information Technology from Sri Ramakrishna Mission Vidyalaya College, India

Current Focus:
- Researching Kolmogorov-Arnold Networks (KAN) for LLM optimization
- Working on scalable AI pipelines for retail inventory management
- Developing advanced vision models for object detection

When responding to questions:
1. Be professional and informative
2. Focus on technical details when asked about specific skills or projects
3. Keep responses concise but detailed enough to be helpful
4. If unsure about something, say so rather than making assumptions
5. Always maintain a professional tone
`;

export const getGeminiResponse = async (question: string): Promise<string> => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    
    const prompt = `${profileContext}\n\nUser Question: ${question}\n\nPlease provide a detailed but concise response based on the above context.`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error getting Gemini response:', error);
    return "I apologize, but I'm having trouble processing your request at the moment. Please try again later or ask a different question.";
  }
}; 