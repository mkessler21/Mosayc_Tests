import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const waitlistEntries = pgTable("waitlist_entries", {
  id: serial("id").primaryKey(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  companyName: text("company_name").notNull(),
  companySize: text("company_size").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertWaitlistSchema = createInsertSchema(waitlistEntries)
  .omit({ id: true, createdAt: true })
  .extend({
    email: z.string().email("Please enter a valid email address"),
    companySize: z.enum([
      "1-10",
      "11-50",
      "51-200",
      "201-1000",
      "1000+",
    ], { required_error: "Please select your company size" })
  });

export type InsertWaitlistEntry = z.infer<typeof insertWaitlistSchema>;
export type WaitlistEntry = typeof waitlistEntries.$inferSelect;
