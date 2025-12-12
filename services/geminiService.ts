
import { GoogleGenAI } from '@google/genai';
import { GEMINI_MODEL } from '../constants';
import { OperationType } from '../types';

export const generateMathStoryProblem = async (
  ageRangeLabel: string,
  operation: OperationType,
): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const model = GEMINI_MODEL;

  const systemInstruction = `You are an imaginative storyteller specializing in creating short, age-appropriate math story problems. 
    Your stories should be engaging and directly related to the math operation provided. 
    Keep the numbers simple and the scenarios relatable for the specified age group. 
    The output should be a single, concise story problem, without explicitly stating the answer.`;

  const prompt = `Create a short math story problem for ${ageRangeLabel} using the concept of ${operation}.`;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.9,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 150,
      },
    });

    return response.text;
  } catch (error) {
    console.error('Error generating math story problem:', error);
    if (error instanceof Error) {
        // Attempt to parse the error message for more specific details
        try {
            const errorDetails = JSON.parse(error.message);
            if (errorDetails.error && errorDetails.error.message) {
                // Return a more user-friendly message based on common API errors
                if (errorDetails.error.message.includes('API key not valid')) {
                    return 'Oops! There was an issue with the AI service. Please ensure your API key is correctly configured.';
                }
                return `Failed to generate story problem: ${errorDetails.error.message}`;
            }
        } catch (parseError) {
            // Not a JSON error, return generic message
        }
    }
    return 'Failed to generate a story problem. Please try again.';
  }
};
