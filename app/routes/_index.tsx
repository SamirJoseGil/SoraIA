import { useState, useEffect, useRef, ReactNode } from "react";
import type { MetaFunction } from "@remix-run/node";
import Header from "~/components/Header";
import Footer from "~/components/Footer";

export const meta: MetaFunction = () => {
  return [
    { title: "Soraia - Transformamos ideas en software real" },
    { name: "description", content: "Servicios de desarrollo de software y consultoría tecnológica" },
  ];
};

// Define types for the service card props
interface ServiceCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  delay?: number;
}

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

// Service Card Component
function ServiceCard({ title, description, icon, delay = 0 }: ServiceCardProps) {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={`card ${isVisible ? 'animate-slide-up opacity-100' : 'opacity-0'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="text-soraia-primary mb-4 inline-block">{icon}</div>
      <h3 className="text-xl font-bold mb-3 text-soraia-dark">{title}</h3>
      <p className="text-soraia-dark mb-6">{description}</p>
      <a href="#" className="inline-block px-6 py-2 bg-soraia-primary text-white rounded-lg hover:bg-soraia-secondary hover:shadow-lg transition-all transform hover:scale-105">
        Saber más
      </a>
    </div>
  );
}

// Circles background component
function CirclesBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="circle-lg absolute top-1/4 left-1/5 w-64 h-64 rounded-full bg-soraia-accent/20 animate-float"></div>
      <div className="circle-md absolute bottom-1/3 right-1/4 w-48 h-48 rounded-full bg-soraia-primary/10 animate-float-delay"></div>
      <div className="circle-sm absolute top-2/3 left-1/3 w-32 h-32 rounded-full bg-soraia-secondary/15 animate-float-reverse"></div>
      <div className="circle-xs absolute top-1/2 right-1/3 w-16 h-16 rounded-full bg-soraia-accent/25 animate-float-slow"></div>
    </div>
  );
}

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
      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-soraia-light via-soraia-accent/20 to-soraia-primary/40">
        <CirclesBackground />
        
        <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
          <img 
            src="/SoraiaLogo.svg" 
            alt="Soraia Background Logo" 
            className="w-2/3 md:w-1/2 animate-pulse" 
            style={{ animationDuration: '8s' }}
          />
        </div>
        
        <div
          ref={heroRef}
          className={`container relative mx-auto px-4 py-20 text-center ${heroIsVisible ? 'animate-fade-in' : 'opacity-0'}`}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-soraia-dark">Transformamos ideas en software real</h1>
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

      {/* Header now positioned after the hero section */}
      <Header activeSection={activeSection} />

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="section-title text-soraia-dark">Quiénes Somos</h2>
          <p className="section-subtitle text-soraia-dark">Conoce el equipo detrás de Soraia</p>

          <div
            ref={aboutRef}
            className={`grid grid-cols-1 md:grid-cols-2 gap-12 items-center mt-12 ${aboutIsVisible ? 'animate-fade-in' : 'opacity-0'}`}
          >
            <div className={`${aboutIsVisible ? 'animate-slide-in-left' : 'opacity-0'}`}>
              <h3 className="text-2xl font-bold mb-4 text-soraia-dark">Nuestra Historia</h3>
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
          <h2 className="section-title text-soraia-dark">Lo Que Hacemos</h2>
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

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div ref={contactRef} className="container mx-auto px-4">
          <h2 className="section-title text-soraia-dark">Contáctanos</h2>
          <p className="section-subtitle text-soraia-dark">¿Tienes un proyecto en mente? Hablemos sobre él</p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mt-12">
            <div className="card bg-soraia-light shadow-lg">
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

            <div className="flex flex-col justify-center">
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-4 text-soraia-dark">Información de contacto</h3>
                <p className="text-soraia-dark mb-6">
                  Estamos disponibles para ayudarte con cualquier consulta sobre nuestros servicios.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-soraia-primary mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="text-soraia-dark">info@soraia.com</span>
                  </div>

                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-soraia-primary mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span className="text-soraia-dark">+34 123 456 789</span>
                  </div>

                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-soraia-primary mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="text-soraia-dark">Calle Imaginaria 123, Madrid, España</span>
                  </div>

                  {/* WhatsApp Section */}
                  <div className="mt-8 p-4 bg-green-100 rounded-lg">
                    <h4 className="text-lg font-bold text-green-700 mb-2 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                      </svg>
                      WhatsApp
                    </h4>
                    <p className="text-green-700 mb-3">
                      Contáctanos directamente por WhatsApp para una respuesta rápida:
                    </p>
                    <a 
                      href="https://wa.me/34123456789" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg inline-flex items-center transition-colors duration-300"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                      </svg>
                      Iniciar chat
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
