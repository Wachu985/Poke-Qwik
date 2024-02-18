// const { GoogleGenerativeAI } = require("@google/generative-ai");
import { GoogleGenerativeAI } from "@google/generative-ai";

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(import.meta.env.PUBLIC_GEMINI_AI_KEY);

export const getFunFactAboutPokemon = async (
  pokemonName: string,
): Promise<string> => {
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `Estoy haciendo una web sobre pokemones y necesito solamente una breve descripcion del pokemon q voy a mandar a continuacion: ${pokemonName} no debe pasar de 60 palabras`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  return text || `No tengo nada sobre ${pokemonName}, lo siento...`;
};
