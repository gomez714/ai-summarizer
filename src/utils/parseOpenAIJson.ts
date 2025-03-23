export function parseOpenAIJson(content: string): Record<string, unknown> {
  try {
    return JSON.parse(content);
  } catch {
    const regex = /\{[\s\S]*\}/;
    const match = regex.exec(content);
    if (match) {
      try {
        return JSON.parse(match[0]);
      } catch (e) {
        console.error("Failed to parse extracted JSON:", e);
      }
    }
    throw new Error("Failed to parse valid JSON from OpenAI response");
  }
}