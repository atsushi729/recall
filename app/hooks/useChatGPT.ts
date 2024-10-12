import { useState } from "react";

interface UseChatGPTResult {
  response: string | null;
  error: string | null;
  isLoading: boolean;
  submitQuestion: (question: string) => Promise<void>;
}

export const useChatGPT = (): UseChatGPTResult => {
  const [response, setResponse] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const submitQuestion = async (question: string) => {
    setIsLoading(true);
    setError(null);
    setResponse(null);

    try {
      // Validate the question
      if (typeof question !== "string" || question.trim() === "") {
        return setError("Please enter a question.");
      }

      // Send the question to the server
      const formData = new FormData();
      formData.append("text", question);

      const fetchResponse = await fetch("/api/ai/generateQuestion", {
        method: "POST",
        body: formData,
      });
      const res: string = await fetchResponse.json();

      // Handle the response
      if (!res) {
        return setError("Failed to generate a question.");
      }

      setResponse(res);
    } catch (err: any) {
      console.error(err.message);
      setError("Enexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return { response, error, isLoading, submitQuestion };
};
