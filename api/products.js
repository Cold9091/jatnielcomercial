// api/products.js
import express from 'express';

const router = express();

const sampleProducts = [
  {
    id: 1,
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
    ]
  },
  {
    id: 2,
    name: "Porta Documento Magnético - Vídeo",
    description: "Solução prática e moderna para organizar e expor documentos de forma profissional e elegante.",
    fullDescription: "Quer deixar os documentos da sua empresa expostos de forma profissional e organizada? Apresentamos o Porta Documento Magnético - a solução prática e moderna para organizar documentos. Com ele, você troca os documentos sem esforço e sem danificar nada. É simples, rápido e elegante. Ideal para empresas, escritórios, clínicas, salões, lojas e qualquer estabelecimento que precisa expor documentos de forma clara e bonita.",
    price: 3000,
    image: "https://res.cloudinary.com/dl90hjhoj/image/upload/v1765880923/WhatsApp_Image_2025-12-15_at_14.03.16_2_hre93u.jpg",
    images: null,
    video: "https://res.cloudinary.com/dl90hjhoj/video/upload/v1765880479/WhatsApp_Video_2025-12-15_at_13.29.15_wg9bjf.mp4",
    videos: [
      "https://res.cloudinary.com/dl90hjhoj/video/upload/v1765881413/WhatsApp_Video_2025-12-15_at_13.25.14_ptughb.mp4",
      "https://res.cloudinary.com/dl90hjhoj/video/upload/v1765881417/WhatsApp_Video_2025-12-15_at_13.25.11_acwhrj.mp4"
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
    ]
  },
  {
    id: 3,
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
    ]
  }
];

// GET /api/products
router.get('/api/products', (req, res) => {
  const { category, featured } = req.query;

  let products = sampleProducts.slice();

  if (featured === 'true') {
    products = products.filter((p) => p.featured);
  } else if (category) {
    products = products.filter((p) => p.category === String(category));
  }

  return res.status(200).json(products);
});

// GET /api/products/:id
router.get('/api/products/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const product = sampleProducts.find((p) => p.id === id);

  if (!product) {
    return res.status(404).json({ message: 'Produto não encontrado' });
  }

  return res.status(200).json(product);
});

export default router;
