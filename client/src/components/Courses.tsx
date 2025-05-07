import { getWhatsAppLink } from "@/lib/utils";

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
    description: "Conteúdo focado em práticas reais do mercado, com exemplos e exercícios relevantes."
  },
  {
    icon: "bullhorn",
    title: "Estratégias de Anúncios",
    description: "Aprenda a criar e otimizar campanhas pagas que geram resultados mensuráveis."
  },
  {
    icon: "users",
    title: "Mentoria Personalizada",
    description: "Acompanhamento individual para aplicar as estratégias no seu negócio específico."
  }
];

const Courses = () => {
  return (
    <section id="cursos" className="py-16 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-poppins font-bold mb-4 text-gray-900 dark:text-white">Cursos de Marketing Digital</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Desenvolva habilidades essenciais para o mercado digital e impulsione seu negócio com nossas formações práticas.
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-8 mb-16">
          <div className="md:w-1/2 animate-slide-up">
            <img 
              src="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
              alt="Curso de Marketing Digital em ação" 
              className="rounded-xl shadow-xl w-full h-auto hover:scale-[1.02] transition-transform duration-500"
            />
          </div>
          
          <div className="md:w-1/2">
            <h3 className="text-2xl font-poppins font-bold mb-6 text-gray-900 dark:text-white">Currículo Completo de Marketing Digital</h3>
            
            <div className="space-y-6">
              {courseModules.map((module, index) => (
                <div 
                  key={index} 
                  className="flex items-start bg-white dark:bg-gray-900 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 animate-slide-up"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="mr-4 mt-1 text-primary-light">
                    <i className={`fab fa-${module.icon} text-2xl`}></i>
                  </div>
                  <div>
                    <h4 className="font-poppins font-semibold text-lg mb-1 text-gray-900 dark:text-white">{module.title}</h4>
                    <p className="text-gray-600 dark:text-gray-400">{module.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
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
