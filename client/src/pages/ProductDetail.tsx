import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, MessageCircle, ChevronLeft, ChevronRight, Check, Share2, Play } from "lucide-react";
import { getWhatsAppLink } from "@/lib/utils";
import type { Product } from "@shared/schema";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CustomVideoPlayer from "@/components/CustomVideoPlayer";
import { Helmet } from "react-helmet";

const categories: Record<string, string> = {
  design: "Design Gráfico",
  web: "Desenvolvimento Web",
};

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("pt-AO", {
    style: "currency",
    currency: "AOA",
    minimumFractionDigits: 0,
  }).format(price);
};

const ProductDetail = () => {
  const params = useParams<{ id: string }>();
  const productId = params.id;
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const { data: product, isLoading, error } = useQuery<Product>({
    queryKey: [`/api/products/${productId}`],
    enabled: !!productId,
  });

  const handleWhatsAppOrder = () => {
    if (!product) return;
    const message = `Olá! Tenho interesse no produto:\n\n*${product.name}*\nPreço: ${formatPrice(product.price)}\n\nGostaria de mais informações.`;
    window.open(getWhatsAppLink(message), "_blank");
  };

  const handleShare = async () => {
    if (!product) return;
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Share cancelled");
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const allMedia = product ? [
    { type: product.video ? 'video' : 'image', url: product.video || product.image },
    ...(product.images || []).map(img => ({ type: 'image' as const, url: img })),
    ...(product.videos || []).map(vid => ({ type: 'video' as const, url: vid })),
  ] : [];

  const nextMedia = () => {
    setSelectedImageIndex((prev) => (prev + 1) % allMedia.length);
  };

  const prevMedia = () => {
    setSelectedImageIndex((prev) => (prev - 1 + allMedia.length) % allMedia.length);
  };

  if (isLoading) {
    return (
      <>
        <Header />
        <main className="pt-24 pb-16 min-h-screen bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Skeleton className="aspect-square rounded-xl" />
              <div className="space-y-4">
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-6 w-1/4" />
                <Skeleton className="h-10 w-1/3" />
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (error || !product) {
    return (
      <>
        <Header />
        <main className="pt-24 pb-16 min-h-screen bg-background">
          <div className="container mx-auto px-4 text-center py-20">
            <h1 className="text-2xl font-bold mb-4" data-testid="text-error">Produto não encontrado</h1>
            <p className="text-muted-foreground mb-8">O produto que procura não existe ou foi removido.</p>
            <Link href="/">
              <Button data-testid="button-back-home">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar ao Início
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const SITE_URL = "https://jatnielcomercial.ao";
  
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "description": product.fullDescription || product.description,
    "image": product.image,
    "brand": {
      "@type": "Brand",
      "name": "Jatniel Comercial"
    },
    "offers": {
      "@type": "Offer",
      "price": product.price,
      "priceCurrency": "AOA",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "Jatniel Comercial"
      }
    },
    "category": categories[product.category] || product.category
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Início",
        "item": SITE_URL
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Loja",
        "item": `${SITE_URL}/loja`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": product.name,
        "item": `${SITE_URL}/produto/${product.id}`
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>{`${product.name} | Jatniel Comercial - Angola`}</title>
        <meta name="description" content={`${product.description} Disponível em Angola. Entrega em Luanda e todo o país. Preço: ${formatPrice(product.price)}`} />
        <meta name="keywords" content={`${product.name}, ${categories[product.category] || product.category}, Angola, Luanda, comprar online Angola`} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`${SITE_URL}/produto/${product.id}`} />
        
        <meta property="og:title" content={`${product.name} | Jatniel Comercial`} />
        <meta property="og:description" content={product.description || ""} />
        <meta property="og:image" content={product.image || ""} />
        <meta property="og:type" content="product" />
        <meta property="og:url" content={`${SITE_URL}/produto/${product.id}`} />
        <meta property="og:locale" content="pt_AO" />
        <meta property="product:price:amount" content={String(product.price)} />
        <meta property="product:price:currency" content="AOA" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${product.name} | Jatniel Comercial`} />
        <meta name="twitter:description" content={product.description || ""} />
        <meta name="twitter:image" content={product.image || ""} />
        
      </Helmet>
      <Helmet>
        <script type="application/ld+json">{`${JSON.stringify(productSchema)}`}</script>
        <script type="application/ld+json">{`${JSON.stringify(breadcrumbSchema)}`}</script>
      </Helmet>
      
      <Header />
      
      <main className="pt-24 pb-16 min-h-screen bg-background">
        <div className="container mx-auto px-4">
          <Link href="/#loja">
            <Button variant="ghost" className="mb-6" data-testid="button-back">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar à Loja
            </Button>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <div className="space-y-4">
              <div className="relative aspect-square rounded-xl overflow-hidden bg-muted">
                {allMedia[selectedImageIndex]?.type === 'video' ? (
                  <CustomVideoPlayer
                    src={allMedia[selectedImageIndex].url}
                    poster={product.image}
                    autoPlay={true}
                    loop={allMedia.filter(m => m.type === 'video').length <= 1}
                    className="w-full h-full"
                    productName={product.name}
                    productPrice={product.price}
                    onOrder={handleWhatsAppOrder}
                    onEnded={() => {
                      const videoItems = allMedia.map((m, i) => ({ ...m, index: i })).filter(m => m.type === 'video');
                      if (videoItems.length > 1) {
                        const currentVideoIndex = videoItems.findIndex(v => v.index === selectedImageIndex);
                        const nextVideoIndex = (currentVideoIndex + 1) % videoItems.length;
                        setSelectedImageIndex(videoItems[nextVideoIndex].index);
                      }
                    }}
                  />
                ) : (
                  <img
                    src={allMedia[selectedImageIndex]?.url || product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    data-testid="img-product-main"
                  />
                )}
                
                {allMedia.length > 1 && (
                  <>
                    <Button
                      size="icon"
                      variant="secondary"
                      className="absolute left-2 top-1/2 -translate-y-1/2 opacity-80 hover:opacity-100"
                      onClick={prevMedia}
                      data-testid="button-prev-media"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </Button>
                    <Button
                      size="icon"
                      variant="secondary"
                      className="absolute right-2 top-1/2 -translate-y-1/2 opacity-80 hover:opacity-100"
                      onClick={nextMedia}
                      data-testid="button-next-media"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </Button>
                  </>
                )}
                
                {product.featured && (
                  <Badge className="absolute top-4 right-4 bg-primary" data-testid="badge-featured">
                    Destaque
                  </Badge>
                )}

                {allMedia[selectedImageIndex]?.type === 'video' && (
                  <Badge className="absolute top-4 left-4 bg-black/70" data-testid="badge-video">
                    <Play className="w-3 h-3 mr-1" />
                    Vídeo
                  </Badge>
                )}
              </div>

              {allMedia.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {allMedia.map((media, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImageIndex === index
                          ? "border-primary"
                          : "border-transparent opacity-70 hover:opacity-100"
                      }`}
                      data-testid={`button-thumbnail-${index}`}
                    >
                      {media.type === 'video' ? (
                        <>
                          <video
                            src={media.url}
                            className="w-full h-full object-cover"
                            muted
                            playsInline
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                            <Play className="w-6 h-6 text-white" />
                          </div>
                        </>
                      ) : (
                        <img
                          src={media.url}
                          alt={`${product.name} - ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div>
                <Badge variant="secondary" className="mb-3" data-testid="badge-category">
                  {categories[product.category] || product.category}
                </Badge>
                <h1 className="text-3xl md:text-4xl font-bold mb-2" data-testid="text-product-name">
                  {product.name}
                </h1>
                <p className="text-lg text-muted-foreground" data-testid="text-product-description">
                  {product.description}
                </p>
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-primary" data-testid="text-product-price">
                  {formatPrice(product.price)}
                </span>
              </div>

              {product.fullDescription && (
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold mb-3">Descrição Detalhada</h3>
                    <p className="text-muted-foreground whitespace-pre-line" data-testid="text-full-description">
                      {product.fullDescription}
                    </p>
                  </CardContent>
                </Card>
              )}

              {product.features && product.features.length > 0 && (
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold mb-3">Características</h3>
                    <ul className="space-y-2">
                      {product.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2" data-testid={`text-feature-${index}`}>
                          <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button
                  size="lg"
                  className="flex-1 gap-2"
                  onClick={handleWhatsAppOrder}
                  data-testid="button-order"
                >
                  <MessageCircle className="w-5 h-5" />
                  Encomendar via WhatsApp
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={handleShare}
                  data-testid="button-share"
                >
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>

              <p className="text-sm text-muted-foreground text-center">
                Entre em contacto para mais informações sobre este produto.
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default ProductDetail;
