import { getWhatsAppLink } from "@/lib/utils";

interface ServiceItem {
  id: string;
  title: string;
  price: number;
  features: string[];
  popular?: boolean;
}

const serviceItems: ServiceItem[] = [
  {
    id: "landing_page",
    title: "Landing Page",
    price: 90000,
    features: [
      "Página única e responsiva",
      "Otimização para SEO",
      "Formulário de contacto",
      "Integração com redes sociais",
      "Entrega em 5 dias"
    ]
  },
  {
    id: "professional_site",
    title: "Site Profissional",
    price: 140000,
    features: [
      "4-6 páginas personalizadas",
      "Design responsivo premium",
      "Integração com redes sociais",
      "Sistema de blog",
      "Entrega em 10-15 dias"
    ],
    popular: true
  },
  {
    id: "ecommerce",
    title: "E-commerce",
    price: 190000,
    features: [
      "Loja online completa",
      "Integração de pagamentos",
      "Gestão de inventário",
      "Otimização para conversão",
      "Entrega em 15-20 dias"
    ]
  }
];

const Services = () => {
  return (
    <section id="servicos" className="py-16 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-poppins font-bold mb-4 text-gray-900 dark:text-white">Nossos Serviços de Desenvolvimento</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Oferecemos soluções personalizadas para diferentes necessidades e orçamentos, sempre com foco na qualidade e resultados.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {serviceItems.map((service, index) => (
            <div 
              key={service.id}
              className={`service-card bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden 
                ${service.popular ? "transform scale-105 z-10" : ""}
                animate-slide-up`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {service.popular && (
                <div className="absolute top-0 right-0 bg-primary-dark text-white py-1 px-4 rounded-bl-lg font-poppins text-sm">
                  Mais Popular
                </div>
              )}
              
              <div className="gradient-bg p-6">
                <h3 className="text-xl font-poppins font-bold text-white">{service.title}</h3>
                <div className="flex items-baseline mt-2">
                  <span className="text-2xl md:text-3xl font-poppins font-bold text-white">
                    Kz {service.price.toLocaleString('pt-AO')}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <ul className="space-y-3">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-primary-light mt-1 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-8">
                  <a 
                    href={getWhatsAppLink(`Olá, estou interessado no pacote ${service.title}`)}
                    className="block text-center gradient-bg text-white font-poppins font-medium py-3 px-8 rounded-full hover:shadow-lg transition duration-300 btn-hover"
                  >
                    Solicitar Orçamento
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
