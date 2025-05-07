import { getWhatsAppLink } from "@/lib/utils";

const FloatingWhatsApp = () => {
  return (
    <a 
      href={getWhatsAppLink()} 
      className="fixed bottom-6 right-6 w-16 h-16 flex items-center justify-center rounded-full shadow-xl gradient-bg text-white text-3xl hover:shadow-2xl transition-all duration-300 z-50"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contacte-nos pelo WhatsApp"
    >
      <i className="fab fa-whatsapp"></i>
    </a>
  );
};

export default FloatingWhatsApp;
