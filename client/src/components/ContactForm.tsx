import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { getWhatsAppLink } from "@/lib/utils";

const formSchema = z.object({
  name: z.string().min(2, { message: "Nome deve ter pelo menos 2 caracteres" }),
  email: z.string().email({ message: "Email inválido" }),
  phone: z.string().min(9, { message: "Telefone deve ter pelo menos 9 dígitos" }),
  service: z.string().min(1, { message: "Selecione uma opção" }),
  message: z.string().min(10, { message: "Mensagem deve ter pelo menos 10 caracteres" }),
});

type FormValues = z.infer<typeof formSchema>;

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      service: "",
      message: "",
    },
  });

  // Reset success state after some time
  useEffect(() => {
    if (submitSuccess) {
      const timer = setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [submitSuccess]);

  // Função para construir a mensagem de WhatsApp com os dados do formulário
  const buildWhatsAppMessage = (data: FormValues): string => {
    // Mapear o valor do serviço para texto legível
    const serviceMap: Record<string, string> = {
      'landing_page': 'Landing Page',
      'professional_site': 'Site Profissional',
      'ecommerce': 'E-commerce',
      'logo_design': 'Design de Logotipo',
      'branding': 'Construção de Marca',
      'banners': 'Banners Publicitários',
      'other': 'Outro'
    };

    // Construir a mensagem formatada
    return `
*Nova Mensagem de Contato*
---------------------------
*Nome:* ${data.name}
*Email:* ${data.email}
*Telefone:* ${data.phone}
*Serviço de Interesse:* ${serviceMap[data.service] || data.service}
*Mensagem:*
${data.message}
---------------------------
`;
  };

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    setSubmitSuccess(false);
    
    try {
      // Construir mensagem de WhatsApp
      const whatsAppMessage = buildWhatsAppMessage(data);
      
      // Criar o link do WhatsApp com a mensagem
      const whatsAppLink = getWhatsAppLink(whatsAppMessage);
      
      // Também salvar no backend para ter um registro (opcional)
      try {
        await apiRequest("POST", "/api/contact", data);
      } catch (err) {
        console.error("Erro ao salvar dados no servidor, mas prosseguindo com WhatsApp", err);
      }
      
      // Definir como sucesso antes de abrir o WhatsApp
      setSubmitSuccess(true);
      
      // Notificar o usuário
      toast({
        title: "Redirecionando para WhatsApp",
        description: "Finalizando preparação para enviar sua mensagem via WhatsApp...",
        variant: "default",
      });
      
      // Resetar o formulário
      form.reset();
      
      // Pequeno delay antes de abrir o WhatsApp para permitir que a UI mostre sucesso
      setTimeout(() => {
        window.open(whatsAppLink, '_blank');
      }, 1000);
      
    } catch (error) {
      toast({
        title: "Erro ao processar mensagem",
        description: "Ocorreu um erro ao processar sua mensagem. Por favor, tente novamente ou entre em contato diretamente pelo WhatsApp.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contacto" className="py-16 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-poppins font-bold mb-4 text-gray-900 dark:text-white">Entre em Contacto</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Estamos prontos para ajudar a transformar sua presença digital. Preencha o formulário abaixo ou contacte-nos diretamente.
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row bg-white dark:bg-gray-900 rounded-xl shadow-xl overflow-hidden animate-fade-in">
          <div className="md:w-1/2 gradient-bg p-8 md:p-12">
            <div className={`transition-all duration-700 ${submitSuccess ? 'scale-105' : 'scale-100'}`}>
              <h2 className="text-3xl font-poppins font-bold text-white mb-4">Fale Conosco</h2>
              <p className="text-white opacity-90 mb-8">
                Estamos ansiosos para atender você e transformar suas ideias em realidade. Entre em contacto por qualquer um dos nossos canais.
              </p>
            </div>
            
            <div className="space-y-6 mt-8">
              <div className="flex items-start transform transition-transform hover:translate-x-2 duration-300 bg-white/10 p-4 rounded-lg">
                <div className="text-white mr-4 mt-1">
                  <i className="fas fa-phone-alt animate-pulse-subtle"></i>
                </div>
                <div>
                  <h4 className="font-poppins font-semibold text-white">WhatsApp</h4>
                  <p className="text-white opacity-90">(+244) 922 534 433</p>
                </div>
              </div>
              
              <div className="flex items-start transform transition-transform hover:translate-x-2 duration-300 bg-white/10 p-4 rounded-lg">
                <div className="text-white mr-4 mt-1">
                  <i className="fab fa-instagram animate-pulse-subtle"></i>
                </div>
                <div>
                  <h4 className="font-poppins font-semibold text-white">Instagram</h4>
                  <p className="text-white opacity-90">@jatniel_comercial</p>
                </div>
              </div>
              
              <div className="flex items-start transform transition-transform hover:translate-x-2 duration-300 bg-white/10 p-4 rounded-lg">
                <div className="text-white mr-4 mt-1">
                  <i className="fab fa-facebook animate-pulse-subtle"></i>
                </div>
                <div>
                  <h4 className="font-poppins font-semibold text-white">Facebook</h4>
                  <p className="text-white opacity-90">@Jatniel_comercial (Oficial)</p>
                </div>
              </div>
            </div>
            
            {/* Success indicator */}
            {submitSuccess && (
              <div className="mt-8 bg-white/20 p-6 rounded-lg animate-bounce-once">
                <div className="flex items-center">
                  <div className="mr-4 bg-green-500 rounded-full p-2">
                    <i className="fas fa-check text-white text-xl"></i>
                  </div>
                  <div>
                    <h4 className="font-poppins font-semibold text-white text-lg">Redirecionando para WhatsApp!</h4>
                    <p className="text-white opacity-90">Abrindo WhatsApp para enviar sua mensagem...</p>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="md:w-1/2 p-8 md:p-12 dark:bg-gray-900 relative">
            {/* Processing overlay */}
            {isSubmitting && (
              <div className="absolute inset-0 bg-white/60 dark:bg-gray-900/60 flex items-center justify-center z-10 backdrop-blur-sm">
                <div className="text-center">
                  <div className="w-16 h-16 border-4 border-primary-light border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-primary-dark dark:text-primary-light font-medium">Preparando mensagem para WhatsApp...</p>
                </div>
              </div>
            )}
            
            <Form {...form}>
              <form ref={formRef} onSubmit={form.handleSubmit(onSubmit)} className={`space-y-6 transition-all duration-500 ${submitSuccess ? 'opacity-60' : 'opacity-100'}`}>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-900 dark:text-white flex items-center">
                        <i className="fas fa-user text-primary-light mr-2"></i>
                        Nome Completo
                      </FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Seu nome completo" 
                          {...field} 
                          className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 focus:border-primary-light dark:focus:border-primary-light transition-all duration-300 focus:shadow-md" 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-900 dark:text-white flex items-center">
                          <i className="fas fa-envelope text-primary-light mr-2"></i>
                          Email
                        </FormLabel>
                        <FormControl>
                          <Input 
                            type="email" 
                            placeholder="seu.email@exemplo.com" 
                            {...field} 
                            className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 focus:border-primary-light dark:focus:border-primary-light transition-all duration-300 focus:shadow-md" 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-900 dark:text-white flex items-center">
                          <i className="fas fa-phone text-primary-light mr-2"></i>
                          Telefone
                        </FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="922 000 000" 
                            {...field} 
                            className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 focus:border-primary-light dark:focus:border-primary-light transition-all duration-300 focus:shadow-md" 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="service"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-900 dark:text-white flex items-center">
                        <i className="fas fa-briefcase text-primary-light mr-2"></i>
                        Serviço de Interesse
                      </FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white transition-all duration-300 focus:shadow-md">
                            <SelectValue placeholder="Selecione uma opção" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700">
                          <SelectItem value="landing_page">Landing Page</SelectItem>
                          <SelectItem value="professional_site">Site Profissional</SelectItem>
                          <SelectItem value="ecommerce">E-commerce</SelectItem>
                          <SelectItem value="logo_design">Design de Logotipo</SelectItem>
                          <SelectItem value="branding">Construção de Marca</SelectItem>
                          <SelectItem value="banners">Banners Publicitários</SelectItem>
                          <SelectItem value="other">Outro</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-900 dark:text-white flex items-center">
                        <i className="fas fa-comment text-primary-light mr-2"></i>
                        Mensagem
                      </FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Descreva sua necessidade ou dúvida..." 
                          rows={4} 
                          {...field} 
                          className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:border-primary-light dark:focus:border-primary-light transition-all duration-300 focus:shadow-md"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <button 
                  type="submit" 
                  disabled={isSubmitting || submitSuccess}
                  className="w-full gradient-bg text-white font-poppins font-medium py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition duration-300 disabled:opacity-70 relative overflow-hidden group"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    {isSubmitting ? (
                      <>
                        <i className="fas fa-spinner fa-spin mr-2"></i>
                        Processando...
                      </>
                    ) : submitSuccess ? (
                      <>
                        <i className="fas fa-check mr-2"></i>
                        Abrindo WhatsApp
                      </>
                    ) : (
                      <>
                        <i className="fab fa-whatsapp mr-2 group-hover:translate-x-1 transition-transform"></i>
                        Enviar via WhatsApp
                      </>
                    )}
                  </span>
                  <span className="absolute inset-0 bg-white/20 w-0 group-hover:w-full transition-all duration-500"></span>
                </button>
                
                <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                  Seus dados estão seguros e não serão compartilhados com terceiros.
                </p>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
