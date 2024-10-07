import type { MetaFunction } from "@remix-run/cloudflare";
import { Button } from "~/components/button";
import Hero from "~/components/hero";
import { PaperClipIcon } from "@heroicons/react/24/solid";
import SelectBox from "~/components/selectBox";
import {
  languageOptions,
  numberOfQuestionOptions,
  questionTypeOptions,
} from "~/data/selectOptions";

export const meta: MetaFunction = () => {
  return [
    { title: "Recall" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="relative bg-black min-h-screen bg-theme-base text-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-3xl space-y-6">
        <Hero />
        <div className="bg-gray-900 p-4 rounded-lg">
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="icon" className="shrink-0">
              <PaperClipIcon className="h-4 w-4" aria-hidden="true" />
            </Button>
            <input
              placeholder="Ask v0 a question..."
              className="flex-grow bg-transparent border-b border-gray-700 focus:border-gray-600 focus:outline-none p-2 text-sm"
            />
            <Button variant="default" className="shrink-0">
              Submit
            </Button>
          </div>
        </div>
        <div className="flex items-center space-x-6">
          <SelectBox options={languageOptions} label="Language" />
          <SelectBox
            options={numberOfQuestionOptions}
            label="Number of Question"
          />
          <SelectBox options={questionTypeOptions} label="Question type" />
        </div>
      </div>
    </div>
  );
}
