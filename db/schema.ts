import { pgTable, serial, text, timestamp, integer } from "drizzle-orm/pg-core";

export const guestbook = pgTable("guestbook", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const mathGameRankings = pgTable("math_game_rankings", {
  id: serial("id").primaryKey(),
  nickname: text("nickname").notNull(),
  score: integer("score").notNull(),
  mode: text("mode").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const customLinks = pgTable("custom_links", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  url: text("url").notNull(),
  icon: text("icon").notNull(),
  color: text("color").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
