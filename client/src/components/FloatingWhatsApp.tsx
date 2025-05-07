import { getWhatsAppLink } from "@/lib/utils";
import { useState, useEffect } from "react";

const FloatingWhatsApp = () => {
  const [isPulsing, setIsPulsing] = useState(false);
  
  // Efeito para pulsar o botão periodicamente para chamar atenção
  useEffect(() => {
    const interval = setInterval(() => {
      setIsPulsing(true);
      
      setTimeout(() => {
        setIsPulsing(false);
      }, 1000);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <a 
      href={getWhatsAppLink()} 
      className={`fixed bottom-6 right-6 w-16 h-16 flex items-center justify-center rounded-full shadow-xl gradient-bg text-white text-3xl hover:shadow-2xl transition-all duration-300 z-50 ${
        isPulsing ? 'scale-110 animate-bounce' : 'hover:scale-105'
      }`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contacte-nos pelo WhatsApp"
    >
      <div className="absolute w-full h-full rounded-full gradient-bg animate-ping opacity-30" style={{ animationDuration: '2s' }}></div>
      <i className="fab fa-whatsapp"></i>
    </a>
  );
};

export default FloatingWhatsApp;
