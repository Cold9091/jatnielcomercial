import React from "react";
import { getWhatsAppLink } from "@/lib/utils";

interface DesignServiceItem {
  icon: string;
  title: string;
  description: string;
  features: string[];
}

const designServices: DesignServiceItem[] = [
  {
    icon: "palette",
    title: "Criação de Logotipos",
    description: "Logotipos profissionais que capturam a essência da sua marca e criam uma identidade visual memorável.",
    features: [
      "Design exclusivo e personalizado",
      "Estudo de cores e psicologia visual",
      "Múltiplas versões e formatos",
      "Arquivos em alta resolução"
    ]
  },
  {
    icon: "copyright",
    title: "Construção de Marca",
    description: "Desenvolvimento completo de identidade visual para estabelecer uma marca coerente e profissional.",
    features: [
      "Desenvolvimento de identidade visual",
      "Manual de identidade da marca",
      "Papelaria corporativa",
      "Guidelines de aplicação da marca"
    ]
  },
  {
    icon: "ad",
    title: "Banners Publicitários",
    description: "Criação de banners atrativos para campanhas digitais e impressas que convertem visualizações em clientes.",
    features: [
      "Banners para redes sociais",
      "Banners para sites e blogs",
      "Material para outdoors",
      "Formatos adaptados para cada plataforma"
    ]
  }
];

const DesignServices: React.FC = () => {
  return (
    <section id="design" className="py-16 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-poppins font-bold mb-4 text-gray-900 dark:text-white">Serviços de Design</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Projetos de design gráfico profissional para elevar sua marca e criar uma presença visual impactante.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {designServices.map((service, idx) => (
            <div 
              key={idx} 
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 animate-slide-up"
              style={{ animationDelay: `${idx * 150}ms` }}
            >
              <div className="p-1 gradient-bg"></div>
              <div className="p-6">
                <div className="w-16 h-16 mb-6 rounded-full gradient-bg flex items-center justify-center">
                  <i className={`fas fa-${service.icon} text-white text-2xl`}></i>
                </div>
                <h3 className="text-xl font-poppins font-bold mb-3 text-gray-900 dark:text-white">{service.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">{service.description}</p>
                
                <div className="space-y-2 mb-6">
                  {service.features.map((feature, fidx) => (
                    <div key={fidx} className="flex items-center">
                      <i className="fas fa-check text-primary-light mr-2"></i>
                      <span className="text-gray-700 dark:text-gray-300 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <a 
                  href={getWhatsAppLink(`Olá, gostaria de saber mais sobre o serviço de ${service.title}`)}
                  className="block w-full py-2 text-center rounded-md gradient-bg text-white font-medium transition-all duration-300 hover:shadow-md btn-hover"
                >
                  Solicitar Orçamento
                </a>
              </div>
            </div>
          ))}
        </div>
        
        <div className="bg-gradient-to-r from-primary-dark to-primary-light rounded-xl shadow-lg p-8 md:p-12 text-white animate-fade-in">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-2/3 mb-8 lg:mb-0">
              <h3 className="text-2xl font-poppins font-bold mb-4">Design Personalizado para Suas Necessidades</h3>
              <p className="mb-6 opacity-90">
                Todos os nossos serviços de design são personalizados para atender às necessidades específicas do seu negócio. 
                Trabalhamos em estreita colaboração com você para garantir que sua visão seja transformada em realidade.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mr-3">
                    <i className="fas fa-paint-brush text-white"></i>
                  </div>
                  <span>Design Criativo</span>
                </div>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mr-3">
                    <i className="fas fa-desktop text-white"></i>
                  </div>
                  <span>Formatos Digitais</span>
                </div>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mr-3">
                    <i className="fas fa-print text-white"></i>
                  </div>
                  <span>Materiais Impressos</span>
                </div>
              </div>
            </div>
            <div className="lg:w-1/3 lg:text-right">
              <a 
                href={getWhatsAppLink("Olá, gostaria de um orçamento para serviços de design")}
                className="inline-block bg-white text-primary-dark font-poppins font-medium py-3 px-8 rounded-full hover:bg-gray-100 transition duration-300 shadow-lg"
              >
                <i className="fas fa-envelope mr-2"></i>
                Solicitar Proposta Completa
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DesignServices;