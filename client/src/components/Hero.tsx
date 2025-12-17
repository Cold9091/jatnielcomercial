import { scrollToElement } from "@/lib/utils";
import { useEffect, useState } from "react";
import heroImage from "@assets/Imagem WhatsApp 2025-05-07 às 21.26.24_3b505a7b.jpg";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Aplicar animação após carregamento do componente
    setIsVisible(true);
  }, []);

  return (
    <section id="inicio" className="pt-24 pb-10 sm:pt-28 md:pt-32 lg:pt-40 md:pb-16 lg:pb-24 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center">
          <div className={`w-full md:w-1/2 mb-8 sm:mb-10 md:mb-0 transition-all duration-700 transform ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-poppins font-bold leading-tight mb-3 sm:mb-4 text-gray-900 dark:text-white">
              Produtos <span className="gradient-text">eletrônicos de qualidade</span> e soluções corporativas
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-6 sm:mb-8">
              Fornecemos produtos eletrônicos de qualidade e porta-documentos magnéticos personalizados para organização, identificação e eficiência no ambiente corporativo.
            </p>
            <div className="flex flex-wrap gap-3 sm:gap-4">
              <button 
                onClick={() => scrollToElement("servicos")}
                className="gradient-bg text-white font-poppins font-medium py-2.5 sm:py-3 px-6 sm:px-8 rounded-full shadow-lg hover:shadow-xl transition duration-300 text-center btn-hover text-sm sm:text-base w-full sm:w-auto"
                data-testid="button-services"
              >
                Serviços Web
              </button>
              <button 
                onClick={() => window.location.href = "/loja"}
                className="bg-white dark:bg-gray-800 text-primary-dark dark:text-primary-light border-2 border-primary-dark dark:border-primary-light font-poppins font-medium py-2.5 sm:py-3 px-6 sm:px-8 rounded-full shadow-lg hover:shadow-xl transition duration-300 text-center text-sm sm:text-base w-full sm:w-auto"
                data-testid="button-store"
              >
                Loja
              </button>
            </div>
          </div>
          <div className={`w-full md:w-1/2 transition-all duration-700 transform ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'} delay-300`}>
            <div className="relative max-w-md mx-auto md:max-w-none">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-dark to-primary-light opacity-10 rounded-xl"></div>
              <img 
                src={heroImage} 
                alt="Profissional da Jatniel Comercial" 
                className="rounded-xl shadow-xl w-full h-auto hover:scale-[1.02] transition-transform duration-500 relative z-10"
              />
              
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent h-32 rounded-b-xl z-10"></div>
              <div className="absolute bottom-4 left-4 right-4 z-20 text-white">
                <p className="text-sm sm:text-base font-medium">Jatniel Comercial</p>
                <p className="text-xs sm:text-sm opacity-90">Desenvolvimento Web • Design Gráfico</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
