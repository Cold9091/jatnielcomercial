interface PortfolioItem {
  title: string;
  description: string;
  imageUrl: string;
  category: string;
}

const portfolioItems: PortfolioItem[] = [
  {
    title: "E-commerce de Eletrônicos",
    description: "Loja online completa com integração de pagamentos e gestão de inventário.",
    imageUrl: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
    category: "E-commerce"
  },
  {
    title: "Site Institucional",
    description: "Site profissional para empresa de consultoria com múltiplas páginas.",
    imageUrl: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
    category: "Site Profissional"
  },
  {
    title: "Landing Page de Evento",
    description: "Página de captação para evento com formulário de inscrição integrado.",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
    category: "Landing Page"
  }
];

const Portfolio = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-poppins font-bold mb-4">Nossos Projetos</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Conheça alguns dos nossos trabalhos de desenvolvimento web recentes.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioItems.map((item, index) => (
            <div key={index} className="rounded-xl overflow-hidden shadow-lg card-hover">
              <img 
                src={item.imageUrl} 
                alt={`Screenshot de ${item.title}`} 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="font-poppins font-bold text-xl mb-2">{item.title}</h3>
                <p className="text-gray-600 mb-4">{item.description}</p>
                <span className="inline-block gradient-bg text-white text-sm py-1 px-3 rounded-full">
                  {item.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
