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
      <div className="text-indigo-600 dark:text-indigo-400 mb-4 inline-block">{icon}</div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  );
}

export default function Index() {
  const { ref: heroRef, isVisible: heroIsVisible } = useIntersectionObserver({ threshold: 0.1 });
  const { ref: aboutRef, isVisible: aboutIsVisible } = useIntersectionObserver({ threshold: 0.1 });

  return (
    <div>
      <Header />

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div
          ref={heroRef}
          className={`container mx-auto px-4 py-20 text-center ${heroIsVisible ? 'animate-fade-in' : 'opacity-0'}`}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Transformamos ideas en software real</h1>
          <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto">
            Somos expertos en desarrollo y consultoría tecnológica para empresas visionarias
          </p>
          <a
            href="#contact"
            className="bg-white text-indigo-600 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors duration-300 inline-block"
          >
            Solicita una demo
          </a>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="section-title">Quiénes Somos</h2>
          <p className="section-subtitle">Conoce el equipo detrás de Soraia</p>

          <div
            ref={aboutRef}
            className={`grid grid-cols-1 md:grid-cols-2 gap-12 items-center mt-12 ${aboutIsVisible ? 'animate-fade-in' : 'opacity-0'}`}
          >
            <div className={`${aboutIsVisible ? 'animate-slide-in-left' : 'opacity-0'}`}>
              <h3 className="text-2xl font-bold mb-4">Nuestra Historia</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Fundada en 2020, Soraia nació con la misión de crear soluciones tecnológicas que realmente importen.
                No somos simplemente programadores, somos arquitectos de soluciones digitales.
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Nuestro equipo está compuesto por expertos en distintas áreas de la tecnología, unidos por la pasión
                de transformar ideas complejas en productos funcionales y elegantes.
              </p>
            </div>

            <div className={`${aboutIsVisible ? 'animate-slide-in-right' : 'opacity-0'}`}>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
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
      <section id="services" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="section-title">Lo Que Hacemos</h2>
          <p className="section-subtitle">Nuestros servicios diseñados para impulsar tu negocio</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
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

            <ServiceCard
              title="Consultoría Tecnológica"
              description="Asesoramos en la elección e implementación de tecnologías adecuadas para tu negocio."
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              }
              delay={600}
            />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="section-title">Contáctanos</h2>
          <p className="section-subtitle">¿Tienes un proyecto en mente? Hablemos sobre él</p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mt-12">
            <div className="card">
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-gray-700 dark:text-gray-300 mb-2">Nombre</label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Tu nombre"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="tu@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-gray-700 dark:text-gray-300 mb-2">Mensaje</label>
                  <textarea
                    id="message"
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="¿En qué podemos ayudarte?"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors duration-300"
                >
                  Enviar mensaje
                </button>
              </form>
            </div>

            <div className="flex flex-col justify-center">
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-4">Información de contacto</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Estamos disponibles para ayudarte con cualquier consulta sobre nuestros servicios.
                </p>

                <div className="space-y-4">
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600 dark:text-indigo-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="text-gray-600 dark:text-gray-300">info@soraia.com</span>
                  </div>

                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600 dark:text-indigo-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span className="text-gray-600 dark:text-gray-300">+34 123 456 789</span>
                  </div>

                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600 dark:text-indigo-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-gray-600 dark:text-gray-300">Calle Imaginaria 123, Madrid, España</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-200 dark:bg-gray-700 rounded-lg h-64">
                {/* This would be replaced with a real map component in production */}
                <div className="w-full h-full flex items-center justify-center text-gray-500 dark:text-gray-400">
                  Mapa de ubicación
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
