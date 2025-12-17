import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag, ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Store from "@/components/Store";
import { Helmet } from "react-helmet";

const SITE_URL = "https://jatnielcomercial.ao";

const storeSchema = {
  "@context": "https://schema.org",
  "@type": "Store",
  "name": "Jatniel Comercial - Loja Online",
  "description": "Loja online de produtos e serviços de design gráfico e desenvolvimento web em Angola",
  "url": `${SITE_URL}/loja`,
  "image": `${SITE_URL}/og-image.jpg`,
  "priceRange": "$$",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Luanda",
    "addressCountry": "AO"
  }
};

const Loja = () => {
  return (
    <>
      <Helmet>
        <title>Loja Online Angola | Jatniel Comercial - Produtos e Serviços Digitais</title>
        <meta name="description" content="Loja online em Angola com produtos organizacionais, porta documentos magnéticos, subscrições Netflix e serviços de design gráfico e desenvolvimento web. Entrega em Luanda e todo o país." />
        <meta name="keywords" content="loja online Angola, comprar Angola, porta documentos Angola, Netflix Angola, design gráfico Angola, desenvolvimento web Angola, Luanda" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`${SITE_URL}/loja`} />
        
        <meta property="og:title" content="Loja Online | Jatniel Comercial - Angola" />
        <meta property="og:description" content="Produtos e serviços de design gráfico e desenvolvimento web em Angola." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${SITE_URL}/loja`} />
        <meta property="og:image" content={`${SITE_URL}/og-image.jpg`} />
        <meta property="og:locale" content="pt_AO" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Loja Online | Jatniel Comercial" />
        <meta name="twitter:description" content="Produtos e serviços digitais em Angola." />
        
      </Helmet>
      <Helmet>
        <script type="application/ld+json">{`${JSON.stringify(storeSchema)}`}</script>
      </Helmet>
      <Header />
      <main className="pt-24 pb-16 min-h-screen bg-background">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <Link href="/">
              <Button variant="ghost" size="sm" className="gap-2" data-testid="button-back-home">
                <ArrowLeft className="w-4 h-4" />
                Voltar ao Início
              </Button>
            </Link>
          </div>

          <div className="text-center mb-8">
            <Badge variant="secondary" className="mb-4" data-testid="badge-store-page">
              <ShoppingBag className="w-3 h-3 mr-1" />
              Loja
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-store-page-title">
              Nossos Produtos e Serviços
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto" data-testid="text-store-page-description">
              Explore nossa gama completa de produtos e serviços de design gráfico e desenvolvimento web. 
              Entre em contacto para encomendar ou obter mais informações.
            </p>
          </div>
        </div>
        
        <Store isFullPage />
      </main>
      <Footer />
    </>
  );
};

export default Loja;
