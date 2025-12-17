import React from "react";
import { Logo } from "@/lib/Logo";
import { getWhatsAppLink } from "@/lib/utils";

interface ValueItem {
  icon: string;
  title: string;
  description: string;
}

const coreValues: ValueItem[] = [
  {
    icon: "medal",
    title: "Excelência",
    description: "Buscamos a excelência em tudo o que fazemos, garantindo produtos e serviços de qualidade superior."
  },
  {
    icon: "handshake",
    title: "Compromisso",
    description: "Comprometidos com a satisfação total dos nossos clientes e com o crescimento sustentável da comunidade."
  },
  {
    icon: "users",
    title: "Desenvolvimento Social",
    description: "Investimos no desenvolvimento profissional de jovens, criando oportunidades de emprego e reduzindo o desemprego."
  },
  {
    icon: "lightbulb",
    title: "Inovação",
    description: "Constantemente buscamos soluções inovadoras que atendam às necessidades do mercado em evolução."
  }
];

const AboutUs: React.FC = () => {
  return (
    <section id="sobre" className="py-16 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-poppins font-bold mb-4 text-gray-900 dark:text-white">Sobre Nós</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Conheça a Jatniel Comercial, nossos valores e nossa visão para o futuro.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 mb-16">
          <div className="lg:w-1/2 animate-slide-up">
            <div className="flex items-center mb-8">
              <Logo className="h-20" />
              <div className="ml-4">
                <h3 className="text-2xl font-poppins font-bold text-gray-900 dark:text-white">Jatniel Comercial</h3>
                <div className="h-1 w-24 gradient-bg rounded-full mt-2"></div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8 transform transition-transform hover:scale-[1.01]">
              <h4 className="text-xl font-poppins font-bold mb-4 text-primary-dark dark:text-primary-light flex items-center">
                <i className="fas fa-flag mr-2"></i> Nossa Missão
              </h4>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-primary-light mr-2 mt-1"></i>
                  <p className="text-gray-700 dark:text-gray-300">
                    Consolidar a inquestionável qualidade global dos nossos produtos e serviços, estabelecendo-nos como líderes de mercado.
                  </p>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-primary-light mr-2 mt-1"></i>
                  <p className="text-gray-700 dark:text-gray-300">
                    Satisfazer com excelência as necessidades e expectativas dos nossos clientes.
                  </p>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-primary-light mr-2 mt-1"></i>
                  <p className="text-gray-700 dark:text-gray-300">
                    Ser líderes na qualidade de produtos eletrônicos, gerando valor econômico e impacto social positivo.
                  </p>
                </li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 transform transition-transform hover:scale-[1.01]">
              <h4 className="text-xl font-poppins font-bold mb-4 text-primary-dark dark:text-primary-light flex items-center">
                <i className="fas fa-bullseye mr-2"></i> Nosso Objetivo
              </h4>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Promover o crescimento sustentável da nossa empresa, visando assegurar no futuro a criação de empregos de qualidade para os jovens angolanos, contribuindo assim para a redução gradual da taxa de desemprego e para o desenvolvimento econômico do país.
              </p>
              <div className="h-1 w-32 gradient-bg rounded-full my-4"></div>
              <p className="text-gray-700 dark:text-gray-300 italic">
                "Estamos comprometidos com a excelência e com a criação de um futuro próspero para Angola através da inovação e do desenvolvimento de talentos locais."
              </p>
            </div>
          </div>
          
          <div className="lg:w-1/2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {coreValues.map((value, index) => (
                <div 
                  key={index} 
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col items-center text-center animate-slide-up"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="w-16 h-16 rounded-full gradient-bg flex items-center justify-center mb-4">
                    <i className={`fas fa-${value.icon} text-white text-2xl`}></i>
                  </div>
                  <h5 className="font-poppins font-bold text-lg mb-2 text-gray-900 dark:text-white">{value.title}</h5>
                  <p className="text-gray-600 dark:text-gray-400">{value.description}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-8 bg-gradient-to-r from-primary-dark to-primary-light rounded-xl shadow-lg overflow-hidden">
              <div className="p-8 text-white">
                <h4 className="text-xl font-poppins font-bold mb-4">Junte-se à Nossa Jornada</h4>
                <p className="mb-6 opacity-90">
                  Na Jatniel Comercial, acreditamos em construir um futuro melhor através da tecnologia e da educação. 
                  Queremos fazer a diferença na vida das pessoas e no desenvolvimento de Angola.
                </p>
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                  <a 
                    href={getWhatsAppLink("Olá, gostaria de conhecer melhor a Jatniel Comercial")} 
                    className="bg-white text-primary-dark font-poppins font-medium py-2 px-6 rounded-full inline-flex items-center justify-center hover:bg-gray-100 transition duration-300"
                  >
                    <i className="fab fa-whatsapp mr-2"></i>
                    Entre em Contato
                  </a>
                  <button 
                    onClick={() => document.getElementById('contacto')?.scrollIntoView({behavior: 'smooth'})}
                    className="bg-transparent border-2 border-white text-white font-poppins font-medium py-2 px-6 rounded-full inline-flex items-center justify-center hover:bg-white/10 transition duration-300"
                  >
                    <i className="fas fa-envelope mr-2"></i>
                    Envie uma Mensagem
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;