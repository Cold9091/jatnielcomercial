import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import DesignServices from "@/components/DesignServices";
import Courses from "@/components/Courses";
import AboutUs from "@/components/AboutUs";
import Testimonials from "@/components/Testimonials";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Jatniel Comercial | Desenvolvimento Web, Design & Marketing Digital</title>
        <meta name="description" content="Jatniel Comercial oferece serviços de desenvolvimento web, design gráfico e cursos de marketing digital para impulsionar seu negócio. Conheça nossos serviços e preços." />
        <meta property="og:title" content="Jatniel Comercial | Desenvolvimento Web, Design & Marketing Digital" />
        <meta property="og:description" content="Serviços profissionais de desenvolvimento web, design gráfico e cursos especializados em marketing digital para impulsionar o seu negócio." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://jatnielcomercial.ao" />
        <script src="https://kit.fontawesome.com/a076d05399.js" crossOrigin="anonymous"></script>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </Helmet>
      <Header />
      <Hero />
      <Services />
      <DesignServices />
      <Courses />
      <AboutUs />
      <Testimonials />
      <ContactForm />
      <Footer />
    </>
  );
};

export default Home;
