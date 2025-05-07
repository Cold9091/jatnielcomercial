import { scrollToElement } from "@/lib/utils";

const Hero = () => {
  return (
    <section id="inicio" className="pt-32 pb-16 md:pt-40 md:pb-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-poppins font-bold leading-tight mb-4">
              Transforme sua <span className="gradient-text">presença digital</span> com soluções profissionais
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8">
              Desenvolvimento web de alta qualidade e cursos especializados em marketing digital para impulsionar o seu negócio.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button 
                onClick={() => scrollToElement("servicos")}
                className="gradient-bg text-white font-poppins font-medium py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition duration-300 text-center"
              >
                Ver Serviços
              </button>
              <button 
                onClick={() => scrollToElement("cursos")}
                className="bg-white text-primary-dark border-2 border-primary-dark font-poppins font-medium py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition duration-300 text-center"
              >
                Explorar Cursos
              </button>
            </div>
          </div>
          <div className="md:w-1/2">
            <img 
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
              alt="Profissional desenvolvendo website" 
              className="rounded-xl shadow-xl w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
