import { getWhatsAppLink } from "@/lib/utils";
import instructorImage from "@assets/Imagem WhatsApp 2025-05-07 às 21.43.49_896b137f.jpg";

interface CourseModule {
  icon: string;
  title: string;
  description: string;
}

interface CourseBenefit {
  icon: string;
  title: string;
  description: string;
}

interface CourseTarget {
  icon: string;
  description: string;
}

const courseModules: CourseModule[] = [
  {
    icon: "google",
    title: "Google Ads",
    description: "Aprenda a criar campanhas eficazes no Google Search, Display e YouTube para atrair clientes qualificados."
  },
  {
    icon: "facebook",
    title: "Facebook & Instagram Ads",
    description: "Domine as estratégias de segmentação e criação de anúncios eficientes para as principais redes sociais."
  },
  {
    icon: "tiktok",
    title: "TikTok Ads",
    description: "Explore o potencial da plataforma que mais cresce atualmente com estratégias específicas para gerar engajamento."
  }
];

const courseBenefits: CourseBenefit[] = [
  {
    icon: "laptop-code",
    title: "Técnicas Práticas",
    description: "Conteúdo focado em práticas reais do mercado, com exemplos e exercícios relevantes que você pode aplicar imediatamente."
  },
  {
    icon: "bullhorn",
    title: "Estratégias de Anúncios",
    description: "Aprenda a criar e otimizar campanhas pagas que geram resultados mensuráveis e aumentam seu ROI."
  },
  {
    icon: "users",
    title: "Mentoria Personalizada",
    description: "Acompanhamento individual para aplicar as estratégias no seu negócio específico e acelerar seus resultados."
  }
];

const courseTargets: CourseTarget[] = [
  {
    icon: "store",
    description: "Quer construir um negócio online de sucesso"
  },
  {
    icon: "briefcase",
    description: "Deseja se destacar no mercado de trabalho"
  },
  {
    icon: "money-bill-wave",
    description: "Sonha em ter liberdade financeira"
  },
  {
    icon: "tools",
    description: "Busca se atualizar e dominar as ferramentas mais poderosas do marketing moderno"
  }
];

const Courses = () => {
  return (
    <section id="cursos" className="py-16 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-poppins font-bold mb-4 text-gray-900 dark:text-white">Cursos de Marketing Digital</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Desenvolva habilidades essenciais para o mercado digital e impulsione seu negócio com nossas formações práticas.
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl overflow-hidden mb-16 animate-fade-in">
          <div className="gradient-bg p-8 text-white">
            <h3 className="text-2xl md:text-3xl font-poppins font-bold mb-4">Descubra o Poder do Marketing Digital e Transforme seu Futuro!</h3>
            <p className="text-lg opacity-95 mb-3">
              Você já percebeu que quem domina o marketing digital está anos à frente no mercado?
            </p>
            <p className="text-lg opacity-95 mb-3">
              Você está pronto para dominar a arte que move o mundo dos negócios hoje?
            </p>
          </div>
          
          <div className="p-8">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="lg:w-2/3">
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                  Com o nosso curso de <span className="font-semibold text-primary-dark dark:text-primary-light">Marketing Digital e anúncios patrocinados</span>, você vai aprender do zero ao avançado, como criar campanhas eficazes no Google Ads, Facebook Ads e TikTok Ads e as estratégias que as maiores marcas usam para conquistar clientes, aumentar vendas e criar presença digital sólida.
                </p>
                
                <h4 className="text-xl font-poppins font-bold mb-4 text-gray-900 dark:text-white">O que você vai encontrar neste curso:</h4>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <i className="fas fa-check-circle text-primary-light mr-2 mt-1"></i>
                    <span className="text-gray-700 dark:text-gray-300">Técnicas práticas para atrair, engajar e converter clientes</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check-circle text-primary-light mr-2 mt-1"></i>
                    <span className="text-gray-700 dark:text-gray-300">Como ganhar dinheiro com anúncios patrocinados</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check-circle text-primary-light mr-2 mt-1"></i>
                    <span className="text-gray-700 dark:text-gray-300">Estratégias de tráfego pago e orgânico que realmente funcionam</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check-circle text-primary-light mr-2 mt-1"></i>
                    <span className="text-gray-700 dark:text-gray-300">Ferramentas e métodos para criar campanhas irresistíveis</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check-circle text-primary-light mr-2 mt-1"></i>
                    <span className="text-gray-700 dark:text-gray-300">Mentorias e materiais exclusivos para acelerar seus resultados</span>
                  </li>
                </ul>
              
                <h4 className="text-xl font-poppins font-bold mb-4 text-gray-900 dark:text-white">Este curso é para você que:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  {courseTargets.map((target, index) => (
                    <div 
                      key={index} 
                      className="flex items-center bg-gray-50 dark:bg-gray-800 p-3 rounded-lg animate-slide-up"
                      style={{ animationDelay: `${index * 150}ms` }}
                    >
                      <div className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center mr-3">
                        <i className={`fas fa-${target.icon} text-white`}></i>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300">{target.description}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="lg:w-1/3">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary-dark to-primary-light opacity-20 rounded-xl"></div>
                  <img 
                    src={instructorImage}
                    alt="Formador do Curso de Marketing Digital" 
                    className="rounded-xl shadow-lg w-full h-auto relative z-10 hover:scale-[1.02] transition-transform duration-500"
                  />
                  <div className="absolute bottom-4 left-4 right-4 bg-white dark:bg-gray-900 bg-opacity-90 dark:bg-opacity-90 rounded-lg p-4 shadow-lg z-20">
                    <h5 className="font-poppins font-bold text-primary-dark dark:text-primary-light">Formador Especializado</h5>
                    <p className="text-sm text-gray-700 dark:text-gray-300">Aprenda com um profissional qualificado e experiente no mercado digital.</p>
                  </div>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mt-6">
                  <div className="flex items-start mb-3">
                    <i className="fas fa-map-marker-alt text-primary-light mr-2 mt-1"></i>
                    <div>
                      <h5 className="font-poppins font-semibold text-gray-900 dark:text-white">Localização do centro:</h5>
                      <p className="text-gray-700 dark:text-gray-300">Centralidade do Kilamba</p>
                    </div>
                  </div>
                  <div className="flex items-start mb-3">
                    <i className="fas fa-certificate text-primary-light mr-2 mt-1"></i>
                    <div>
                      <h5 className="font-poppins font-semibold text-gray-900 dark:text-white">Certificação:</h5>
                      <p className="text-gray-700 dark:text-gray-300">Certificado reconhecido pelo INEFOP</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <i className="fas fa-phone-alt text-primary-light mr-2 mt-1"></i>
                    <div>
                      <h5 className="font-poppins font-semibold text-gray-900 dark:text-white">Contato:</h5>
                      <p className="text-gray-700 dark:text-gray-300">WhatsApp: 922534433</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-8">
              <p className="text-lg text-center font-semibold mb-4 text-gray-800 dark:text-gray-200">
                Chegou a sua hora de ser protagonista da sua história.
              </p>
              <p className="text-center text-gray-700 dark:text-gray-300 mb-8">
                Não fique parado! As oportunidades no digital só crescem — e quem domina essa arte, está sempre um passo à frente.
              </p>
              <div className="text-center">
                <a 
                  href={getWhatsAppLink("Olá, gostaria de garantir minha vaga no curso de Marketing Digital")}
                  className="gradient-bg text-white font-poppins font-medium py-4 px-10 rounded-full shadow-lg hover:shadow-xl transition duration-300 btn-hover inline-flex items-center"
                >
                  <span className="mr-2">Garanta Sua Vaga Agora</span>
                  <i className="fas fa-arrow-right"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {courseModules.map((module, index) => (
            <div 
              key={index} 
              className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow animate-slide-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="p-6 border-b border-gray-100 dark:border-gray-800">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full gradient-bg flex items-center justify-center mr-4 animate-pulse-subtle">
                    <i className={`fab fa-${module.icon} text-white text-2xl`}></i>
                  </div>
                  <h4 className="font-poppins font-bold text-xl text-gray-900 dark:text-white">{module.title}</h4>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-700 dark:text-gray-300">{module.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 md:p-12 animate-fade-in">
          <h3 className="text-2xl font-poppins font-bold mb-8 text-center text-gray-900 dark:text-white">Benefícios dos Nossos Cursos</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {courseBenefits.map((benefit, index) => (
              <div 
                key={index} 
                className="text-center animate-slide-up"
                style={{ animationDelay: `${index * 150 + 300}ms` }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full gradient-bg mb-4 animate-pulse-subtle">
                  <i className={`fas fa-${benefit.icon} text-white text-2xl`}></i>
                </div>
                <h4 className="font-poppins font-semibold text-lg mb-2 text-gray-900 dark:text-white">{benefit.title}</h4>
                <p className="text-gray-600 dark:text-gray-400">{benefit.description}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <a 
              href={getWhatsAppLink("Olá, gostaria de mais informações sobre os cursos de Marketing Digital")}
              className="gradient-bg text-white font-poppins font-medium py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition duration-300 btn-hover"
            >
              Solicitar Informações sobre os Cursos
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Courses;
