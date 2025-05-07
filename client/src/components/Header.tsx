import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Menu, X } from "lucide-react";
import Logo from "@/lib/Logo";
import { scrollToElement } from "@/lib/utils";
import ThemeToggle from "./ThemeToggle";

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
    <header className={`fixed w-full top-0 bg-white dark:bg-gray-900 z-50 transition-all duration-300 ${isScrolled ? 'shadow-md' : ''}`}>
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/">
            <a className="flex items-center">
              <Logo className="h-14" />
              <div className="ml-2 flex flex-col">
                <span className="font-poppins text-lg font-bold text-gray-800 dark:text-white animate-fade-in">Jatniel Comercial</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">venda de produtos eletrônicos</span>
              </div>
            </a>
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
          <button onClick={() => handleNavClick("inicio")} className="font-poppins font-medium text-gray-700 dark:text-gray-200 hover:text-primary-light dark:hover:text-primary-light transition">
            Início
          </button>
          <button onClick={() => handleNavClick("servicos")} className="font-poppins font-medium text-gray-700 dark:text-gray-200 hover:text-primary-light dark:hover:text-primary-light transition">
            Web
          </button>
          <button onClick={() => handleNavClick("design")} className="font-poppins font-medium text-gray-700 dark:text-gray-200 hover:text-primary-light dark:hover:text-primary-light transition">
            Design
          </button>
          <button onClick={() => handleNavClick("cursos")} className="font-poppins font-medium text-gray-700 dark:text-gray-200 hover:text-primary-light dark:hover:text-primary-light transition">
            Cursos
          </button>
          <button onClick={() => handleNavClick("sobre")} className="font-poppins font-medium text-gray-700 dark:text-gray-200 hover:text-primary-light dark:hover:text-primary-light transition">
            Sobre
          </button>
          <button onClick={() => handleNavClick("contacto")} className="font-poppins font-medium text-gray-700 dark:text-gray-200 hover:text-primary-light dark:hover:text-primary-light transition">
            Contacto
          </button>
          <div className="ml-2">
            <ThemeToggle />
          </div>
        </nav>
        
        <div className="flex items-center md:hidden">
          <div className="mr-3">
            <ThemeToggle />
          </div>
          <button className="text-gray-600 dark:text-gray-300 focus:outline-none" onClick={toggleMenu}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 w-full shadow-lg">
          <div className="container mx-auto px-4 py-3">
            <button onClick={() => handleNavClick("inicio")} className="block py-2 w-full text-left font-poppins font-medium text-gray-700 dark:text-gray-200 hover:text-primary-light dark:hover:text-primary-light transition">
              Início
            </button>
            <button onClick={() => handleNavClick("servicos")} className="block py-2 w-full text-left font-poppins font-medium text-gray-700 dark:text-gray-200 hover:text-primary-light dark:hover:text-primary-light transition">
              Web
            </button>
            <button onClick={() => handleNavClick("design")} className="block py-2 w-full text-left font-poppins font-medium text-gray-700 dark:text-gray-200 hover:text-primary-light dark:hover:text-primary-light transition">
              Design
            </button>
            <button onClick={() => handleNavClick("cursos")} className="block py-2 w-full text-left font-poppins font-medium text-gray-700 dark:text-gray-200 hover:text-primary-light dark:hover:text-primary-light transition">
              Cursos
            </button>
            <button onClick={() => handleNavClick("sobre")} className="block py-2 w-full text-left font-poppins font-medium text-gray-700 dark:text-gray-200 hover:text-primary-light dark:hover:text-primary-light transition">
              Sobre
            </button>
            <button onClick={() => handleNavClick("contacto")} className="block py-2 w-full text-left font-poppins font-medium text-gray-700 dark:text-gray-200 hover:text-primary-light dark:hover:text-primary-light transition">
              Contacto
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
