import { pgTable, text, timestamp, uuid, jsonb, boolean } from "drizzle-orm/pg-core";
import { practices, users } from "./core";

export const crmAutomations = pgTable("crm_automations", {
  id: uuid("id").primaryKey().defaultRandom(),
  practiceId: uuid("practice_id").notNull().references(() => practices.id),
  name: text("name").notNull(),
  triggerType: text("trigger_type").notNull(), 
  conditions: jsonb("conditions").default({}).notNull(),
  actionType: text("action_type").notNull(), 
  actionPayload: jsonb("action_payload").notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
