import React, { useState, useEffect, useRef } from 'react';

interface StatItem {
  value: number;
  label: string;
  icon: string;
  suffix?: string;
  prefix?: string;
}

const stats: StatItem[] = [
  {
    value: 120,
    label: "Projetos Concluídos",
    icon: "laptop-code",
    prefix: "+"
  },
  {
    value: 98,
    label: "Clientes Satisfeitos",
    icon: "smile",
    suffix: "%"
  },
  {
    value: 5,
    label: "Anos de Experiência",
    icon: "calendar-check"
  },
  {
    value: 340,
    label: "Formandos em Marketing",
    icon: "graduation-cap",
    prefix: "+"
  }
];

const StatsCounter: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [counters, setCounters] = useState<number[]>(stats.map(() => 0));
  const sectionRef = useRef<HTMLDivElement>(null);

  // Efeito para detectar quando a seção entra na viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { 
        threshold: 0.3  // Ativa quando pelo menos 30% da seção está visível
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [isVisible]);

  // Efeito para animar os contadores quando a seção se torna visível
  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000; // Duração total da animação em ms
    const frameDuration = 1000 / 60; // Aproximadamente 60fps
    const totalFrames = Math.round(duration / frameDuration);

    let frame = 0;
    const timers: NodeJS.Timeout[] = [];

    stats.forEach((stat, index) => {
      const timer = setInterval(() => {
        frame++;
        // Usar easing para tornar a animação mais natural
        const progress = frame / totalFrames;
        const easeOutQuad = 1 - (1 - progress) * (1 - progress);
        const value = Math.floor(easeOutQuad * stat.value);
        
        setCounters(prev => {
          const newCounters = [...prev];
          newCounters[index] = value;
          return newCounters;
        });

        if (frame === totalFrames) {
          clearInterval(timer);
          
          // Garantir que o valor final seja exatamente o alvo
          setCounters(prev => {
            const newCounters = [...prev];
            newCounters[index] = stat.value;
            return newCounters;
          });
        }
      }, frameDuration);
      
      timers.push(timer);
    });

    return () => {
      timers.forEach(timer => clearInterval(timer));
    };
  }, [isVisible]);

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
      <div ref={sectionRef} className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-poppins font-bold mb-4 text-gray-900 dark:text-white">Nossos Números</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Resultados que demonstram nossa experiência e comprometimento com a excelência em cada projeto.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 text-center transform transition duration-500 hover:scale-105 hover:shadow-xl animate-slide-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="w-16 h-16 gradient-bg rounded-full flex items-center justify-center mx-auto mb-4">
                <i className={`fas fa-${stat.icon} text-white text-2xl`}></i>
              </div>
              <h3 className="text-4xl font-poppins font-bold mb-2 text-primary-dark dark:text-primary-light">
                {stat.prefix}{counters[index]}{stat.suffix}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsCounter;