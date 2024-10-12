import { ActionFunctionArgs } from "@remix-run/node";
import { OpenAI } from "openai";
import { PROMPT } from "~/constants/prompt";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const text = formData.get("text") as string;
  const completionText = await getCompletion(text);
  return completionText;
}

async function getCompletion(text: string) {
  // Get the OpenAI API key from the environment variables
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
  const openAI = new OpenAI({ apiKey: OPENAI_API_KEY });

  // Generate question using the OpenAI API
  const result = await openAI.chat.completions.create({
    messages: [
      { role: "system", content: PROMPT.chat.system },
      { role: "assistant", content: PROMPT.chat.assistant },
      { role: "user", content: text },
    ],
    model: "gpt-4o-mini",
  });

  const completion = result.choices[0].message.content;
  return completion;
}
