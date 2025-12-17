import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { insertContactSchema } from "@shared/schema";

const SITE_URL = process.env.SITE_URL || "https://jatnielcomercial.ao";

export async function registerRoutes(app: Express): Promise<Server> {
  // SEO: Sitemap.xml endpoint
  app.get("/sitemap.xml", async (req: Request, res: Response) => {
    try {
      const products = await storage.getAllProducts();
      const lastMod = new Date().toISOString().split('T')[0];
      
      let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>${SITE_URL}/</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${SITE_URL}/loja</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${SITE_URL}/clientes</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>${SITE_URL}/contacto</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`;

      // Add product pages
      for (const product of products) {
        sitemap += `
  <url>
    <loc>${SITE_URL}/produto/${product.id}</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
    ${product.image ? `<image:image>
      <image:loc>${product.image}</image:loc>
      <image:title>${product.name}</image:title>
    </image:image>` : ''}
  </url>`;
      }

      sitemap += `
</urlset>`;

      res.header('Content-Type', 'application/xml');
      res.send(sitemap);
    } catch (error) {
      console.error("Error generating sitemap:", error);
      res.status(500).send("Error generating sitemap");
    }
  });

  // SEO: Robots.txt endpoint
  app.get("/robots.txt", (req: Request, res: Response) => {
    const robots = `User-agent: *
Allow: /
Disallow: /api/

# Sitemap
Sitemap: ${SITE_URL}/sitemap.xml

# Crawl-delay
Crawl-delay: 1

# Google
User-agent: Googlebot
Allow: /

# Bing
User-agent: Bingbot
Allow: /
`;
    res.header('Content-Type', 'text/plain');
    res.send(robots);
  });
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

  // Get all products
  app.get("/api/products", async (req: Request, res: Response) => {
    try {
      const { category, featured } = req.query;
      
      let products;
      if (featured === "true") {
        products = await storage.getFeaturedProducts();
      } else if (category && typeof category === "string") {
        products = await storage.getProductsByCategory(category);
      } else {
        products = await storage.getAllProducts();
      }
      
      return res.status(200).json(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      return res.status(500).json({
        message: "Erro ao buscar produtos",
      });
    }
  });

  // Get single product
  app.get("/api/products/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const product = await storage.getProduct(id);
      
      if (!product) {
        return res.status(404).json({
          message: "Produto não encontrado",
        });
      }
      
      return res.status(200).json(product);
    } catch (error) {
      console.error("Error fetching product:", error);
      return res.status(500).json({
        message: "Erro ao buscar produto",
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
