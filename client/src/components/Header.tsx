import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import Logo from "@/lib/Logo";
import { scrollToElement } from "@/lib/utils";
import ThemeToggle from "./ThemeToggle";

const navItems = [
  { id: "inicio", label: "Início", path: "/", isScroll: false },
  { id: "loja", label: "Loja", path: "/loja", isScroll: false },
  { id: "clientes", label: "Clientes", path: "/clientes", isScroll: false },
  { id: "contacto", label: "Contacto", path: "/#contacto", isScroll: true, scrollTo: "contacto" },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [location, setLocation] = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleNavClick = (item: typeof navItems[0]) => {
    setIsOpen(false);
    
    if (item.isScroll && item.scrollTo) {
      if (location !== "/") {
        sessionStorage.setItem("scrollTo", item.scrollTo);
        setLocation("/");
      } else {
        scrollToElement(item.scrollTo);
      }
    }
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

  useEffect(() => {
    if (location === "/") {
      const scrollTarget = sessionStorage.getItem("scrollTo");
      if (scrollTarget) {
        sessionStorage.removeItem("scrollTo");
        setTimeout(() => {
          scrollToElement(scrollTarget);
        }, 100);
      }
    }
  }, [location]);

  const isActive = (item: typeof navItems[0]) => {
    if (item.isScroll) return false;
    if (item.path === "/" && location === "/") return true;
    if (item.path !== "/" && location === item.path) return true;
    return false;
  };

  return (
    <header className={`fixed w-full top-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm z-50 transition-all duration-300 ${isScrolled ? 'shadow-md' : ''}`}>
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/" className="flex items-center group">
            <div className="transform transition-transform duration-500 group-hover:scale-105">
              <Logo className="h-14" />
            </div>
            <div className="ml-2 flex flex-col">
              <span className="font-poppins text-lg font-bold text-gray-800 dark:text-white animate-fade-in">
                Jatniel Comercial
              </span>
            </div>
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
          {navItems.map((item) => (
            item.isScroll ? (
              <button 
                key={item.id}
                onClick={() => handleNavClick(item)}
                className="font-poppins font-medium py-2 menu-link text-gray-700 dark:text-gray-200"
                data-testid={`button-nav-${item.id}`}
              >
                {item.label}
              </button>
            ) : (
              <Link 
                key={item.id}
                href={item.path}
                className={`font-poppins font-medium py-2 menu-link ${
                  isActive(item) 
                    ? 'text-primary-light dark:text-primary-light' 
                    : 'text-gray-700 dark:text-gray-200'
                }`}
                data-testid={`link-${item.id}`}
              >
                {item.label}
              </Link>
            )
          ))}
          
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
            data-testid="button-mobile-menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {isOpen && (
        <div className="md:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm w-full shadow-lg animate-slide-down">
          <div className="container mx-auto px-4 py-3">
            {navItems.map((item) => (
              item.isScroll ? (
                <button 
                  key={item.id}
                  onClick={() => handleNavClick(item)}
                  className="block py-3 w-full text-left font-poppins font-medium border-b border-gray-100 dark:border-gray-800 text-gray-700 dark:text-gray-200"
                  data-testid={`button-mobile-nav-${item.id}`}
                >
                  <span className="flex items-center">
                    {item.label}
                  </span>
                </button>
              ) : (
                <Link 
                  key={item.id}
                  href={item.path}
                  className={`block py-3 w-full text-left font-poppins font-medium border-b border-gray-100 dark:border-gray-800 ${
                    isActive(item) 
                      ? 'text-primary-light dark:text-primary-light' 
                      : 'text-gray-700 dark:text-gray-200'
                  }`}
                  onClick={() => setIsOpen(false)}
                  data-testid={`link-mobile-${item.id}`}
                >
                  <span className="flex items-center">
                    {isActive(item) && (
                      <span className="w-1 h-5 bg-primary-light rounded-full mr-2"></span>
                    )}
                    {item.label}
                  </span>
                </Link>
              )
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
