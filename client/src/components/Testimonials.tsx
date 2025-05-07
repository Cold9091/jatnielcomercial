interface Testimonial {
  content: string;
  author: string;
  role: string;
  initials: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    content: "O site de e-commerce que a Jatniel desenvolveu para a minha loja superou todas as expectativas. As vendas aumentaram significativamente desde o lançamento.",
    author: "Carlos Pereira",
    role: "Proprietário, Tech Store",
    initials: "CP",
    rating: 5
  },
  {
    content: "Participei do curso de Google Ads e em apenas duas semanas consegui implementar campanhas que já estão gerando leads qualificados para o meu negócio.",
    author: "Maria Santos",
    role: "Empreendedora, Fashion Style",
    initials: "MS",
    rating: 5
  },
  {
    content: "A landing page que criaram para o lançamento do meu produto teve uma taxa de conversão de 12%. Excelente trabalho, profissionais altamente recomendados!",
    author: "João Mendes",
    role: "CEO, Inovação Digital",
    initials: "JM",
    rating: 4.5
  }
];

const Testimonials = () => {
  return (
    <section id="sobre" className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-poppins font-bold mb-4">O Que Nossos Clientes Dizem</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            A satisfação dos nossos clientes é o melhor indicador da qualidade do nosso trabalho.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-8">
              <div className="text-primary-light mb-4">
                {[...Array(Math.floor(testimonial.rating))].map((_, i) => (
                  <i key={i} className="fas fa-star"></i>
                ))}
                {testimonial.rating % 1 === 0.5 && (
                  <i className="fas fa-star-half-alt"></i>
                )}
              </div>
              <p className="text-gray-600 italic mb-6">"{testimonial.content}"</p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center mr-3">
                  <span className="text-white font-bold">{testimonial.initials}</span>
                </div>
                <div>
                  <h4 className="font-poppins font-semibold">{testimonial.author}</h4>
                  <p className="text-gray-500 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
