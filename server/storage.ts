import { users, type User, type InsertUser, type Contact, type InsertContact, type Product, type InsertProduct } from "@shared/schema";

// Interface for storage operations
export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Contact form methods
  createContact(contact: InsertContact & { createdAt: string }): Promise<Contact>;
  getContact(id: number): Promise<Contact | undefined>;
  getAllContacts(): Promise<Contact[]>;
  
  // Product methods
  getAllProducts(): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  getProductsByCategory(category: string): Promise<Product[]>;
  getFeaturedProducts(): Promise<Product[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private contacts: Map<number, Contact>;
  private products: Map<number, Product>;
  private userCurrentId: number;
  private contactCurrentId: number;
  private productCurrentId: number;

  constructor() {
    this.users = new Map();
    this.contacts = new Map();
    this.products = new Map();
    this.userCurrentId = 1;
    this.contactCurrentId = 1;
    this.productCurrentId = 1;
    
    this.initializeProducts();
  }
  
  private initializeProducts() {
    const sampleProducts: Omit<Product, "id">[] = [
      {
        name: "Porta Documento Magnético",
        description: "Solução prática e moderna para organizar e expor documentos de forma profissional e elegante.",
        fullDescription: "Quer deixar os documentos da sua empresa expostos de forma profissional e organizada? Apresentamos o Porta Documento Magnético - a solução prática e moderna para organizar documentos. Com ele, você troca os documentos sem esforço e sem danificar nada. É simples, rápido e elegante. Ideal para empresas, escritórios, clínicas, salões, lojas e qualquer estabelecimento que precisa expor documentos de forma clara e bonita.",
        price: 3000,
        image: "https://res.cloudinary.com/dl90hjhoj/image/upload/v1765880923/WhatsApp_Image_2025-12-15_at_14.03.16_2_hre93u.jpg",
        images: [
          "https://res.cloudinary.com/dl90hjhoj/image/upload/v1765880925/WhatsApp_Image_2025-12-15_at_14.03.13_1_tyaq0u.jpg",
          "https://res.cloudinary.com/dl90hjhoj/image/upload/v1765880926/WhatsApp_Image_2025-12-15_at_14.03.14_lgyja8.jpg",
          "https://res.cloudinary.com/dl90hjhoj/image/upload/v1765880925/WhatsApp_Image_2025-12-15_at_14.03.13_qnlgtc.jpg",
          "https://res.cloudinary.com/dl90hjhoj/image/upload/v1765880923/WhatsApp_Image_2025-12-15_at_14.03.16_1_uil3iq.jpg"
        ],
        video: null,
        videos: null,
        category: "organizacao",
        featured: true,
        features: [
          "Troca de documentos sem esforço",
          "Não danifica os documentos",
          "Preço: 3.000 Kz cada unidade",
          "10 unidades ou mais: 2.500 Kz cada",
          "Entrega: 1.000 Kz",
          "Montagem Grátis"
        ],
      },
      {
        name: "Porta Documento Magnético - Vídeo",
        description: "Solução prática e moderna para organizar e expor documentos de forma profissional e elegante.",
        fullDescription: "Quer deixar os documentos da sua empresa expostos de forma profissional e organizada? Apresentamos o Porta Documento Magnético - a solução prática e moderna para organizar documentos. Com ele, você troca os documentos sem esforço e sem danificar nada. É simples, rápido e elegante. Ideal para empresas, escritórios, clínicas, salões, lojas e qualquer estabelecimento que precisa expor documentos de forma clara e bonita.",
        price: 3000,
        image: "https://res.cloudinary.com/dl90hjhoj/image/upload/v1765880923/WhatsApp_Image_2025-12-15_at_14.03.16_2_hre93u.jpg",
        images: null,
        video: "https://res.cloudinary.com/dl90hjhoj/video/upload/v1765880479/WhatsApp_Video_2025-12-15_at_13.29.15_wg9bjf.mp4",
        videos: [
          "https://res.cloudinary.com/dl90hjhoj/video/upload/v1765881413/WhatsApp_Video_2025-12-15_at_13.25.14_ptughb.mp4",
          "https://res.cloudinary.com/dl90hjhoj/video/upload/v1765881417/WhatsApp_Video_2025-12-15_at_13.25.11_acwhrj.mp4",
          "https://res.cloudinary.com/dl90hjhoj/video/upload/v1767828135/WhatsApp_Video_2026-01-07_at_23.33.51_xv2osl.mp4"
        ],
        category: "organizacao",
        featured: true,
        features: [
          "Troca de documentos sem esforço",
          "Não danifica os documentos",
          "Preço: 3.000 Kz cada unidade",
          "10 unidades ou mais: 2.500 Kz cada",
          "Entrega: 1.000 Kz",
          "Montagem Grátis"
        ],
      },
      {
        name: "Netflix - Serviço de Streaming",
        description: "Acesso ilimitado a filmes, séries e documentários em alta qualidade. Entretenimento sem limites para toda a família.",
        fullDescription: "Desfrute do melhor entretenimento do mundo com a Netflix! Tenha acesso ilimitado a milhares de filmes, séries, documentários e conteúdos exclusivos em alta definição. Assista quando quiser, onde quiser - no seu telemóvel, tablet, computador ou smart TV. Com a Netflix, você tem diversão garantida para toda a família, com perfis personalizados e conteúdo para todas as idades. Sem anúncios, sem interrupções - apenas entretenimento de qualidade ao seu alcance.",
        price: 5500,
        image: "https://images.ctfassets.net/y2ske730sjqp/1aONibCke6niZhgPxuiilC/2c401b05a07288746ddf3bd3943fbc76/BrandAssets_Logos_01-Wordmark.jpg?w=940",
        images: null,
        video: null,
        videos: null,
        category: "servicos",
        featured: true,
        features: [
          "Acesso ilimitado a filmes e séries",
          "Qualidade HD e 4K disponível",
          "Assista em múltiplos dispositivos",
          "Perfis personalizados para a família",
          "Sem anúncios ou interrupções",
          "Novos conteúdos adicionados semanalmente",
          "Pagamento mensal: 5.500 Kz"
        ],
      },
    ];
    
    sampleProducts.forEach(product => {
      const id = this.productCurrentId++;
      this.products.set(id, { ...product, id });
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  async createContact(insertContact: InsertContact & { createdAt: string }): Promise<Contact> {
    const id = this.contactCurrentId++;
    const contact: Contact = { ...insertContact, id };
    this.contacts.set(id, contact);
    return contact;
  }
  
  async getContact(id: number): Promise<Contact | undefined> {
    return this.contacts.get(id);
  }
  
  async getAllContacts(): Promise<Contact[]> {
    return Array.from(this.contacts.values());
  }
  
  async getAllProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }
  
  async getProduct(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }
  
  async getProductsByCategory(category: string): Promise<Product[]> {
    return Array.from(this.products.values()).filter(p => p.category === category);
  }
  
  async getFeaturedProducts(): Promise<Product[]> {
    return Array.from(this.products.values()).filter(p => p.featured);
  }
}

export const storage = new MemStorage();
