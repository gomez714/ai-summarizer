import OpenAI from "openai";

export async function getChatCompletion(prompt: string, systemMessage: string, maxTokens = 1000) {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

  const res = await openai.chat.completions.create({
    model: "gpt-3.5-turbo-0125",
    messages: [
      { role: "system", content: systemMessage },
      { role: "user", content: prompt },
    ],
    temperature: 0.7,
    max_tokens: maxTokens,
  });

  const content = res.choices[0]?.message?.content;

  if (!content) {
    console.error('OpenAI returned unexpected response:', res);
    throw new Error('No response from OpenAI')
  }

  return content;
}