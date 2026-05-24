"use server";

import { db } from "@/db";
import { guestbook, mathGameRankings, customLinks } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function addGuestbookEntry(formData: FormData) {
  const name = formData.get("name") as string;
  const message = formData.get("message") as string;

  if (!name || !message) return;

  await db.insert(guestbook).values({ name, message });
  revalidatePath("/");
}

export async function deleteGuestbookEntry(id: number, passwordInput: string) {
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";
  
  if (passwordInput !== ADMIN_PASSWORD) {
    return { success: false, message: "비밀번호가 틀렸습니다." };
  }

  await db.delete(guestbook).where(eq(guestbook.id, id));
  revalidatePath("/");
  return { success: true, message: "성공적으로 삭제되었습니다." };
}

export async function askMathQuestion(messages: { role: string; content: string }[]) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return { error: "OPENAI_API_KEY가 설정되지 않았습니다. Vercel 환경 변수를 확인해주세요." };
  }

  const systemMessage = {
    role: "system",
    content: "당신은 친절하고 똑똑한 AI 수학 선생님입니다. 사용자가 수학 질문을 하면 단계별로 이해하기 쉽게 풀이 과정을 설명하고, 마지막에 명확하게 정답을 제시해주세요. 설명은 친근한 말투로 하고, 복잡한 수식은 깔끔하게 정리해서 보여주세요. 마크다운 포맷을 적극 활용하여 가독성을 높여주세요."
  };

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [systemMessage, ...messages],
        temperature: 0.7,
      })
    });

    if (!response.ok) {
      console.error(await response.text());
      return { error: "OpenAI API 응답 오류가 발생했습니다." };
    }

    const data = await response.json();
    return { result: data.choices[0].message.content };
  } catch (error) {
    console.error(error);
    return { error: "네트워크 통신 중 오류가 발생했습니다." };
  }
}

export async function saveGameScore(nickname: string, score: number, mode: 'time' | 'challenge') {
  if (!nickname) return { success: false, message: "Nickname is required" };
  await db.insert(mathGameRankings).values({ nickname, score, mode });
  return { success: true };
}

export async function getGameRankings(mode: 'time' | 'challenge') {
  const rankings = await db.select()
    .from(mathGameRankings)
    .where(eq(mathGameRankings.mode, mode))
    .orderBy(desc(mathGameRankings.score))
    .limit(10);
  return rankings;
}

export async function getAllGuestbookEntries(passwordInput: string) {
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";
  if (passwordInput !== ADMIN_PASSWORD) return { success: false, message: "비밀번호가 틀렸습니다." };
  
  const entries = await db.select().from(guestbook).orderBy(desc(guestbook.createdAt));
  return { success: true, data: entries };
}

export async function getCustomLinks() {
  const links = await db.select().from(customLinks).orderBy(desc(customLinks.createdAt));
  return links;
}

export async function addCustomLink(
  title: string, 
  url: string, 
  description: string, 
  icon: string, 
  passwordInput: string
) {
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";
  if (passwordInput !== ADMIN_PASSWORD) return { success: false, message: "비밀번호가 틀렸습니다." };

  const colors = [
    "from-blue-400 to-blue-600",
    "from-green-400 to-green-600",
    "from-red-400 to-red-600",
    "from-purple-400 to-purple-600",
    "from-pink-400 to-pink-600",
    "from-yellow-400 to-orange-500",
    "from-indigo-400 to-indigo-600",
    "from-teal-400 to-teal-600",
  ];
  const color = colors[Math.floor(Math.random() * colors.length)];

  await db.insert(customLinks).values({ title, url, description, icon, color });
  revalidatePath("/");
  return { success: true, message: "링크가 추가되었습니다." };
}

export async function deleteCustomLink(id: number, passwordInput: string) {
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";
  if (passwordInput !== ADMIN_PASSWORD) return { success: false, message: "비밀번호가 틀렸습니다." };

  await db.delete(customLinks).where(eq(customLinks.id, id));
  revalidatePath("/");
  return { success: true, message: "링크가 삭제되었습니다." };
}
