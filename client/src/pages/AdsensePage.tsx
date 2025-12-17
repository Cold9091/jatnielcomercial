import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Copy, Check, ExternalLink, Video, Image as ImageIcon, Facebook, Share2 } from "lucide-react";
import { SiInstagram, SiGoogle } from "react-icons/si";
import type { Product } from "@shared/schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";

const BASE_URL = window.location.origin;

export default function AdsensePage() {
  const { toast } = useToast();
  const [copiedLinks, setCopiedLinks] = useState<Record<string, boolean>>({});

  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedLinks((prev) => ({ ...prev, [id]: true }));
      toast({
        title: "Link copiado!",
        description: "O link foi copiado para a área de transferência.",
      });
      setTimeout(() => {
        setCopiedLinks((prev) => ({ ...prev, [id]: false }));
      }, 2000);
    } catch (err) {
      toast({
        title: "Erro",
        description: "Não foi possível copiar o link.",
        variant: "destructive",
      });
    }
  };

  const getProductUrl = (productId: number) => {
    return `${BASE_URL}/produto/${productId}`;
  };

  const getFacebookShareUrl = (productUrl: string) => {
    return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(productUrl)}`;
  };

  const getInstagramCaption = (product: Product) => {
    return `${product.name}\n\n${product.description}\n\nPreço: ${product.price.toLocaleString("pt-BR")} Kz\n\nVeja mais em: ${getProductUrl(product.id)}`;
  };

  const getGoogleAdsUrl = (productUrl: string, productName: string) => {
    return `${productUrl}?utm_source=google&utm_medium=cpc&utm_campaign=${encodeURIComponent(productName.toLowerCase().replace(/\s+/g, "_"))}`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center" data-testid="loading-adsense">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">A carregar produtos...</p>
        </div>
      </div>
    );
  }

  const videoProducts = products?.filter((p) => p.video || (p.videos && p.videos.length > 0)) || [];
  const imageProducts = products?.filter((p) => p.image || (p.images && p.images.length > 0)) || [];

  return (
    <div className="min-h-screen bg-background" data-testid="page-adsense">
      <div className="container mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2" data-testid="text-title">
            Painel de Publicidade
          </h1>
          <p className="text-muted-foreground">
            Gerencie os links dos seus produtos para campanhas publicitárias
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card data-testid="card-stats-total">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-foreground">{products?.length || 0}</div>
              <p className="text-sm text-muted-foreground">Total de Produtos</p>
            </CardContent>
          </Card>
          <Card data-testid="card-stats-videos">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-foreground">{videoProducts.length}</div>
              <p className="text-sm text-muted-foreground">Produtos com Vídeo</p>
            </CardContent>
          </Card>
          <Card data-testid="card-stats-images">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-foreground">{imageProducts.length}</div>
              <p className="text-sm text-muted-foreground">Produtos com Imagens</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-6" data-testid="tabs-filter">
            <TabsTrigger value="all" data-testid="tab-all">Todos</TabsTrigger>
            <TabsTrigger value="videos" data-testid="tab-videos">
              <Video className="w-4 h-4 mr-2" />
              Vídeos
            </TabsTrigger>
            <TabsTrigger value="images" data-testid="tab-images">
              <ImageIcon className="w-4 h-4 mr-2" />
              Imagens
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <ProductList
              products={products || []}
              copyToClipboard={copyToClipboard}
              copiedLinks={copiedLinks}
              getProductUrl={getProductUrl}
              getFacebookShareUrl={getFacebookShareUrl}
              getInstagramCaption={getInstagramCaption}
              getGoogleAdsUrl={getGoogleAdsUrl}
            />
          </TabsContent>

          <TabsContent value="videos">
            <ProductList
              products={videoProducts}
              copyToClipboard={copyToClipboard}
              copiedLinks={copiedLinks}
              getProductUrl={getProductUrl}
              getFacebookShareUrl={getFacebookShareUrl}
              getInstagramCaption={getInstagramCaption}
              getGoogleAdsUrl={getGoogleAdsUrl}
              showVideos
            />
          </TabsContent>

          <TabsContent value="images">
            <ProductList
              products={imageProducts}
              copyToClipboard={copyToClipboard}
              copiedLinks={copiedLinks}
              getProductUrl={getProductUrl}
              getFacebookShareUrl={getFacebookShareUrl}
              getInstagramCaption={getInstagramCaption}
              getGoogleAdsUrl={getGoogleAdsUrl}
              showImages
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

interface ProductListProps {
  products: Product[];
  copyToClipboard: (text: string, id: string) => void;
  copiedLinks: Record<string, boolean>;
  getProductUrl: (id: number) => string;
  getFacebookShareUrl: (url: string) => string;
  getInstagramCaption: (product: Product) => string;
  getGoogleAdsUrl: (url: string, name: string) => string;
  showVideos?: boolean;
  showImages?: boolean;
}

function ProductList({
  products,
  copyToClipboard,
  copiedLinks,
  getProductUrl,
  getFacebookShareUrl,
  getInstagramCaption,
  getGoogleAdsUrl,
  showVideos,
  showImages,
}: ProductListProps) {
  if (products.length === 0) {
    return (
      <Card data-testid="card-empty">
        <CardContent className="py-12 text-center">
          <p className="text-muted-foreground">Nenhum produto encontrado</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {products.map((product) => (
        <Card key={product.id} data-testid={`card-product-${product.id}`}>
          <CardHeader className="flex flex-row items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-4 flex-wrap">
              {product.image && (
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded-md"
                  data-testid={`img-product-${product.id}`}
                />
              )}
              <div>
                <CardTitle className="text-lg" data-testid={`text-product-name-${product.id}`}>
                  {product.name}
                </CardTitle>
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  <Badge variant="secondary" data-testid={`badge-category-${product.id}`}>
                    {product.category}
                  </Badge>
                  <Badge variant="outline" data-testid={`badge-price-${product.id}`}>
                    {product.price.toLocaleString("pt-BR")} Kz
                  </Badge>
                  {product.featured && (
                    <Badge data-testid={`badge-featured-${product.id}`}>Destaque</Badge>
                  )}
                </div>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open(getProductUrl(product.id), "_blank")}
              data-testid={`button-view-${product.id}`}
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Ver Produto
            </Button>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h4 className="font-medium text-foreground flex items-center gap-2">
                <Share2 className="w-4 h-4" />
                Links para Publicidade
              </h4>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <LinkCard
                  icon={<Facebook className="w-5 h-5 text-blue-600" />}
                  title="Facebook"
                  description="Link para partilhar no Facebook"
                  url={getFacebookShareUrl(getProductUrl(product.id))}
                  copyId={`fb-${product.id}`}
                  copyToClipboard={copyToClipboard}
                  copiedLinks={copiedLinks}
                  productId={product.id}
                />

                <LinkCard
                  icon={<SiInstagram className="w-5 h-5 text-pink-600" />}
                  title="Instagram"
                  description="Legenda pronta para copiar"
                  url={getInstagramCaption(product)}
                  copyId={`ig-${product.id}`}
                  copyToClipboard={copyToClipboard}
                  copiedLinks={copiedLinks}
                  isCaption
                  productId={product.id}
                />

                <LinkCard
                  icon={<SiGoogle className="w-5 h-5 text-green-600" />}
                  title="Google Ads"
                  description="Link com UTM para Google Ads"
                  url={getGoogleAdsUrl(getProductUrl(product.id), product.name)}
                  copyId={`google-${product.id}`}
                  copyToClipboard={copyToClipboard}
                  copiedLinks={copiedLinks}
                  productId={product.id}
                />
              </div>

              <div className="border-t pt-4 mt-4">
                <h5 className="text-sm font-medium text-muted-foreground mb-3">Link Direto do Produto</h5>
                <div className="flex items-center gap-2 flex-wrap">
                  <code className="bg-muted px-3 py-2 rounded-md text-sm flex-1 min-w-0 truncate" data-testid={`text-link-${product.id}`}>
                    {getProductUrl(product.id)}
                  </code>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(getProductUrl(product.id), `direct-${product.id}`)}
                    data-testid={`button-copy-direct-${product.id}`}
                  >
                    {copiedLinks[`direct-${product.id}`] ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>
            </div>

            {(showVideos || (!showVideos && !showImages)) && product.video && (
              <div className="border-t pt-4">
                <h5 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
                  <Video className="w-4 h-4" />
                  Vídeo Principal
                </h5>
                <div className="flex items-center gap-2 flex-wrap">
                  <code className="bg-muted px-3 py-2 rounded-md text-sm flex-1 min-w-0 truncate" data-testid={`text-video-${product.id}`}>
                    {product.video}
                  </code>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(product.video!, `video-${product.id}`)}
                    data-testid={`button-copy-video-${product.id}`}
                  >
                    {copiedLinks[`video-${product.id}`] ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>
            )}

            {(showVideos || (!showVideos && !showImages)) && product.videos && product.videos.length > 0 && (
              <div className="border-t pt-4">
                <h5 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
                  <Video className="w-4 h-4" />
                  Vídeos Adicionais ({product.videos.length})
                </h5>
                <ScrollArea className="max-h-32">
                  <div className="space-y-2">
                    {product.videos.map((video, index) => (
                      <div key={index} className="flex items-center gap-2 flex-wrap">
                        <code className="bg-muted px-3 py-2 rounded-md text-sm flex-1 min-w-0 truncate" data-testid={`text-video-extra-${product.id}-${index}`}>
                          {video}
                        </code>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyToClipboard(video, `video-extra-${product.id}-${index}`)}
                          data-testid={`button-copy-video-extra-${product.id}-${index}`}
                        >
                          {copiedLinks[`video-extra-${product.id}-${index}`] ? (
                            <Check className="w-4 h-4" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            )}

            {(showImages || (!showVideos && !showImages)) && product.images && product.images.length > 0 && (
              <div className="border-t pt-4">
                <h5 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
                  <ImageIcon className="w-4 h-4" />
                  Imagens ({product.images.length})
                </h5>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {product.images.map((image, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-24 object-cover rounded-md"
                        data-testid={`img-gallery-${product.id}-${index}`}
                      />
                      <Button
                        variant="secondary"
                        size="sm"
                        className="absolute bottom-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => copyToClipboard(image, `image-${product.id}-${index}`)}
                        data-testid={`button-copy-image-${product.id}-${index}`}
                      >
                        {copiedLinks[`image-${product.id}-${index}`] ? (
                          <Check className="w-3 h-3" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

interface LinkCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  url: string;
  copyId: string;
  copyToClipboard: (text: string, id: string) => void;
  copiedLinks: Record<string, boolean>;
  isCaption?: boolean;
  productId: number;
}

function LinkCard({
  icon,
  title,
  description,
  url,
  copyId,
  copyToClipboard,
  copiedLinks,
  isCaption,
  productId,
}: LinkCardProps) {
  return (
    <div className="bg-muted/50 rounded-lg p-4" data-testid={`card-link-${title.toLowerCase()}-${productId}`}>
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <span className="font-medium text-foreground">{title}</span>
      </div>
      <p className="text-xs text-muted-foreground mb-3">{description}</p>
      {isCaption ? (
        <div className="space-y-2">
          <div className="bg-background rounded-md p-2 text-xs text-muted-foreground max-h-20 overflow-hidden">
            {url.substring(0, 100)}...
          </div>
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={() => copyToClipboard(url, copyId)}
            data-testid={`button-copy-${copyId}`}
          >
            {copiedLinks[copyId] ? (
              <>
                <Check className="w-4 h-4 mr-2" />
                Copiado!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 mr-2" />
                Copiar Legenda
              </>
            )}
          </Button>
        </div>
      ) : (
        <Button
          variant="outline"
          size="sm"
          className="w-full"
          onClick={() => copyToClipboard(url, copyId)}
          data-testid={`button-copy-${copyId}`}
        >
          {copiedLinks[copyId] ? (
            <>
              <Check className="w-4 h-4 mr-2" />
              Copiado!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 mr-2" />
              Copiar Link
            </>
          )}
        </Button>
      )}
    </div>
  );
}
