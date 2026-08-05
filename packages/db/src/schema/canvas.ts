import { pgTable, text, timestamp, uuid, jsonb } from "drizzle-orm/pg-core";
import { practices, users } from "./core";

export const canvasDocuments = pgTable("canvas_documents", {
  id: uuid("id").primaryKey().defaultRandom(),
  practiceId: uuid("practice_id").notNull().references(() => practices.id),
  authorId: uuid("author_id").notNull().references(() => users.id),
  title: text("title").notNull(),
  docType: text("doc_type").notNull(), 
  content: text("content").notNull(), 
  tags: jsonb("tags").default([]),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const canvasTemplates = pgTable("canvas_templates", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  docType: text("doc_type").notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
