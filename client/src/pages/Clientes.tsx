import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Play, Pause, Image as ImageIcon, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet";

interface MediaItem {
  type: "image" | "video";
  url: string;
  title?: string;
}

interface ClientProject {
  id: string;
  name: string;
  description: string;
  media: MediaItem[];
}

const clientProjects: ClientProject[] = [
  {
    id: "banco-bfa",
    name: "Banco BFA",
    description: "Serviço de organização e identificação corporativa realizado para o Banco BFA.",
    media: [
      { type: "image", url: "https://res.cloudinary.com/dl90hjhoj/image/upload/v1765910658/WhatsApp_Image_2025-12-16_at_17.37.32_x7dn9v.jpg" },
      { type: "image", url: "https://res.cloudinary.com/dl90hjhoj/image/upload/v1765910658/WhatsApp_Image_2025-12-16_at_17.37.32_1_i5hupi.jpg" },
      { type: "image", url: "https://res.cloudinary.com/dl90hjhoj/image/upload/v1765910658/WhatsApp_Image_2025-12-16_at_17.37.32_2_ojfssw.jpg" },
      { type: "image", url: "https://res.cloudinary.com/dl90hjhoj/image/upload/v1765910660/WhatsApp_Image_2025-12-16_at_17.38.28_mqwkgr.jpg" },
      { type: "image", url: "https://res.cloudinary.com/dl90hjhoj/image/upload/v1765910659/WhatsApp_Image_2025-12-16_at_17.38.27_gvg9fp.jpg" },
      { type: "video", url: "https://res.cloudinary.com/dl90hjhoj/video/upload/v1765910665/WhatsApp_Video_2025-12-16_at_17.37.40_wb5izz.mp4" },
      { type: "video", url: "https://res.cloudinary.com/dl90hjhoj/video/upload/v1765910677/WhatsApp_Video_2025-12-16_at_17.38.00_xlkmi4.mp4" },
    ],
  },
];

function MediaGallery({ project }: { project: ClientProject }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const currentMedia = project.media[currentIndex];

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % project.media.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + project.media.length) % project.media.length);
  };

  useEffect(() => {
    if (isPaused) return;

    if (currentMedia.type === "image") {
      timerRef.current = setTimeout(() => {
        goToNext();
      }, 10000);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [currentIndex, isPaused, currentMedia.type]);

  useEffect(() => {
    if (currentMedia.type === "video" && videoRef.current) {
      videoRef.current.currentTime = 0;
      if (!isPaused) {
        videoRef.current.play().catch(() => {});
      }
    }
  }, [currentIndex, currentMedia.type, isPaused]);

  const handleVideoEnded = () => {
    goToNext();
  };

  const togglePause = () => {
    setIsPaused(!isPaused);
    if (currentMedia.type === "video" && videoRef.current) {
      if (isPaused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  };

  return (
    <Card className="overflow-hidden" data-testid={`card-project-${project.id}`}>
      <CardHeader className="flex flex-row items-center justify-between gap-4 flex-wrap">
        <div>
          <CardTitle data-testid={`text-project-name-${project.id}`}>{project.name}</CardTitle>
          <p className="text-sm text-muted-foreground mt-1">{project.description}</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary">
            <ImageIcon className="w-3 h-3 mr-1" />
            {project.media.filter((m) => m.type === "image").length}
          </Badge>
          <Badge variant="secondary">
            <Video className="w-3 h-3 mr-1" />
            {project.media.filter((m) => m.type === "video").length}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="relative aspect-[4/3] md:aspect-video max-h-[500px] bg-black">
          {currentMedia.type === "video" ? (
            <video
              ref={videoRef}
              src={currentMedia.url}
              className="w-full h-full object-contain"
              muted
              playsInline
              onEnded={handleVideoEnded}
              data-testid={`video-player-${project.id}`}
            />
          ) : (
            <img
              src={currentMedia.url}
              alt={`${project.name} - ${currentIndex + 1}`}
              className="w-full h-full object-contain"
              data-testid={`img-gallery-${project.id}`}
            />
          )}

          <div className="absolute top-4 left-4 flex items-center gap-2">
            <Badge className="bg-black/70">
              {currentMedia.type === "video" ? (
                <>
                  <Video className="w-3 h-3 mr-1" />
                  Vídeo
                </>
              ) : (
                <>
                  <ImageIcon className="w-3 h-3 mr-1" />
                  Imagem
                </>
              )}
            </Badge>
            <Badge className="bg-black/70">
              {currentIndex + 1} / {project.media.length}
            </Badge>
          </div>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
            <Button
              size="icon"
              variant="secondary"
              className="opacity-80 hover:opacity-100"
              onClick={goToPrev}
              data-testid={`button-prev-${project.id}`}
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              size="icon"
              variant="secondary"
              className="opacity-80 hover:opacity-100"
              onClick={togglePause}
              data-testid={`button-pause-${project.id}`}
            >
              {isPaused ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
            </Button>
            <Button
              size="icon"
              variant="secondary"
              className="opacity-80 hover:opacity-100"
              onClick={goToNext}
              data-testid={`button-next-${project.id}`}
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>

          {currentMedia.type === "image" && !isPaused && (
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/30">
              <div
                className="h-full bg-primary transition-all duration-100"
                style={{
                  animation: "progress 10s linear",
                }}
              />
            </div>
          )}
        </div>

        <div className="p-4">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {project.media.map((media, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`relative flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                  currentIndex === index
                    ? "border-primary"
                    : "border-transparent opacity-70 hover:opacity-100"
                }`}
                data-testid={`button-thumb-${project.id}-${index}`}
              >
                {media.type === "video" ? (
                  <>
                    <video src={media.url} className="w-full h-full object-cover" muted playsInline />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <Play className="w-4 h-4 text-white" />
                    </div>
                  </>
                ) : (
                  <img src={media.url} alt="" className="w-full h-full object-cover" />
                )}
              </button>
            ))}
          </div>
        </div>
      </CardContent>

      <style>{`
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </Card>
  );
}

const SITE_URL = "https://jatnielcomercial.ao";

const portfolioSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Portfólio de Clientes - Jatniel Comercial",
  "description": "Galeria de trabalhos realizados para clientes em Angola",
  "url": `${SITE_URL}/clientes`,
  "isPartOf": {
    "@type": "WebSite",
    "name": "Jatniel Comercial",
    "url": SITE_URL
  }
};

export default function Clientes() {
  return (
    <>
      <Helmet>
        <title>Portfólio de Clientes Angola | Jatniel Comercial - Trabalhos Realizados</title>
        <meta
          name="description"
          content="Veja os trabalhos realizados pela Jatniel Comercial para clientes em Angola. Galeria de projetos de design gráfico, desenvolvimento web e organização corporativa. Banco BFA e mais."
        />
        <meta name="keywords" content="portfólio Angola, trabalhos realizados Angola, clientes Jatniel, design gráfico Angola, projetos Luanda, Banco BFA" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`${SITE_URL}/clientes`} />
        
        <meta property="og:title" content="Portfólio de Clientes | Jatniel Comercial Angola" />
        <meta property="og:description" content="Galeria de trabalhos realizados para nossos clientes em Angola." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${SITE_URL}/clientes`} />
        <meta property="og:locale" content="pt_AO" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Portfólio de Clientes | Jatniel Comercial" />
        <meta name="twitter:description" content="Trabalhos realizados para clientes em Angola." />
        
      </Helmet>
      <Helmet>
        <script type="application/ld+json">{`${JSON.stringify(portfolioSchema)}`}</script>
      </Helmet>

      <Header />

      <main className="pt-24 pb-16 min-h-screen bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-page-title">
              Nossos Clientes
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Conheça alguns dos trabalhos que realizamos para nossos clientes. Cada projeto é uma
              prova do nosso compromisso com a qualidade e excelência.
            </p>
          </div>

          <div className="space-y-8">
            {clientProjects.map((project) => (
              <MediaGallery key={project.id} project={project} />
            ))}
          </div>

          {clientProjects.length === 0 && (
            <Card className="py-12 text-center">
              <CardContent>
                <p className="text-muted-foreground">Nenhum projeto disponível no momento.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
