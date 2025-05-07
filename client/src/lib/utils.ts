import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Validate email format
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Validate phone number format (Angola)
export function isValidPhone(phone: string): boolean {
  // Angola phone numbers typically start with 9 and have 9 digits
  const phoneRegex = /^9\d{8}$/;
  return phoneRegex.test(phone.replace(/\D/g, ''));
}

// Format currency to Kwanza
export function formatKwanza(value: number): string {
  return `Kz ${value.toLocaleString('pt-AO')}`;
}

// Scroll to element by ID with smooth behavior
export function scrollToElement(elementId: string): void {
  const element = document.getElementById(elementId);
  if (element) {
    window.scrollTo({
      top: element.offsetTop - 80, // Account for fixed header
      behavior: 'smooth',
    });
  }
}

// Generate WhatsApp chat link
export function getWhatsAppLink(message: string = ''): string {
  return `https://wa.me/922534433?text=${encodeURIComponent(message)}`;
}
