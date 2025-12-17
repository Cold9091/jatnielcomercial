import React, { useState, useEffect, useRef } from 'react';

interface ProcessStep {
  title: string;
  description: string;
  icon: string;
}

const webDevelopmentProcess: ProcessStep[] = [
  {
    title: "Briefing e Análise",
    description: "Reunimos todas as suas necessidades, objetivos e referências para entender profundamente seu projeto.",
    icon: "clipboard-list"
  },
  {
    title: "Planejamento",
    description: "Criamos um plano detalhado com arquitetura de informação, wireframes e cronograma de execução.",
    icon: "sitemap"
  },
  {
    title: "Design da Interface",
    description: "Desenvolvemos layouts responsivos focados em experiência do usuário e identidade visual.",
    icon: "paint-brush"
  },
  {
    title: "Desenvolvimento",
    description: "Codificamos seu site com tecnologias modernas garantindo performance e responsividade.",
    icon: "code"
  },
  {
    title: "Testes e Revisão",
    description: "Realizamos testes abrangentes para garantir funcionalidade em todos os dispositivos e navegadores.",
    icon: "bug"
  },
  {
    title: "Lançamento",
    description: "Publicação do site, configuração de SEO e monitoramento inicial de desempenho.",
    icon: "rocket"
  },
  {
    title: "Suporte Contínuo",
    description: "Oferecemos manutenção, atualizações e suporte técnico para manter seu site sempre atual.",
    icon: "headset"
  }
];

const WorkProcess: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const timelineRef = useRef<HTMLDivElement>(null);

  // Detectar quando a seção está visível na tela
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (timelineRef.current) {
      observer.observe(timelineRef.current);
    }

    return () => {
      if (timelineRef.current) {
        observer.unobserve(timelineRef.current);
      }
    };
  }, []);

  // Efeito de auto-play para os passos da timeline
  useEffect(() => {
    if (!isVisible) return;
    
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % webDevelopmentProcess.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [isVisible]);

  return (
    <section id="processo" className="py-16 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-poppins font-bold mb-4 text-gray-900 dark:text-white">Nosso Processo de Trabalho</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Conheça as etapas do nosso método para entregar projetos de excelência, com foco em qualidade e resultados.
          </p>
        </div>
        
        <div ref={timelineRef} className="max-w-5xl mx-auto">
          {/* Timeline visual - visível apenas em telas maiores */}
          <div className="hidden md:block relative mb-16">
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-700 transform -translate-y-1/2"></div>
            
            <div className="relative flex justify-between">
              {webDevelopmentProcess.map((step, index) => (
                <div 
                  key={index}
                  className="relative"
                  onClick={() => setActiveStep(index)}
                >
                  <div 
                    className={`
                      w-10 h-10 rounded-full flex items-center justify-center cursor-pointer z-10
                      transition-all duration-500 transform
                      ${index <= activeStep 
                        ? 'gradient-bg text-white scale-110' 
                        : 'bg-white dark:bg-gray-900 text-gray-400 border-2 border-gray-200 dark:border-gray-700'
                      }
                      ${index === activeStep ? 'scale-125 shadow-lg' : ''}
                    `}
                  >
                    <i className={`fas fa-${step.icon} text-sm`}></i>
                  </div>
                  
                  <div 
                    className={`
                      absolute top-12 left-1/2 transform -translate-x-1/2 w-max max-w-[150px]
                      text-center text-xs font-medium transition-opacity duration-300
                      ${index === activeStep ? 'opacity-100' : 'opacity-0'}
                    `}
                  >
                    <p className="text-primary-dark dark:text-primary-light">{step.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Detalhes do passo ativo */}
          <div 
            className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 transform transition-all duration-500 animate-fade-in"
            style={{ animationDelay: '300ms' }}
          >
            <div className="flex flex-col md:flex-row items-center">
              <div className="mb-6 md:mb-0 md:mr-8">
                <div className="w-20 h-20 rounded-full gradient-bg flex items-center justify-center text-white animate-pulse-subtle">
                  <i className={`fas fa-${webDevelopmentProcess[activeStep].icon} text-3xl`}></i>
                </div>
              </div>
              
              <div>
                <div className="flex items-center mb-2">
                  <span className="bg-primary-light/20 text-primary-dark dark:text-primary-light px-2 py-0.5 rounded text-sm font-semibold mr-2">
                    Etapa {activeStep + 1}
                  </span>
                  <h3 className="text-2xl font-poppins font-bold text-gray-900 dark:text-white">
                    {webDevelopmentProcess[activeStep].title}
                  </h3>
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 text-lg">
                  {webDevelopmentProcess[activeStep].description}
                </p>
                
                {/* Navegação mobile */}
                <div className="mt-6 flex flex-wrap gap-2 md:hidden">
                  {webDevelopmentProcess.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveStep(index)}
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        index === activeStep 
                          ? 'gradient-bg text-white' 
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Navegação desktop */}
          <div className="hidden md:flex justify-center mt-10 space-x-2">
            {webDevelopmentProcess.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveStep(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === activeStep 
                    ? 'gradient-bg transform scale-125' 
                    : 'bg-gray-300 dark:bg-gray-600'
                }`}
                aria-label={`Ver etapa ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkProcess;