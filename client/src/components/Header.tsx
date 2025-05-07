import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { Menu, X } from "lucide-react";
import Logo from "@/lib/Logo";
import { scrollToElement } from "@/lib/utils";
import ThemeToggle from "./ThemeToggle";

// Lista de seções para o indicador de scroll
const sections = [
  { id: "inicio", label: "Início" },
  { id: "servicos", label: "Web" },
  { id: "design", label: "Design" },
  { id: "processo", label: "Processo" },
  { id: "cursos", label: "Cursos" },
  { id: "sobre", label: "Sobre" },
  { id: "contacto", label: "Contacto" }
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("inicio");
  const navRef = useRef<HTMLElement | null>(null);
  const indicatorRef = useRef<HTMLDivElement | null>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleNavClick = (elementId: string) => {
    scrollToElement(elementId);
    setActiveSection(elementId);
    setIsOpen(false);
  };

  // Efeito para detectar quando a página é rolada
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
      
      // Detectar qual seção está visível
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          
          if (
            scrollPosition >= offsetTop && 
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Efeito para animar o indicador de scroll
  useEffect(() => {
    if (navRef.current && indicatorRef.current) {
      const activeElement = navRef.current.querySelector(`[data-section="${activeSection}"]`);
      
      if (activeElement) {
        const { offsetLeft, offsetWidth } = activeElement as HTMLElement;
        indicatorRef.current.style.width = `${offsetWidth}px`;
        indicatorRef.current.style.transform = `translateX(${offsetLeft}px)`;
        indicatorRef.current.style.opacity = "1";
      }
    }
  }, [activeSection]);

  return (
    <header className={`fixed w-full top-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm z-50 transition-all duration-300 ${isScrolled ? 'shadow-md' : ''}`}>
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/">
            <a className="flex items-center group">
              <div className="transform transition-transform duration-500 group-hover:scale-105">
                <Logo className="h-14" />
              </div>
              <div className="ml-2 flex flex-col">
                <span className="font-poppins text-lg font-bold text-gray-800 dark:text-white animate-fade-in">
                  Jatniel Comercial
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  venda de produtos eletrônicos
                </span>
              </div>
            </a>
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center space-x-4 lg:space-x-6 relative" ref={navRef}>
          {sections.map((section) => (
            <button 
              key={section.id}
              data-section={section.id}
              onClick={() => handleNavClick(section.id)} 
              className={`relative font-poppins font-medium py-2 menu-link ${
                activeSection === section.id 
                  ? 'text-primary-light dark:text-primary-light' 
                  : 'text-gray-700 dark:text-gray-200'
              }`}
            >
              {section.label}
            </button>
          ))}
          
          {/* Indicador de navegação */}
          <div 
            ref={indicatorRef}
            className="absolute bottom-0 h-0.5 bg-primary-light rounded-full transition-all duration-300 opacity-0"
          />
          
          <div className="ml-2">
            <ThemeToggle />
          </div>
        </nav>
        
        <div className="flex items-center md:hidden">
          <div className="mr-3">
            <ThemeToggle />
          </div>
          <button 
            className="text-gray-600 dark:text-gray-300 focus:outline-none p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" 
            onClick={toggleMenu}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {isOpen && (
        <div className="md:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm w-full shadow-lg animate-slide-down">
          <div className="container mx-auto px-4 py-3">
            {sections.map((section) => (
              <button 
                key={section.id}
                onClick={() => handleNavClick(section.id)} 
                className={`block py-3 w-full text-left font-poppins font-medium border-b border-gray-100 dark:border-gray-800 ${
                  activeSection === section.id 
                    ? 'text-primary-light dark:text-primary-light' 
                    : 'text-gray-700 dark:text-gray-200'
                }`}
              >
                <span className="flex items-center">
                  {activeSection === section.id && (
                    <span className="w-1 h-5 bg-primary-light rounded-full mr-2"></span>
                  )}
                  {section.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
