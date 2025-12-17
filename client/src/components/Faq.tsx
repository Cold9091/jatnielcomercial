import React, { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQCategory {
  id: string;
  label: string;
  icon: string;
  items: FAQItem[];
}

const faqCategories: FAQCategory[] = [
  {
    id: "web",
    label: "Desenvolvimento Web",
    icon: "laptop-code",
    items: [
      {
        question: "Quanto tempo leva para desenvolver um site?",
        answer: "O tempo de desenvolvimento varia de acordo com a complexidade do projeto. Uma landing page simples pode ser criada em 1-2 semanas, enquanto um site profissional completo geralmente leva de 3-5 semanas. Para projetos de e-commerce, o prazo médio é de 5-8 semanas dependendo das funcionalidades requeridas."
      },
      {
        question: "Quais tecnologias vocês utilizam para o desenvolvimento?",
        answer: "Utilizamos tecnologias modernas e otimizadas para garantir o melhor desempenho. Para front-end, trabalhamos com React, NextJS e Vue.js. No back-end, utilizamos Node.js, PHP e Python. Nossos sites são responsivos e compatíveis com todos os dispositivos e navegadores modernos."
      },
      {
        question: "O site terá um painel administrativo?",
        answer: "Sim, todos os nossos sites profissionais e e-commerce incluem um painel administrativo intuitivo que permite atualizar conteúdos, gerenciar produtos, visualizar estatísticas e muito mais, sem necessidade de conhecimentos técnicos."
      },
      {
        question: "Vocês oferecem serviços de manutenção após o lançamento?",
        answer: "Sim, oferecemos planos de manutenção mensal que incluem atualizações de segurança, backup regular, suporte técnico, pequenas alterações e monitoramento de desempenho para garantir que seu site continue funcionando perfeitamente."
      }
    ]
  },
  {
    id: "design",
    label: "Design Gráfico",
    icon: "palette",
    items: [
      {
        question: "Como funciona o processo de criação de logotipo?",
        answer: "Nosso processo de criação de logotipos inclui: 1) Briefing e pesquisa sobre a marca e mercado; 2) Desenvolvimento de conceitos iniciais; 3) Apresentação das propostas; 4) Refinamentos baseados no seu feedback; 5) Finalização e entrega em diversos formatos para diferentes aplicações."
      },
      {
        question: "Quantas versões de logotipo são apresentadas?",
        answer: "Apresentamos inicialmente 3-5 conceitos diferentes para logotipos. Após a seleção do conceito preferido, fazemos até 3 rodadas de ajustes para garantir que o resultado final atenda perfeitamente às suas expectativas."
      },
      {
        question: "Quais formatos de arquivo são entregues nos projetos de design?",
        answer: "Entregamos arquivos em formatos vetoriais (AI, EPS, SVG) que permitem redimensionamento sem perda de qualidade, além de formatos para uso digital (PNG, JPG) e versões específicas para aplicações em preto e branco, monocromáticas e em negativo para diferentes fundos."
      },
      {
        question: "É possível solicitar alterações nos designs apresentados?",
        answer: "Sim, a colaboração é fundamental em nosso processo. Todos os pacotes incluem rodadas de revisão para ajustes conforme seu feedback, garantindo que o resultado final esteja alinhado com sua visão e necessidades de negócio."
      }
    ]
  },
  {
    id: "general",
    label: "Informações Gerais",
    icon: "info-circle",
    items: [
      {
        question: "Como funciona o processo de pagamento?",
        answer: "Trabalhamos com um modelo flexível de pagamento. Para projetos de desenvolvimento web e design, solicitamos 50% de entrada para iniciar os trabalhos e 50% na entrega final."
      },
      {
        question: "Vocês atendem em todo o território de Angola?",
        answer: "Sim, atendemos clientes em todo o território angolano. Para serviços de desenvolvimento web e design, o atendimento pode ser totalmente remoto. Nossa sede está localizada na Centralidade do Kilamba."
      },
      {
        question: "É possível agendar uma reunião de consultoria antes de contratar?",
        answer: "Sim, oferecemos uma consulta inicial gratuita para entender melhor suas necessidades e objetivos. Este encontro pode ser realizado por videoconferência ou presencialmente em nossa sede, dependendo da sua disponibilidade e preferência."
      },
      {
        question: "Como posso entrar em contato para mais informações?",
        answer: "Você pode entrar em contato conosco através do WhatsApp: (+244) 922 534 433, por email, ou utilizando o formulário de contato disponível neste site. Também estamos presentes nas redes sociais como Instagram e Facebook, onde respondemos mensagens diretas."
      }
    ]
  }
];

const Faq: React.FC = () => {
  const [activeTab, setActiveTab] = useState("web");

  return (
    <section id="faq" className="py-16 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-poppins font-bold mb-4 text-gray-900 dark:text-white">Perguntas Frequentes</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Encontre respostas para as perguntas mais comuns sobre nossos serviços.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="grid grid-cols-3 gap-2">
                {faqCategories.map((category) => (
                  <TabsTrigger 
                    key={category.id} 
                    value={category.id}
                    className="flex items-center space-x-2 data-[state=active]:bg-primary-light data-[state=active]:text-white"
                  >
                    <i className={`fas fa-${category.icon}`}></i>
                    <span className="hidden sm:inline">{category.label}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {faqCategories.map((category) => (
              <TabsContent key={category.id} value={category.id} className="animate-fade-in">
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-md">
                  <h3 className="text-xl font-poppins font-semibold mb-6 text-gray-900 dark:text-white flex items-center">
                    <i className={`fas fa-${category.icon} text-primary-light mr-2`}></i>
                    {category.label}
                  </h3>
                  
                  <Accordion type="single" collapsible className="space-y-4">
                    {category.items.map((item, idx) => (
                      <AccordionItem 
                        key={idx} 
                        value={`${category.id}-${idx}`}
                        className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-900 animate-slide-up"
                        style={{ animationDelay: `${idx * 100}ms` }}
                      >
                        <AccordionTrigger className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 font-medium text-gray-800 dark:text-white text-left">
                          {item.question}
                        </AccordionTrigger>
                        <AccordionContent className="px-4 py-3 text-gray-600 dark:text-gray-300">
                          {item.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default Faq;