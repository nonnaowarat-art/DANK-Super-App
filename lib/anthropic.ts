import Anthropic from "@anthropic-ai/sdk";

export function getAnthropic(): Anthropic | null {
  if (!process.env.ANTHROPIC_API_KEY) return null;
  return new Anthropic();
}

export const AI_MODEL = "claude-opus-4-8";
