import { SelectOption } from "~/types/selectBox";

export const languageOptions: SelectOption[] = [
  { id: 1, name: "English" },
  { id: 2, name: "Japanese" },
];

export const numberOfQuestionOptions: SelectOption[] = [
  { id: 1, name: "3" },
  { id: 2, name: "5" },
  { id: 3, name: "7" },
];

export const questionTypeOptions: SelectOption[] = [
  { id: 1, name: "Open-Close" },
  { id: 2, name: "Multiple-choice" },
  { id: 3, name: "Binary choice" },
];
