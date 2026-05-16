"use server";

import { db } from "@/db";
import { guestbook } from "@/db/schema";
import { eq } from "drizzle-orm";
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
