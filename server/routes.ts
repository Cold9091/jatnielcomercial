import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { insertContactSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission endpoint
  app.post("/api/contact", async (req: Request, res: Response) => {
    try {
      // Validate the request body using Zod schema
      const validatedData = insertContactSchema.parse(req.body);
      
      // Store contact data
      const contact = await storage.createContact({
        ...validatedData,
        createdAt: new Date().toISOString(),
      });
      
      return res.status(201).json({
        message: "Mensagem enviada com sucesso",
        contact: {
          id: contact.id,
          name: contact.name,
        },
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          message: "Dados inválidos",
          errors: error.errors,
        });
      }
      
      console.error("Error creating contact:", error);
      return res.status(500).json({
        message: "Erro ao processar a solicitação",
      });
    }
  });

  // Get all contacts endpoint (for admin purposes)
  app.get("/api/contacts", async (req: Request, res: Response) => {
    try {
      const contacts = await storage.getAllContacts();
      return res.status(200).json(contacts);
    } catch (error) {
      console.error("Error fetching contacts:", error);
      return res.status(500).json({
        message: "Erro ao buscar contatos",
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
