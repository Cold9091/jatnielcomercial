import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ShoppingBag, Filter, MessageCircle, Eye, Play } from "lucide-react";
import { getWhatsAppLink } from "@/lib/utils";
import type { Product } from "@shared/schema";

const categories = [
  { id: "all", label: "Todos" },
  { id: "organizacao", label: "Organização" },
  { id: "servicos", label: "Serviços" },
  { id: "design", label: "Design Gráfico" },
  { id: "web", label: "Desenvolvimento Web" },
];

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("pt-AO", {
    style: "currency",
    currency: "AOA",
    minimumFractionDigits: 0,
  }).format(price);
};

interface StoreProps {
  isFullPage?: boolean;
}

const Store = ({ isFullPage = false }: StoreProps) => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const queryUrl = selectedCategory === "all" 
    ? "/api/products" 
    : `/api/products?category=${selectedCategory}`;

  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: [queryUrl],
  });

  const handleWhatsAppOrder = (product: Product) => {
    const message = `Olá! Tenho interesse no produto:\n\n*${product.name}*\nPreço: ${formatPrice(product.price)}\n\nGostaria de mais informações.`;
    window.open(getWhatsAppLink(message), "_blank");
  };

  return (
    <section id="loja" className={isFullPage ? "py-8" : "py-16 bg-muted/30"}>
      <div className="container mx-auto px-4">
        {!isFullPage && (
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4" data-testid="badge-store">
              <ShoppingBag className="w-3 h-3 mr-1" />
              Loja
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-store-title">
              Nossos Produtos e Serviços
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto" data-testid="text-store-description">
              Explore nossa gama de produtos e serviços de design gráfico e desenvolvimento web. 
              Entre em contacto para encomendar ou obter mais informações.
            </p>
          </div>
        )}

        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <Filter className="w-5 h-5 text-muted-foreground mr-2 self-center" />
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
              data-testid={`button-category-${category.id}`}
            >
              {category.label}
            </Button>
          ))}
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="h-48 w-full" />
                <CardContent className="p-4">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full mb-4" />
                  <Skeleton className="h-8 w-1/2" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products?.map((product) => (
              <Card 
                key={product.id} 
                className="overflow-hidden card-hover group"
                data-testid={`card-product-${product.id}`}
              >
                <Link href={`/produto/${product.id}`}>
                  <div className="relative overflow-hidden cursor-pointer">
                    {product.video ? (
                      <video
                        src={product.video}
                        className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                        muted
                        loop
                        playsInline
                        title={`Vídeo de ${product.name} - Jatniel Comercial Angola`}
                        onMouseEnter={(e) => e.currentTarget.play()}
                        onMouseLeave={(e) => {
                          e.currentTarget.pause();
                          e.currentTarget.currentTime = 0;
                        }}
                        data-testid={`video-product-${product.id}`}
                      />
                    ) : (
                      <img
                        src={product.image}
                        alt={`${product.name} - ${categories.find(c => c.id === product.category)?.label || product.category} disponível em Angola - Jatniel Comercial`}
                        title={product.name}
                        loading="lazy"
                        className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                        data-testid={`img-product-${product.id}`}
                      />
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="bg-white dark:bg-gray-800 rounded-full p-3">
                          {product.video ? (
                            <Play className="w-5 h-5 text-primary" />
                          ) : (
                            <Eye className="w-5 h-5 text-primary" />
                          )}
                        </div>
                      </div>
                    </div>
                    {product.video && (
                      <Badge 
                        className="absolute top-2 left-2 bg-black/70"
                        data-testid={`badge-video-${product.id}`}
                      >
                        <Play className="w-3 h-3 mr-1" />
                        Vídeo
                      </Badge>
                    )}
                    {product.featured && (
                      <Badge 
                        className="absolute top-2 right-2 bg-primary"
                        data-testid={`badge-featured-${product.id}`}
                      >
                        Destaque
                      </Badge>
                    )}
                    <Badge 
                      variant="secondary" 
                      className="absolute bottom-2 left-2"
                      data-testid={`badge-category-${product.id}`}
                    >
                      {categories.find(c => c.id === product.category)?.label || product.category}
                    </Badge>
                  </div>
                </Link>
                <CardContent className="p-4">
                  <Link href={`/produto/${product.id}`}>
                    <h3 
                      className="font-semibold text-lg mb-2 line-clamp-1 cursor-pointer transition-colors"
                      style={{ color: '#111827' }}
                      onMouseEnter={(e) => e.currentTarget.style.color = '#3b82f6'}
                      onMouseLeave={(e) => e.currentTarget.style.color = '#111827'}
                      data-testid={`text-product-name-${product.id}`}
                    >
                      {product.name}
                    </h3>
                  </Link>
                  <p 
                    className="text-sm text-muted-foreground mb-4 line-clamp-2"
                    data-testid={`text-product-description-${product.id}`}
                  >
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <span 
                      className="text-xl font-bold text-primary"
                      data-testid={`text-product-price-${product.id}`}
                    >
                      {formatPrice(product.price)}
                    </span>
                    <div className="flex gap-1">
                      <Link href={`/produto/${product.id}`}>
                        <Button
                          size="sm"
                          variant="outline"
                          data-testid={`button-view-${product.id}`}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Button
                        size="sm"
                        onClick={(e) => {
                          e.preventDefault();
                          handleWhatsAppOrder(product);
                        }}
                        className="gap-1"
                        data-testid={`button-order-${product.id}`}
                      >
                        <MessageCircle className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {products?.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <p className="text-muted-foreground" data-testid="text-no-products">
              Nenhum produto encontrado nesta categoria.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Store;
