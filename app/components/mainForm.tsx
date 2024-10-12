import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { Button } from "./button";
import { useChatGPT } from "~/hooks/useChatGPT";

export default function MainForm() {
  const [question, setQuestion] = useState("");
  const { response, error, isLoading, submitQuestion } = useChatGPT();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await submitQuestion(question);
  };

  return (
    <div className="z-10">
      <form onSubmit={handleSubmit} className="flex items-center space-x-2">
        <input
          name="question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Enter keywords to create questions..."
          className="flex-grow bg-transparent border-b border-gray-700 focus:border-gray-600 focus:outline-none p-2 text-sm"
        />
        <Button
          type="submit"
          variant="default"
          className="shrink-0"
          disabled={isLoading}
        >
          {isLoading ? "Generating..." : "Submit"}
        </Button>
      </form>
      {response && (
        <div className="mt-4 p-2 bg-gray-800 rounded">
          <h3 className="text-lg font-semibold">Response:</h3>
          <p>{response}</p>
        </div>
      )}
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}
