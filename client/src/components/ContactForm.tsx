import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

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
  const { toast } = useToast();
  
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

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      await apiRequest("POST", "/api/contact", data);
      
      toast({
        title: "Mensagem enviada",
        description: "Obrigado pelo seu contacto! Entraremos em contacto em breve.",
      });
      
      form.reset();
    } catch (error) {
      toast({
        title: "Erro ao enviar mensagem",
        description: "Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contacto" className="py-16 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row bg-white dark:bg-gray-900 rounded-xl shadow-xl overflow-hidden animate-fade-in">
          <div className="md:w-1/2 gradient-bg p-8 md:p-12">
            <h2 className="text-3xl font-poppins font-bold text-white mb-4">Entre em Contacto</h2>
            <p className="text-white opacity-90 mb-6">
              Estamos prontos para ajudar a transformar sua presença digital. Preencha o formulário ou contacte-nos diretamente.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start transform transition-transform hover:translate-x-2 duration-300">
                <div className="text-white mr-4 mt-1">
                  <i className="fas fa-phone-alt animate-pulse-subtle"></i>
                </div>
                <div>
                  <h4 className="font-poppins font-semibold text-white">WhatsApp</h4>
                  <p className="text-white opacity-90">(+244) 922 534 433</p>
                </div>
              </div>
              
              <div className="flex items-start transform transition-transform hover:translate-x-2 duration-300">
                <div className="text-white mr-4 mt-1">
                  <i className="fab fa-instagram animate-pulse-subtle"></i>
                </div>
                <div>
                  <h4 className="font-poppins font-semibold text-white">Instagram</h4>
                  <p className="text-white opacity-90">@jatniel_comercial</p>
                </div>
              </div>
              
              <div className="flex items-start transform transition-transform hover:translate-x-2 duration-300">
                <div className="text-white mr-4 mt-1">
                  <i className="fab fa-facebook animate-pulse-subtle"></i>
                </div>
                <div>
                  <h4 className="font-poppins font-semibold text-white">Facebook</h4>
                  <p className="text-white opacity-90">@Jatniel_comercial (Oficial)</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="md:w-1/2 p-8 md:p-12 dark:bg-gray-900">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-900 dark:text-white">Nome Completo</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Seu nome completo" 
                          {...field} 
                          className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 focus:border-primary-light dark:focus:border-primary-light" 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-900 dark:text-white">Email</FormLabel>
                      <FormControl>
                        <Input 
                          type="email" 
                          placeholder="seu.email@exemplo.com" 
                          {...field} 
                          className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 focus:border-primary-light dark:focus:border-primary-light" 
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
                      <FormLabel className="text-gray-900 dark:text-white">Telefone</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="922 000 000" 
                          {...field} 
                          className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 focus:border-primary-light dark:focus:border-primary-light" 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="service"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-900 dark:text-white">Serviço de Interesse</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white">
                            <SelectValue placeholder="Selecione uma opção" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700">
                          <SelectItem value="landing_page">Landing Page</SelectItem>
                          <SelectItem value="professional_site">Site Profissional</SelectItem>
                          <SelectItem value="ecommerce">E-commerce</SelectItem>
                          <SelectItem value="digital_marketing_course">Cursos de Marketing Digital</SelectItem>
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
                      <FormLabel className="text-gray-900 dark:text-white">Mensagem</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Descreva sua necessidade ou dúvida..." 
                          rows={4} 
                          {...field} 
                          className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:border-primary-light dark:focus:border-primary-light"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full gradient-bg text-white font-poppins font-medium py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition duration-300 disabled:opacity-70 btn-hover"
                >
                  {isSubmitting ? "Enviando..." : "Enviar Mensagem"}
                </button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
