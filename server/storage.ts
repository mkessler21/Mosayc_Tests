import { waitlistEntries, type WaitlistEntry, type InsertWaitlistEntry } from "@shared/schema";
import { db } from "./db";

export interface IStorage {
  createWaitlistEntry(entry: InsertWaitlistEntry): Promise<WaitlistEntry>;
  getWaitlistEntries(): Promise<WaitlistEntry[]>;
}

export class DatabaseStorage implements IStorage {
  async createWaitlistEntry(entry: InsertWaitlistEntry): Promise<WaitlistEntry> {
    const [waitlistEntry] = await db
      .insert(waitlistEntries)
      .values(entry)
      .returning();
    return waitlistEntry;
  }

  async getWaitlistEntries(): Promise<WaitlistEntry[]> {
    return await db.select().from(waitlistEntries);
  }
}

export const storage = new DatabaseStorage();