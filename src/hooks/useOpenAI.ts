import OpenAI from "openai";
import { useState } from "react";
import { Movie } from "../types";

const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

interface OpenAIHookParams {
  maxRetries?: number;
  onError?: (error: Error) => void;
}

export const DEFAULT_SEARCH_PROMPT = `1. The complete plot summary
2. Key characters and their arcs
3. Significant scenes and turning points
4. Major themes and messages
5. Cultural impact and critical reception`;

export const DEFAULT_QUESTION_PROMPT = `- Write in the voice of a quiet, trustworthy companion—like an old friend who listens more than they speak. 
- Use simple words with subtle depth, leaving room for personal interpretation. 
- Use references to specific scenes, characters, soundtracks, or cinematic elements to gently prompt personal recollection. 
- Help the user recall how they felt while watching, without analyzing or judging. 
- Do not mention the movie title. Use open-ended questions only. 
- When referring name of musics, books, do not translation them
- Keep each question under 50 tokens.`;

const buildPrompt = (
  movieInfo: Movie,
  numQuestions: number,
  language: string
) => {
  const {
    title,
    release_date,
    overview,
    genres,
    runtime,
    production_companies,
  } = movieInfo;

  // Customize for language
  const languageInstructions = `Generate ${numQuestions} questions in ${language} about the movie "${title}" (${release_date}).`;

  // Movie description
  const movieDescription = `
    Movie Information:
    - Title: ${title}
    - Year: ${release_date}
    - Overview: ${overview}
    - Genres: ${genres.join(", ")}
    ${runtime ? `- Runtime: ${runtime} minutes` : ""}
    ${
      production_companies && production_companies.length > 0
        ? `- Production Companies: ${production_companies.join(", ")}`
        : ""
    }
    `;

  // Search directive
  const searchDirective = DEFAULT_SEARCH_PROMPT.replace(
    /\\{MOVIE_TITLE\\}/g,
    title
  ).replace(/\\{MOVIE_YEAR\\}/g, release_date || "");

  // Question directive
  const questionDirective = DEFAULT_QUESTION_PROMPT.replace(
    /\\{NUM_QUESTIONS\\}/g,
    numQuestions.toString()
  ).replace(/\\{LANGUAGE\\}/g, language);

  return `${languageInstructions}

${movieDescription}

SEARCH INFORMATION:
${searchDirective}

QUESTION CREATION:
${questionDirective}

Response MUST be a valid JSON object with the format: {"questions": ["Q1", "Q2", ...]}`;
};

export const useOpenAI = ({
  maxRetries = 3,
  onError,
}: OpenAIHookParams = {}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [isRetrying, setIsRetrying] = useState(false);
  const [generatedPrompt, setGeneratedPrompt] = useState<string>("");

  const getOpenAIClient = () => {
    if (!API_KEY) {
      throw new Error("OpenAI API key not found");
    }

    return new OpenAI({
      apiKey: API_KEY,
      dangerouslyAllowBrowser: true,
    });
  };

  interface GenerationResult {
    success: boolean;
    questions?: string[];
    error?: Error;
    tokenUsage?: {
      promptTokens: number;
      completionTokens: number;
      totalTokens: number;
      model: string;
    };
  }

  const generateWithRetry = async (
    movieInfo: Movie,
    numQuestions: number,
    language: string,
    model: "gpt-4o-mini-search-preview" | "gpt-4o-search-preview",
    history: string[] = [],
    retry = false
  ): Promise<GenerationResult> => {
    const userPrompt = buildPrompt(movieInfo, numQuestions, language);

    // If it's not a retry, reset states
    if (!retry) {
      setIsGenerating(true);
      setRetryCount(0);
      setGeneratedPrompt(buildPrompt(movieInfo, numQuestions, language));
    } else {
      setIsRetrying(true);
      console.log(`Retry attempt ${retryCount + 1} of ${maxRetries}...`);
    }

    try {
      const openai = getOpenAIClient();

      // Calculate pricing factors based on the selected model
      //   const pricingInfo = modelPricingInfo[model];

      // Create a clear system prompt that ensures proper JSON response format
      const systemPrompt =
        'You are a helpful AI that creates thought-provoking questions about movies. Use web search to find accurate information about movies before generating questions. Your response MUST be a valid JSON object with the exact format: { "questions": ["Question 1", "Question 2", ...] }. Make sure to use double quotes around all keys and string values.';

      const completion = await openai.chat.completions.create({
        model: model,
        messages: [
          ...history.map(
            (question) => ({ role: "system", content: question } as const)
          ),
          {
            role: "system",
            content: systemPrompt,
          },
          { role: "user", content: userPrompt },
        ],
      });

      // Calculate token usage and estimated cost
      const promptTokens = completion.usage?.prompt_tokens || 0;
      const completionTokens = completion.usage?.completion_tokens || 0;
      const totalTokens = completion.usage?.total_tokens || 0;

      // Calculate cost based on the model's pricing
      //   const inputCost =
      //     (promptTokens / pricingInfo.unit) * pricingInfo.inputPricePerUnit;
      //   const outputCost =
      //     (completionTokens / pricingInfo.unit) * pricingInfo.outputPricePerUnit;
      //   const totalCost = inputCost + outputCost;

      //   setTokenUsage({
      //     promptTokens,
      //     completionTokens,
      //     totalTokens,
      //     estimatedCost: totalCost,
      //     pricingDetails: pricingInfo,
      //     model,
      //   });

      const content = completion.choices[0]?.message?.content || "";
      console.log(`${retry ? "Retry" : "Initial"} GPT response:`, content);

      // Try to extract and parse the JSON response
      try {
        // Clean the content of any potential non-JSON wrapping text
        let jsonContent = content;

        // Try to extract just the JSON object if there's anything else
        const jsonMatch = content.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          jsonContent = jsonMatch[0];
        }

        console.log("Content to parse:", jsonContent);
        const parsedResponse = JSON.parse(jsonContent);
        console.log("Parsed response:", parsedResponse);

        // Extract the questions array from the response
        if (
          parsedResponse.questions &&
          Array.isArray(parsedResponse.questions)
        ) {
          if (parsedResponse.questions.length > 0) {
            // Success! We have valid questions
            setIsRetrying(false);
            setRetryCount(0);
            setIsGenerating(false);
            return {
              success: true,
              questions: parsedResponse.questions,
              //   tokenUsage: {
              //     promptTokens,
              //     completionTokens,
              //     totalTokens,
              //     model,
              //   },
            };
          } else if (
            Array.isArray(parsedResponse.questions) &&
            parsedResponse.questions.length === 0
          ) {
            // Empty but valid response
            const error = new Error(
              "No questions could be generated. The model couldn't find sufficient information."
            );
            if (onError) onError(error);
            setIsRetrying(false);
            setIsGenerating(false);
            return { success: false, error };
          } else {
            // Only retry if we think it's a genuine error
            return await handleRetryOrError(
              new Error(
                "No questions were generated. Retrying with more explicit instructions."
              ),
              movieInfo,
              numQuestions,
              language,
              model
            );
          }
        } else {
          return await handleRetryOrError(
            new Error("Invalid response format: missing questions array"),
            movieInfo,
            numQuestions,
            language,
            model
          );
        }
      } catch (err) {
        // This is definitely a reason to retry - invalid JSON
        return await handleRetryOrError(
          err instanceof Error ? err : new Error("Failed to parse response"),
          movieInfo,
          numQuestions,
          language,
          model
        );
      }
    } catch (err) {
      return await handleRetryOrError(
        err instanceof Error ? err : new Error("Unknown error"),
        movieInfo,
        numQuestions,
        language,
        model
      );
    }
  };

  // Helper function to handle retries or set final error
  const handleRetryOrError = async (
    error: Error,
    movieInfo: Movie,
    numQuestions: number,
    language: string,
    model: "gpt-4o-mini-search-preview" | "gpt-4o-search-preview"
  ): Promise<GenerationResult> => {
    console.error("API error:", error);

    if (retryCount < maxRetries) {
      // Increment retry count and try again
      setRetryCount((prevCount) => prevCount + 1);

      // Update states to show retrying status
      setIsRetrying(true);

      // Wait a short time before retrying to avoid overwhelming the API
      await new Promise((resolve) => setTimeout(resolve, 1500));

      return generateWithRetry(
        movieInfo,
        numQuestions,
        language,
        model,
        [],
        true
      );
    } else {
      // Max retries reached, show final error
      if (onError) onError(error);
      setIsRetrying(false);
      setIsGenerating(false);
      return { success: false, error: error };
    }
  };

  return {
    generateWithRetry,
    isGenerating,
    isRetrying,
    retryCount,
    // tokenUsage,
    generatedPrompt,
  };
};
