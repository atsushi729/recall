import { ActionFunctionArgs } from "@remix-run/node";
import { OpenAI } from "openai";
import { PROMPT } from "~/constants/prompt";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  // extract data from form component
  const question = formData.get("question") as string;
  const numberOfQuestions = formData.get("numberOfQuestions");
  const language = formData.get("language");
  const questionType = formData.get("questionType");

  // change data type
  const numQuestions = numberOfQuestions ? String(numberOfQuestions) : null;
  const lang = language ? String(language) : null;
  const qType = questionType ? String(questionType) : null;

  // get question data
  const questionText = await getQuestion({
    question,
    numberOfQuestions: numQuestions,
    language: lang,
    questionType: qType
  });

  return questionText;
}

interface CompletionParams {
  question: string;
  numberOfQuestions: string | null;
  language: string | null;
  questionType: string | null;
}

async function getQuestion(params: CompletionParams) {
  const { question, numberOfQuestions, language, questionType } = params;

  // Get OpenAI API key
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
  if (!OPENAI_API_KEY) {
    throw new Error("OpenAI API key is not configured.");
  }

  const openAI = new OpenAI({ apiKey: OPENAI_API_KEY });

  // Request to OpenAI
  const result = await openAI.chat.completions.create({
    messages: [
      { role: "system", content: PROMPT.chat.system(language, numberOfQuestions, questionType) },
      { role: "assistant", content: PROMPT.chat.assistant },
      { role: "user", content: PROMPT.chat.user(question) }
    ],
    model: "gpt-4o-mini"
  });

  const completion = result.choices[0].message.content;
  return completion;
}
