import { useState } from "react";

interface SubmitData {
  question: string;
  numberOfQuestions: string;
  language: string;
  questionType: string;
}

interface UseChatGPTResult {
  response: string | null;
  error: string | null;
  isLoading: boolean;
  submitQuestion: (data: SubmitData) => Promise<void>;
}

export const useChatGPT = (): UseChatGPTResult => {
  const [response, setResponse] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const submitQuestion = async (data: SubmitData) => {
    setIsLoading(true);
    setError(null);
    setResponse(null);

    try {
      // validation
      if (typeof data.question !== "string" || data.question.trim() === "") {
        setError("Please enter a question.");
        setIsLoading(false);
        return;
      }
      if (
        typeof data.numberOfQuestions !== "string" ||
        data.numberOfQuestions.trim() === ""
      ) {
        setError("Please enter the number of questions.");
        setIsLoading(false);
        return;
      }
      if (typeof data.language !== "string" || data.language.trim() === "") {
        setError("Please enter the language.");
        setIsLoading(false);
        return;
      }
      if (
        typeof data.questionType !== "string" ||
        data.questionType.trim() === ""
      ) {
        setError("Please enter the question type.");
        setIsLoading(false);
        return;
      }

      // Create form data
      const formData = new FormData();
      formData.append("question", data.question);
      formData.append("numberOfQuestions", data.numberOfQuestions.toString());
      formData.append("language", data.language);
      formData.append("questionType", data.questionType);

      // Fetch request
      const fetchResponse = await fetch("/api/ai/generateQuestion", {
        method: "POST",
        body: formData,
      });

      // Response error handling
      if (!fetchResponse.ok) {
        const errorData = await fetchResponse.json();
        const errorJson = errorData as { error?: string };
        throw new Error(errorJson.error || "Failed to generate questions.");
      }

      // Get response
      const res: string = await fetchResponse.json();

      // Handle response
      if (!res) {
        setError("Failed to generate questions.");
        return;
      }

      setResponse(res);
    } catch (err: any) {
      console.error(err.message);
      setError(err.message || "Unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return { response, error, isLoading, submitQuestion };
};
