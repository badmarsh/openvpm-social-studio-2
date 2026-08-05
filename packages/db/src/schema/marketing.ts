import { pgTable, text, timestamp, uuid, jsonb, boolean } from "drizzle-orm/pg-core";
import { practices, users } from "./core"; 

export const marketingTemplates = pgTable("marketing_templates", {
  id: uuid("id").primaryKey().defaultRandom(),
  practiceId: uuid("practice_id").notNull().references(() => practices.id),
  name: text("name").notNull(),
  description: text("description"),
  content: text("content").notNull(),
  variables: jsonb("variables").default([]).notNull(),
  category: text("category").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const marketingPosts = pgTable("marketing_posts", {
  id: uuid("id").primaryKey().defaultRandom(),
  practiceId: uuid("practice_id").notNull().references(() => practices.id),
  authorId: uuid("author_id").notNull().references(() => users.id),
  templateId: uuid("template_id").references(() => marketingTemplates.id),
  topic: text("topic").notNull(),
  content: text("content").notNull(),
  status: text("status").notNull().default("DRAFT"), // DRAFT, REVIEW, SCHEDULED, PUBLISHED
  scheduledDate: timestamp("scheduled_date"),
  platform: text("platform").notNull(), // FACEBOOK, INSTAGRAM
  assetUrls: jsonb("asset_urls").default([]),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
