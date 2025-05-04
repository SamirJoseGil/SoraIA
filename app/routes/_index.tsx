import { useState, useEffect, useRef, ReactNode } from "react";
import type { MetaFunction } from "@remix-run/node";
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import ServiceCard from "~/components/ServiceCard";
import CirclesBackground from "~/components/CirclesBackground";
import FloatingWhatsApp from "~/components/FloatingWhatsApp";

export const meta: MetaFunction = () => {
  return [
    { title: "Soraia - Tu página web lista en tiempo récord" },
    { name: "description", content: "En Soraia diseñamos y desarrollamos sitios web, landing pages y marketplaces con rapidez, estrategia y estilo" },
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
  const { ref: whySoraiaRef, isVisible: whySoraiaIsVisible } = useIntersectionObserver({ threshold: 0.1 });
  const { ref: contactRef, isVisible: contactIsVisible } = useIntersectionObserver({ threshold: 0.1 });

  const [activeSection, setActiveSection] = useState('home');

  // Effect to determine active section based on visibility
  useEffect(() => {
    if (contactIsVisible) {
      setActiveSection('contact');
    } else if (whySoraiaIsVisible) {
      setActiveSection('why-soraia');
    } else if (servicesIsVisible) {
      setActiveSection('services');
    } else if (aboutIsVisible) {
      setActiveSection('about');
    } else if (heroIsVisible) {
      setActiveSection('home');
    }
  }, [heroIsVisible, aboutIsVisible, servicesIsVisible, whySoraiaIsVisible, contactIsVisible]);

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
      @keyframes pulse {
        0%, 100% { opacity: 0.6; transform: scale(1); }
        50% { opacity: 0.3; transform: scale(1.05); }
      }
      
      @keyframes ping {
        75%, 100% {
          transform: scale(2);
          opacity: 0;
        }
      }
      
      .animate-ping {
        animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
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

      {/* Hero Section - modern design without card */}
      <section id="home" className="min-h-screen flex flex-col justify-center relative overflow-hidden bg-gradient-to-br from-soraia-light via-gray-800 to-gray-900">
        {/* Animated background circles */}
        <CirclesBackground />

        {/* Content with direct glass elements instead of a card */}
        <div
          ref={heroRef}
          className={`container relative mx-auto px-4 py-12 text-center z-10 ${heroIsVisible ? 'animate-fade-in' : 'opacity-0'}`}
        >
          <div className="max-w-4xl mx-auto">
            {/* Accent line above heading */}
            <div className="w-24 h-1 bg-gradient-to-r from-soraia-primary to-soraia-accent mx-auto mb-8 rounded-full"></div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-soraia-primary leading-tight">
              Tu página web lista en <span className="text-soraia-accent">tiempo récord</span>
            </h1>

            {/* Animated underline */}
            <div className="w-32 h-1 bg-gradient-to-r from-soraia-accent to-soraia-primary mx-auto mb-8 rounded-full animate-pulse"></div>

            <p className="text-xl md:text-2xl mb-12 text-soraia-dark max-w-3xl mx-auto leading-relaxed backdrop-blur-sm py-4 px-6 rounded-xl">
              En Soraia diseñamos y desarrollamos sitios web, landing pages y marketplaces
              con rapidez, estrategia y estilo. Sabemos lo valioso que es tu tiempo, por eso
              hacemos que tu proyecto esté en línea… antes de lo que imaginas.
            </p>

            {/* CTA buttons with more modern design */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#contact"
                className="relative overflow-hidden group bg-soraia-primary text-soraia-light px-8 py-4 rounded-full font-bold transition-all duration-300 hover:shadow-lg hover:shadow-soraia-primary/30 transform hover:-translate-y-1"
              >
                <span className="relative z-10">¡Empieza tu proyecto hoy!</span>
                <div className="absolute inset-0 w-0 bg-soraia-secondary group-hover:w-full transition-all duration-500 ease-out"></div>
              </a>
              <a
                href="#services"
                className="bg-transparent border-2 border-soraia-primary/50 text-soraia-primary px-8 py-3.5 rounded-full font-bold transition-all duration-300 hover:border-soraia-primary hover:bg-soraia-primary/10"
              >
                Descubre nuestros servicios
              </a>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-soraia-primary/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="section-title">¿QUÉ HACEMOS EN SORAIA?</h2>
          <p className="section-subtitle">No vendemos humo, vendemos resultados.</p>

          <div
            ref={aboutRef}
            className={`grid grid-cols-1 md:grid-cols-2 gap-12 items-center mt-12 ${aboutIsVisible ? 'animate-fade-in' : 'opacity-0'}`}
          >
            <div className={`${aboutIsVisible ? 'animate-slide-in-left' : 'opacity-0'}`}>
              <p className="text-soraia-dark mb-6 text-lg">
                En Soraia creamos páginas web modernas, efectivas y rápidas de entregar.
                Te ayudamos a tener presencia digital sin enredos, sin esperas y sin complicaciones.
              </p>
              <p className="text-soraia-dark text-lg">
                Nos especializamos en brindar soluciones web que se ajustan a tus necesidades
                y que están listas cuando las necesitas.
              </p>
            </div>

            <div className={`${aboutIsVisible ? 'animate-slide-in-right' : 'opacity-0'}`}>
              <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
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

      {/* Services Section - with transparent background and animations */}
      <section id="services" className="py-20 relative overflow-hidden bg-gradient-to-br from-soraia-light via-gray-800 to-gray-900">
        {/* Add animated background circles */}
        <CirclesBackground />

        <div ref={servicesRef} className="container relative mx-auto px-4 z-10">
          <div className="text-center mb-16">
            <div className="w-20 h-1 bg-gradient-to-r from-soraia-primary to-soraia-accent mx-auto mb-6 rounded-full"></div>
            <h2 className="section-title">SERVICIOS</h2>
            <p className="section-subtitle">Soluciones web hechas a tu medida</p>
            <div className="w-24 h-1 bg-gradient-to-r from-soraia-accent to-soraia-primary mx-auto mt-6 rounded-full animate-pulse"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            <ServiceCard
              title="Páginas Web Personalizadas"
              description="Tu carta de presentación digital. Creamos sitios con diseño único, optimizados para cualquier pantalla y pensados para destacar."
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              }
              delay={0}
            />

            <ServiceCard
              title="Landing Pages que convierten"
              description="¿Tienes una campaña, un producto o servicio que quieres impulsar? Creamos páginas que atrapan la atención y guían al usuario a tomar acción."
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                </svg>
              }
              delay={200}
            />

            <ServiceCard
              title="Marketplaces & Tiendas Online"
              description="¿Quieres vender en línea? Diseñamos y desarrollamos plataformas de e-commerce funcionales, seguras y fáciles de usar."
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              }
              delay={400}
            />

            <ServiceCard
              title="Express Delivery"
              description="Tu web lista en 3, 10 o 15 días. Tú eliges el ritmo, nosotros hacemos que suceda. Este es lo que nos hace diferentes."
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
              delay={600}
            />
          </div>
        </div>
      </section>

      {/* Por qué Soraia section */}
      <section id="why-soraia" className="py-20 bg-gray-900">
        <div ref={whySoraiaRef} className="container mx-auto px-4">
          <h2 className="section-title">¿POR QUÉ SORAIA?</h2>
          <p className="section-subtitle">Porque entendemos lo que realmente necesitas</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            <div className="bg-gray-800 rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 hover:transform hover:scale-105">
              <div className="bg-soraia-primary/20 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-soraia-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-soraia-primary mb-3">Rapidez sin perder calidad</h3>
              <p className="text-soraia-dark">Entregamos a tiempo sin comprometer el resultado final ni el profesionalismo.</p>
            </div>

            <div className="bg-gray-800 rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 hover:transform hover:scale-105">
              <div className="bg-soraia-primary/20 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-soraia-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-soraia-primary mb-3">Comunicación clara</h3>
              <p className="text-soraia-dark">Te hablamos sin tanto "tecnicismo" para que entiendas exactamente qué hacemos.</p>
            </div>

            <div className="bg-gray-800 rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 hover:transform hover:scale-105">
              <div className="bg-soraia-primary/20 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-soraia-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-soraia-primary mb-3">Atención al detalle</h3>
              <p className="text-soraia-dark">Cuidamos los pequeños detalles que hacen que una web funcione y destaque.</p>
            </div>

            <div className="bg-gray-800 rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 hover:transform hover:scale-105">
              <div className="bg-soraia-primary/20 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-soraia-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-soraia-primary mb-3">Aliados digitales</h3>
              <p className="text-soraia-dark">No somos una agencia más: somos tu aliada digital para crecer juntos.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section - with transparent background and animations */}
      <section id="contact" className="py-20 relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-soraia-light">
        {/* Add animated background circles with different configuration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Unique circles positioned differently than other sections */}
          <div className="circle-lg absolute bottom-1/4 right-1/5 w-72 h-72 rounded-full bg-soraia-primary/15 animate-float blur-2xl"></div>
          <div className="circle-md absolute top-1/3 left-1/4 w-56 h-56 rounded-full bg-soraia-accent/10 animate-float-delay blur-2xl"></div>
          <div className="circle-sm absolute bottom-2/3 right-1/3 w-40 h-40 rounded-full bg-soraia-secondary/15 animate-float-reverse blur-xl"></div>
          <div className="circle-xs absolute bottom-1/2 left-1/3 w-24 h-24 rounded-full bg-soraia-primary/20 animate-float-slow blur-xl"></div>

          {/* Additional particles */}
          <div className="absolute bottom-1/4 right-1/3 w-1 h-1 rounded-full bg-white/60 animate-ping" style={{ animationDelay: "0.5s" }}></div>
          <div className="absolute top-1/3 left-1/2 w-1 h-1 rounded-full bg-white/60 animate-ping" style={{ animationDelay: "1.5s" }}></div>
        </div>

        <div ref={contactRef} className="container relative mx-auto px-4 z-10">
          <div className="text-center mb-16">
            <div className="w-20 h-1 bg-gradient-to-r from-soraia-primary to-soraia-accent mx-auto mb-6 rounded-full"></div>
            <h2 className="section-title">Hagamos tu web realidad</h2>
            <p className="section-subtitle">
              ¿Listo para tener una web que de verdad represente tu marca y esté lista en tiempo récord?
              <br />No lo pienses más. Hablemos y hagámoslo realidad.
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-soraia-accent to-soraia-primary mx-auto mt-6 rounded-full animate-pulse"></div>
          </div>

          <div className="max-w-2xl mx-auto mt-12">
            {/* Glass effect on the form container */}
            <div className="relative overflow-hidden backdrop-blur-md bg-gray-800/60 border border-gray-700/50 rounded-xl shadow-xl p-8 transition-all duration-300 hover:shadow-2xl group">
              {/* Background glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-soraia-primary/20 via-transparent to-soraia-accent/20 rounded-xl blur opacity-20 group-hover:opacity-30 transition duration-500"></div>

              {/* Content with relative position */}
              <div className="relative">
                <form className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-soraia-dark mb-2">Nombre</label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-3 rounded-lg bg-gray-700/70 backdrop-blur-sm border border-gray-600/80 focus:outline-none focus:ring-2 focus:ring-soraia-primary text-soraia-dark"
                      placeholder="Tu nombre"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-soraia-dark mb-2">Email</label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-3 rounded-lg bg-gray-700/70 backdrop-blur-sm border border-gray-600/80 focus:outline-none focus:ring-2 focus:ring-soraia-primary text-soraia-dark"
                      placeholder="tu@email.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-soraia-dark mb-2">Mensaje</label>
                    <textarea
                      id="message"
                      rows={5}
                      className="w-full px-4 py-3 rounded-lg bg-gray-700/70 backdrop-blur-sm border border-gray-600/80 focus:outline-none focus:ring-2 focus:ring-soraia-primary text-soraia-dark"
                      placeholder="¿En qué podemos ayudarte?"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="relative overflow-hidden group w-full bg-soraia-primary/90 backdrop-blur-sm text-white font-bold py-3 px-6 rounded-lg hover:bg-soraia-secondary transition-colors duration-300 transform hover:scale-105"
                  >
                    <span className="relative z-10">Quiero mi web</span>
                    <div className="absolute inset-0 w-0 bg-soraia-secondary group-hover:w-full transition-all duration-500 ease-out"></div>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp Call-to-Action */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="section-title">¿Prefieres hablar directamente?</h2>
          <p className="section-subtitle max-w-3xl mx-auto">
            Estamos a un mensaje de distancia para responder todas tus dudas
            y ayudarte a planificar tu proyecto web.
          </p>

          <div className="mt-12 flex flex-col items-center">
            <a
              href="https://wa.me/543217407700?text=Hola%2C%20estoy%20interesada%2Fo%20en%20crear%20una%20p%C3%A1gina%20web%20r%C3%A1pida%20y%20profesional%20con%20Soraia.%20%C2%BFPodemos%20hablar%3F%20%F0%9F%9A%80"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-green-500 text-white px-8 py-4 rounded-lg hover:bg-green-600 transition-all transform hover:scale-105 text-lg font-bold"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 mr-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
              </svg>
              Chatea en WhatsApp
            </a>
            <p className="text-gray-400 mt-4 text-sm">
              Mensaje predefinido: "Hola, estoy interesada/o en crear una página web rápida y profesional con Soraia. ¿Podemos hablar? 🚀"
            </p>
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