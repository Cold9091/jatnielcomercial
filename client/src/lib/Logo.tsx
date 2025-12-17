import React from "react";
import logoImage from "@assets/Imagem_WhatsApp_2025-05-07_às_21.25.17_2ac63904-removebg-preview.png";

export const Logo: React.FC<{ className?: string }> = ({ className = "h-14" }) => {
  return (
    <img 
      src={logoImage} 
      alt="Jatniel Comercial" 
      className={`${className} animate-pulse-subtle`} 
    />
  );
};

export default Logo;
