import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertWaitlistSchema } from "@shared/schema";

export function registerRoutes(app: Express): Server {
  app.post("/api/waitlist", async (req, res) => {
    try {
      const entry = insertWaitlistSchema.parse(req.body);
      const created = await storage.createWaitlistEntry(entry);
      res.status(201).json(created);
    } catch (error) {
      res.status(400).json({ error: "Invalid request data" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
