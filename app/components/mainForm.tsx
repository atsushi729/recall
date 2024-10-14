import { FormEvent, useState, useEffect } from "react";
import { Button } from "./button";
import { useChatGPT } from "~/hooks/useChatGPT";
import SelectBox from "./selectBox";
import { languageOptions, questionCounts, questionTypeOptions } from "~/data/selectOptions";
import Modal from "./modal";

export default function MainForm() {
  const [question, setQuestion] = useState("");
  const [selectedQuestionCount, setSelectedQuestionCount] = useState("3");
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [selectedQuestionType, setSelectedQuestionType] = useState("Open-Close");

  const { response, error, isLoading, submitQuestion } = useChatGPT();

  // state to control the modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // open modal when response is available
  useEffect(() => {
    if (response) {
      setIsModalOpen(true);
    }
  }, [response]);

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
          onChange={(value) => setSelectedQuestionCount(value)}
        />
        <SelectBox
          options={languageOptions}
          label="Language"
          value={selectedLanguage}
          onChange={(value) => setSelectedLanguage(value)}
        />
        <SelectBox
          options={questionTypeOptions}
          label="Question Type"
          value={selectedQuestionType}
          onChange={(value) => setSelectedQuestionType(value)}
        />
      </div>
      {error && <p className="text-red-500 mt-2">{error}</p>}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Generated Questions">
        <p className="text-white whitespace-pre-wrap">{response}</p>
      </Modal>
      {response && (
        <Button variant="default" onClick={() => setIsModalOpen(true)} className="mt-5">
          View Questions
        </Button>
      )}
    </div>
  );
}
