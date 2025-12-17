import Header from "../components/Header";
import Hero from "../components/Hero";
import Services from "../components/Services";
import DesignServices from "../components/DesignServices";
import AboutUs from "../components/AboutUs";
import StatsCounter from "../components/StatsCounter";
import WorkProcess from "../components/WorkProcess"; 
import Faq from "../components/Faq";
import Testimonials from "../components/Testimonials";
import ContactForm from "../components/ContactForm";
import Footer from "../components/Footer";
import Store from "../components/Store";
import { Helmet } from "react-helmet";

const SITE_URL = "https://jatnielcomercial.ao";

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${SITE_URL}/#organization`,
  "name": "Jatniel Comercial",
  "description": "Empresa angolana especializada em desenvolvimento web, design gráfico e soluções digitais para negócios em Angola.",
  "url": SITE_URL,
  "logo": `${SITE_URL}/logo.png`,
  "image": `${SITE_URL}/og-image.jpg`,
  "telephone": "+244923456789",
  "email": "contacto@jatnielcomercial.ao",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Luanda",
    "addressCountry": "AO"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": -8.8368,
    "longitude": 13.2343
  },
  "areaServed": {
    "@type": "Country",
    "name": "Angola"
  },
  "priceRange": "$$",
  "openingHours": "Mo-Fr 08:00-18:00",
  "sameAs": [
    "https://www.facebook.com/jatnielcomercial",
    "https://www.instagram.com/jatnielcomercial"
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Serviços Digitais",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Desenvolvimento Web",
          "description": "Criação de websites profissionais e aplicações web personalizadas"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Design Gráfico",
          "description": "Design de logotipos, branding e materiais visuais para empresas"
        }
      }
    ]
  }
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Jatniel Comercial",
  "url": SITE_URL,
  "description": "Desenvolvimento web e design gráfico em Angola",
  "publisher": {
    "@id": `${SITE_URL}/#organization`
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": `${SITE_URL}/loja?q={search_term_string}`,
    "query-input": "required name=search_term_string"
  }
};

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Jatniel Comercial | Desenvolvimento Web & Design Gráfico em Angola</title>
        <meta name="description" content="Jatniel Comercial - Empresa angolana especializada em desenvolvimento web, design gráfico e produtos organizacionais. Serviços profissionais em Luanda e toda Angola. Criação de sites, logotipos, branding e mais." />
        <meta name="keywords" content="desenvolvimento web Angola, design gráfico Angola, criação de sites Luanda, web designer Angola, agência digital Angola, logotipo Angola, branding Angola, porta documentos Angola, Netflix Angola" />
        <meta name="author" content="Jatniel Comercial" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={SITE_URL} />
        
        <meta property="og:title" content="Jatniel Comercial | Desenvolvimento Web & Design Gráfico em Angola" />
        <meta property="og:description" content="Serviços profissionais de desenvolvimento web e design gráfico para impulsionar o seu negócio em Angola." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={SITE_URL} />
        <meta property="og:image" content={`${SITE_URL}/og-image.jpg`} />
        <meta property="og:locale" content="pt_AO" />
        <meta property="og:site_name" content="Jatniel Comercial" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Jatniel Comercial | Desenvolvimento Web & Design Gráfico" />
        <meta name="twitter:description" content="Serviços profissionais de desenvolvimento web e design gráfico em Angola." />
        <meta name="twitter:image" content={`${SITE_URL}/og-image.jpg`} />
        
        <meta name="geo.region" content="AO" />
        <meta name="geo.placename" content="Luanda, Angola" />
        
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        
      </Helmet>
      <Helmet>
        <script type="application/ld+json">{`${JSON.stringify(localBusinessSchema)}`}</script>
        <script type="application/ld+json">{`${JSON.stringify(websiteSchema)}`}</script>
      </Helmet>
      <Header />
      <Hero />
      <Services />
      <DesignServices />
      <WorkProcess />
      <StatsCounter />
      <Store />
      <AboutUs />
      <Faq />
      <Testimonials />
      <ContactForm />
      <Footer />
    </>
  );
};

export default Home;
