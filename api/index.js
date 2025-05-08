// api/index.js
import express from 'express';
import { z } from 'zod';

// Simulação de armazenamento em memória para contatos
class MemStorage {
  constructor() {
    this.contacts = new Map();
    this.contactCurrentId = 1;
  }

  async createContact(insertContact) {
    const id = this.contactCurrentId++;
    const contact = { ...insertContact, id };
    this.contacts.set(id, contact);
    return contact;
  }

  async getAllContacts() {
    return Array.from(this.contacts.values());
  }
}

const storage = new MemStorage();

// Schema para validação de contatos
const insertContactSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  service: z.string(),
  message: z.string()
});

// Configuração do Express
const app = express();
app.use(express.json());

// Rota para criar contatos
app.post('/api/contact', async (req, res) => {
  try {
    const validatedData = insertContactSchema.parse(req.body);
    const contact = await storage.createContact({
      ...validatedData,
      createdAt: new Date().toISOString()
    });
    
    return res.status(201).json({
      message: "Mensagem enviada com sucesso",
      contact: {
        id: contact.id,
        name: contact.name
      }
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        message: "Dados inválidos",
        errors: error.errors
      });
    }
    console.error("Error creating contact:", error);
    return res.status(500).json({
      message: "Erro ao processar a solicitação"
    });
  }
});

// Rota para listar contatos
app.get('/api/contacts', async (req, res) => {
  try {
    const contacts = await storage.getAllContacts();
    return res.status(200).json(contacts);
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return res.status(500).json({
      message: "Erro ao buscar contatos"
    });
  }
});

// Rota para verificar se a API está funcionando
app.get('/api', (req, res) => {
  res.status(200).json({ status: 'API funcionando corretamente' });
});

// Exportar para uso com serverless
export default app;
