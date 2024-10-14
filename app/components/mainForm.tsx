import { FormEvent, useState } from "react";
import { Button } from "./button";
import { useChatGPT } from "~/hooks/useChatGPT";
import SelectBox from "./selectBox";
import { languageOptions, questionCounts, questionTypeOptions } from "~/data/selectOptions";

export default function MainForm() {
  const [question, setQuestion] = useState("");
  const [selectedQuestionCount, setSelectedQuestionCount] = useState("3");
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [selectedQuestionType, setSelectedQuestionType] = useState("Open-Close");

  const { response, error, isLoading, submitQuestion } = useChatGPT();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    await submitQuestion({
      question,
      numberOfQuestions: selectedQuestionCount,
      language: selectedLanguage,
      questionType: selectedQuestionType
    });
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
        <Button type="submit" variant="default" className="shrink-0" disabled={isLoading}>
          {isLoading ? "Generating..." : "Submit"}
        </Button>
      </form>
      <div className="flex space-x-2 pt-5">
        <SelectBox
          options={questionCounts}
          label="Number of Questions"
          value={selectedQuestionCount}
          onChange={(value) => setSelectedQuestionCount(value as string)}
        />
        <SelectBox
          options={languageOptions}
          label="Language"
          value={selectedLanguage}
          onChange={(value) => setSelectedLanguage(value as string)}
        />
        <SelectBox
          options={questionTypeOptions}
          label="Question Type"
          value={selectedQuestionType}
          onChange={(value) => setSelectedQuestionType(value as string)}
        />
      </div>
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
