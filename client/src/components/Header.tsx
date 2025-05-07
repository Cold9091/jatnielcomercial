import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Menu, X } from "lucide-react";
import Logo from "@/lib/Logo";
import { scrollToElement } from "@/lib/utils";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleNavClick = (elementId: string) => {
    scrollToElement(elementId);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={`fixed w-full top-0 bg-white z-50 transition-shadow duration-300 ${isScrolled ? 'shadow-md' : ''}`}>
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/">
            <a className="flex items-center">
              <Logo className="h-14" />
              <div className="ml-2 flex flex-col">
                <span className="font-poppins text-lg font-bold text-gray-800">Jatniel Comercial</span>
                <span className="text-xs text-gray-500">venda de produtos eletrônicos</span>
              </div>
            </a>
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8">
          <button onClick={() => handleNavClick("inicio")} className="font-poppins font-medium text-gray-700 hover:text-primary-dark transition">
            Início
          </button>
          <button onClick={() => handleNavClick("servicos")} className="font-poppins font-medium text-gray-700 hover:text-primary-dark transition">
            Serviços
          </button>
          <button onClick={() => handleNavClick("cursos")} className="font-poppins font-medium text-gray-700 hover:text-primary-dark transition">
            Cursos
          </button>
          <button onClick={() => handleNavClick("sobre")} className="font-poppins font-medium text-gray-700 hover:text-primary-dark transition">
            Sobre Nós
          </button>
          <button onClick={() => handleNavClick("contacto")} className="font-poppins font-medium text-gray-700 hover:text-primary-dark transition">
            Contacto
          </button>
        </nav>
        
        <button className="md:hidden text-gray-600 focus:outline-none" onClick={toggleMenu}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {isOpen && (
        <div className="md:hidden bg-white w-full shadow-lg">
          <div className="container mx-auto px-4 py-3">
            <button onClick={() => handleNavClick("inicio")} className="block py-2 w-full text-left font-poppins font-medium text-gray-700 hover:text-primary-dark transition">
              Início
            </button>
            <button onClick={() => handleNavClick("servicos")} className="block py-2 w-full text-left font-poppins font-medium text-gray-700 hover:text-primary-dark transition">
              Serviços
            </button>
            <button onClick={() => handleNavClick("cursos")} className="block py-2 w-full text-left font-poppins font-medium text-gray-700 hover:text-primary-dark transition">
              Cursos
            </button>
            <button onClick={() => handleNavClick("sobre")} className="block py-2 w-full text-left font-poppins font-medium text-gray-700 hover:text-primary-dark transition">
              Sobre Nós
            </button>
            <button onClick={() => handleNavClick("contacto")} className="block py-2 w-full text-left font-poppins font-medium text-gray-700 hover:text-primary-dark transition">
              Contacto
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
