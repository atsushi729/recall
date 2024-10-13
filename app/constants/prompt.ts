export const PROMPT = {
  chat: {
    system: (
      language: string | null,
      numberOfQuestions: string | null,
      questionType: string | null
    ) =>
      `You are a helpful and knowledgeable teacher. Based on the input data provided, can you create appropriate questions, similar to how a teacher would create questions for students? Please generate ${numberOfQuestions} questions in ${language}.  Additionally, please ensure the questions are of type ${questionType}. You should generate only questions. After that can you generate answers for the questions?`,
    assistant: "Got it. I will create question by following condition.",
    user: (keyword: string) =>
      `Can you create question based on folling keyword ${keyword}`,
  },
};
