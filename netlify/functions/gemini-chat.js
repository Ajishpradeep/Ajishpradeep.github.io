const { GoogleGenerativeAI } = require("@google/generative-ai");

exports.handler = async (event) => {
    try {
        // Only allow POST requests
        if (event.httpMethod !== "POST") {
            return {
                statusCode: 405,
                body: JSON.stringify({ error: "Method Not Allowed" }),
            };
        }

        // Parse the request body
        const { message } = JSON.parse(event.body);

        if (!message) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: "Message is required" }),
            };
        }

        // Initialize the Google Generative AI with API key from environment variables
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

        // Prepare the contents with the system prompt and user query
        const contents = [
            {
                role: "user",
                parts: [
                    {
                        text: `
            You are Ajish's AI assistant embedded in his portfolio website. Your name is Jarvis.
            You should be helpful, friendly, and professional but with a playful character.
            You should answer questions about Ajish's portfolio, skills, experience, and background.
            
            Here's information about Ajish:
            - He's an AI Engineer and Researcher based in Taipei, Taiwan
            - He specializes in Vision AI, Generative AI, and LLM optimization
            - He works at President Information Corp as an AI Engineer
            - He presented a poster at NVIDIA GTC 2025 on scalable AI innovation
            - He has expertise in PyTorch, TensorFlow, Transformers, and Diffusion Models
            - He has a Master's in Electrical Engineering and Computer Science from National Taipei University of Technology
            - He previously worked as a Software Developer at AIBS Software Solutions in India
            
            If you don't know the answer to a question, you can say "I don't have that specific information about Ajish, but I can tell you about his skills and experience in AI engineering."
            
            Keep your responses concise and engaging. Use emojis occasionally to add personality.
            
            Now, please respond to this query: ${message}
          `,
                    },
                ],
            },
        ];

        // Generate content using Gemini API
        const result = await model.generateContent({
            contents,
        });

        const responseText = result.response.text();

        // Return the chatbot's response
        return {
            statusCode: 200,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ reply: responseText }),
        };
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({
                error: "Failed to get response from chatbot",
                details: error.message
            }),
        };
    }
}; 