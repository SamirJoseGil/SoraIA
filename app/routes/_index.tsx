import { useState, useEffect, useRef, ReactNode } from "react";
import type { MetaFunction } from "@remix-run/node";
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import ServiceCard from "~/components/ServiceCard";
import CirclesBackground from "~/components/CirclesBackground";
import FloatingWhatsApp from "~/components/FloatingWhatsApp";

export const meta: MetaFunction = () => {
  return [
    { title: "Soraia - Transformamos ideas en software real" },
    { name: "description", content: "Servicios de desarrollo de software y consultoría tecnológica" },
  ];
};

// Function to check if element is in viewport
const useIntersectionObserver = (options = {}) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, options);

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [options]);

  return { ref: elementRef, isVisible };
};

export default function Index() {
  const { ref: heroRef, isVisible: heroIsVisible } = useIntersectionObserver({ threshold: 0.1 });
  const { ref: aboutRef, isVisible: aboutIsVisible } = useIntersectionObserver({ threshold: 0.1 });
  const { ref: servicesRef, isVisible: servicesIsVisible } = useIntersectionObserver({ threshold: 0.1 });
  const { ref: contactRef, isVisible: contactIsVisible } = useIntersectionObserver({ threshold: 0.1 });

  const [activeSection, setActiveSection] = useState('home');

  // Effect to determine active section based on visibility
  useEffect(() => {
    if (contactIsVisible) {
      setActiveSection('contact');
    } else if (servicesIsVisible) {
      setActiveSection('services');
    } else if (aboutIsVisible) {
      setActiveSection('about');
    } else if (heroIsVisible) {
      setActiveSection('home');
    }
  }, [heroIsVisible, aboutIsVisible, servicesIsVisible, contactIsVisible]);

  // Add animation styles to tailwind styles
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes float {
        0% { transform: translateY(0) translateX(0); }
        50% { transform: translateY(-10px) translateX(5px); }
        100% { transform: translateY(0) translateX(0); }
      }
      @keyframes float-delay {
        0% { transform: translateY(0) translateX(0); }
        50% { transform: translateY(10px) translateX(-5px); }
        100% { transform: translateY(0) translateX(0); }
      }
      @keyframes float-reverse {
        0% { transform: translateY(0) translateX(0) rotate(0deg); }
        50% { transform: translateY(8px) translateX(8px) rotate(5deg); }
        100% { transform: translateY(0) translateX(0) rotate(0deg); }
      }
      @keyframes float-slow {
        0% { transform: translateY(0) translateX(0); }
        50% { transform: translateY(-15px) translateX(-10px); }
        100% { transform: translateY(0) translateX(0); }
      }
      .animate-float {
        animation: float 8s ease-in-out infinite;
      }
      .animate-float-delay {
        animation: float-delay 10s ease-in-out infinite;
      }
      .animate-float-reverse {
        animation: float-reverse 12s ease-in-out infinite;
      }
      .animate-float-slow {
        animation: float-slow 14s ease-in-out infinite;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="bg-soraia-light">

      {/* Header */}
      <Header activeSection={activeSection} />

      {/* Hero Section - Reorganizado */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-soraia-light via-soraia-accent/10 to-soraia-primary/20">
        {/* Círculos con mayor opacidad */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="circle-lg absolute top-1/4 left-1/5 w-64 h-64 rounded-full bg-soraia-accent/40 animate-float"></div>
          <div className="circle-md absolute bottom-1/3 right-1/4 w-48 h-48 rounded-full bg-soraia-primary/30 animate-float-delay"></div>
          <div className="circle-sm absolute top-2/3 left-1/3 w-32 h-32 rounded-full bg-soraia-secondary/35 animate-float-reverse"></div>
          <div className="circle-xs absolute top-1/2 right-1/3 w-16 h-16 rounded-full bg-soraia-accent/45 animate-float-slow"></div>
        </div>

        <div
          ref={heroRef}
          className={`container relative mx-auto px-4 py-12 text-center ${heroIsVisible ? 'animate-fade-in' : 'opacity-0'}`}
        >
          {/* Logo arriba del título como en Sense Digital */}
          <div>
            <img
              src="/SoraiaLogo.svg"
              alt="Soraia Logo"
              className="h-32 md:h-40 mx-auto animate-float-slow opacity-20"
              style={{ animationDuration: '12s' }}
            />
          </div>

          {/* Contenido principal */}
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-soraia-primary">
            Transformamos ideas en software real
          </h1>
          <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto text-soraia-dark">
            Somos expertos en desarrollo y consultoría tecnológica para empresas visionarias
          </p>
          <a
            href="#contact"
            className="bg-soraia-primary text-white px-8 py-3 rounded-full font-bold hover:bg-soraia-secondary transition-colors duration-300 inline-block transform hover:scale-105 hover:shadow-lg"
          >
            Solicita una demo
          </a>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="section-title text-soraia-primary">Quiénes Somos</h2>
          <p className="section-subtitle text-soraia-dark">Conoce el equipo detrás de Soraia</p>

          <div
            ref={aboutRef}
            className={`grid grid-cols-1 md:grid-cols-2 gap-12 items-center mt-12 ${aboutIsVisible ? 'animate-fade-in' : 'opacity-0'}`}
          >
            <div className={`${aboutIsVisible ? 'animate-slide-in-left' : 'opacity-0'}`}>
              <h3 className="text-2xl font-bold mb-4 text-soraia-primary">Nuestra Historia</h3>
              <p className="text-soraia-dark mb-6">
                Fundada en 2020, Soraia nació con la misión de crear soluciones tecnológicas que realmente importen.
                No somos simplemente programadores, somos arquitectos de soluciones digitales.
              </p>
              <p className="text-soraia-dark">
                Nuestro equipo está compuesto por expertos en distintas áreas de la tecnología, unidos por la pasión
                de transformar ideas complejas en productos funcionales y elegantes.
              </p>
            </div>

            <div className={`${aboutIsVisible ? 'animate-slide-in-right' : 'opacity-0'}`}>
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                  alt="Equipo Soraia"
                  className="w-full h-64 object-cover object-center"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-soraia-light">
        <div ref={servicesRef} className="container mx-auto px-4">
          <h2 className="section-title text-soraia-primary">Lo Que Hacemos</h2>
          <p className="section-subtitle text-soraia-dark">Nuestros servicios diseñados para impulsar tu negocio</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <ServiceCard
              title="Desarrollo Web"
              description="Creamos sitios y aplicaciones web modernas, rápidas y escalables con las últimas tecnologías."
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              }
              delay={0}
            />

            <ServiceCard
              title="Aplicaciones Móviles"
              description="Desarrollamos apps nativas y multiplataforma que destacan en las tiendas de aplicaciones."
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              }
              delay={200}
            />

            <ServiceCard
              title="Sistemas Empresariales"
              description="Creamos soluciones a medida para optimizar los procesos internos de tu empresa."
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              }
              delay={400}
            />
          </div>
        </div>
      </section>

      {/* Contact Section - Solo formulario */}
      <section id="contact" className="py-20 bg-white">
        <div ref={contactRef} className="container mx-auto px-4">
          <h2 className="section-title text-soraia-primary">Contáctanos</h2>
          <p className="section-subtitle text-soraia-dark">¿Tienes un proyecto en mente? Hablemos sobre él</p>

          <div className="max-w-2xl mx-auto mt-12">
            {/* Reemplazo de la clase card por sus propiedades individuales para control preciso */}
            <div className="bg-gray-200 rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl hover:scale-105">
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-soraia-dark mb-2">Nombre</label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 rounded-lg bg-white border border-soraia-accent/30 focus:outline-none focus:ring-2 focus:ring-soraia-primary"
                    placeholder="Tu nombre"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-soraia-dark mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 rounded-lg bg-white border border-soraia-accent/30 focus:outline-none focus:ring-2 focus:ring-soraia-primary"
                    placeholder="tu@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-soraia-dark mb-2">Mensaje</label>
                  <textarea
                    id="message"
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg bg-white border border-soraia-accent/30 focus:outline-none focus:ring-2 focus:ring-soraia-primary"
                    placeholder="¿En qué podemos ayudarte?"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-soraia-primary text-white font-bold py-3 px-6 rounded-lg hover:bg-soraia-secondary transition-colors duration-300 transform hover:scale-105"
                >
                  Enviar mensaje
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp flotante */}
      <FloatingWhatsApp />

      {/* Footer */}
      <Footer />
    </div>
  );
}