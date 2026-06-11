import { messagingApi } from "@line/bot-sdk";

export function getLineClient() {
  const token = process.env.LINE_CHANNEL_ACCESS_TOKEN;
  if (!token) throw new Error("LINE_CHANNEL_ACCESS_TOKEN is not set");
  return new messagingApi.MessagingApiClient({ channelAccessToken: token });
}

export async function pushTextMessage(to: string, text: string) {
  const client = getLineClient();
  await client.pushMessage({ to, messages: [{ type: "text", text }] });
}
