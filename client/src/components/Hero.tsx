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
    <section id="inicio" className="pt-32 pb-16 md:pt-40 md:pb-24 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className={`md:w-1/2 mb-10 md:mb-0 transition-all duration-700 transform ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
            <h1 className="text-4xl md:text-5xl font-poppins font-bold leading-tight mb-4 text-gray-900 dark:text-white">
              Transforme sua <span className="gradient-text">presença digital</span> com soluções profissionais
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8">
              Desenvolvimento web de alta qualidade e cursos especializados em marketing digital para impulsionar o seu negócio.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button 
                onClick={() => scrollToElement("servicos")}
                className="gradient-bg text-white font-poppins font-medium py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition duration-300 text-center btn-hover"
              >
                Ver Serviços
              </button>
              <button 
                onClick={() => scrollToElement("cursos")}
                className="bg-white dark:bg-gray-800 text-primary-dark dark:text-primary-light border-2 border-primary-dark dark:border-primary-light font-poppins font-medium py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition duration-300 text-center"
              >
                Explorar Cursos
              </button>
            </div>
          </div>
          <div className={`md:w-1/2 transition-all duration-700 transform ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'} delay-300`}>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-dark to-primary-light opacity-10 rounded-xl"></div>
              <img 
                src={heroImage} 
                alt="Profissional da Jatniel Comercial" 
                className="rounded-xl shadow-xl w-full h-auto hover:scale-[1.02] transition-transform duration-500 relative z-10"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
