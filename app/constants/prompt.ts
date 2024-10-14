import { SystemPromptParams, UserPromptParams } from "~/types/prompt";

export const PROMPT = {
  chat: {
    system: (params: SystemPromptParams) => `You are a helpful and knowledgeable teacher. Based on the input data provided, can you create appropriate questions, similar to how a teacher would create questions for students? Please generate ${params.numberOfQuestions} questions in ${params.language}. Additionally, please ensure the questions are of type ${params.questionType}. You should generate only questions. After that, can you generate answers for the questions?`,
    assistant: "Got it. I will create questions by following the conditions. Moreover, I will gererate answers following formmating rules. question {question} answer {answer}",
    user: (keyword: UserPromptParams) => `Can you create questions based on the following keyword: "${keyword}"? Please generate questions and answers based on the following format: question {question} answer {answer}`,
  }
};
