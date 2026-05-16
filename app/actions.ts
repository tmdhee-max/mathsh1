"use server";

import { db } from "@/db";
import { guestbook } from "@/db/schema";
import { revalidatePath } from "next/cache";

export async function addGuestbookEntry(formData: FormData) {
  const name = formData.get("name") as string;
  const message = formData.get("message") as string;

  if (!name || !message) return;

  await db.insert(guestbook).values({ name, message });
  revalidatePath("/");
}
