import Logo from "@/lib/Logo";
import { scrollToElement } from "@/lib/utils";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-8 md:mb-0">
            <div className="flex items-center mb-4">
              <Logo className="h-16" />
              <div className="ml-2">
                <span className="font-poppins text-lg font-bold text-white">Jatniel Comercial</span>
              </div>
            </div>
            <p className="text-gray-400 max-w-xs">
              Desenvolvimento web profissional e cursos especializados em marketing digital para impulsionar seu negócio.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-poppins font-semibold text-lg mb-4">Links Rápidos</h4>
              <ul className="space-y-2">
                <li>
                  <button onClick={() => scrollToElement("inicio")} className="text-gray-400 hover:text-white transition">
                    Início
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToElement("servicos")} className="text-gray-400 hover:text-white transition">
                    Serviços
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToElement("cursos")} className="text-gray-400 hover:text-white transition">
                    Cursos
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToElement("sobre")} className="text-gray-400 hover:text-white transition">
                    Sobre Nós
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToElement("contacto")} className="text-gray-400 hover:text-white transition">
                    Contacto
                  </button>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-poppins font-semibold text-lg mb-4">Serviços</h4>
              <ul className="space-y-2">
                <li>
                  <button onClick={() => scrollToElement("servicos")} className="text-gray-400 hover:text-white transition">
                    Landing Page
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToElement("servicos")} className="text-gray-400 hover:text-white transition">
                    Site Profissional
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToElement("servicos")} className="text-gray-400 hover:text-white transition">
                    E-commerce
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToElement("cursos")} className="text-gray-400 hover:text-white transition">
                    Marketing Digital
                  </button>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-poppins font-semibold text-lg mb-4">Siga-nos</h4>
              <div className="flex space-x-4">
                <a 
                  href="https://www.instagram.com/jatniel_comercial/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-400 hover:text-white transition"
                >
                  <i className="fab fa-instagram text-2xl"></i>
                </a>
                <a 
                  href="https://www.facebook.com/Jatniel_comercial/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-400 hover:text-white transition"
                >
                  <i className="fab fa-facebook text-2xl"></i>
                </a>
                <a 
                  href="https://wa.me/922534433" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-400 hover:text-white transition"
                >
                  <i className="fab fa-whatsapp text-2xl"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-500">
            &copy; {currentYear} Jatniel Comercial. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
