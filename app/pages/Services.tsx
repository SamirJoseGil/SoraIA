import { useEffect, useRef, useState } from "react";
import ServiceCard from "~/components/ServiceCard";

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

export default function Services() {
    const { ref: servicesRef, isVisible: servicesIsVisible } = useIntersectionObserver({ threshold: 0.1 });

    return (
        <section id="services" className="py-16 bg-gradient-to-br from-soraia-light via-gray-800 to-gray-900 relative overflow-hidden">
            {/* Background circles for the entire section */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="circle-lg absolute top-1/4 left-1/5 w-72 h-72 rounded-full bg-blue-500/5 animate-float blur-2xl"></div>
                <div className="circle-md absolute bottom-1/3 right-1/4 w-56 h-56 rounded-full bg-purple-500/5 animate-float-delay blur-2xl"></div>
                <div className="circle-sm absolute top-2/3 left-1/3 w-40 h-40 rounded-full bg-pink-500/5 animate-float-reverse blur-xl"></div>
                <div className="circle-xs absolute top-1/2 right-1/3 w-24 h-24 rounded-full bg-green-500/5 animate-float-slow blur-xl"></div>
            </div>

            <div ref={servicesRef} className="container relative mx-auto px-4 z-10 text-center">
                <div className="text-center mb-12">
                    <div className="w-20 h-1 bg-gradient-to-r from-soraia-primary to-soraia-accent mx-auto mb-6 rounded-full"></div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center text-white">SERVICIOS</h2>
                    <p className="text-gray-300 mb-10 max-w-2xl mx-auto text-sm md:text-base">
                        Ofrecemos soluciones web hechas a tu medida, con enfoque en la calidad,
                        velocidad de entrega y resultados que transforman tu presencia digital.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    <ServiceCard
                        title="Páginas Web Personalizadas"
                        description="Tu carta de presentación digital. Creamos sitios con diseño único, optimizados para cualquier pantalla y pensados para destacar."
                        icon={
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        }
                        iconColor="#4dabf7"
                        delay={0}
                    />

                    <ServiceCard
                        title="Landing Pages que convierten"
                        description="¿Tienes una campaña, un producto o servicio que quieres impulsar? Creamos páginas que atrapan la atención y guían al usuario a tomar acción."
                        icon={
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                            </svg>
                        }
                        iconColor="#be4bdb"
                        delay={100}
                    />

                    <ServiceCard
                        title="Marketplaces & Tiendas Online"
                        description="¿Quieres vender en línea? Diseñamos y desarrollamos plataformas de e-commerce funcionales, seguras y fáciles de usar."
                        icon={
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                        }
                        iconColor="#f783ac"
                        delay={200}
                    />

                    <ServiceCard
                        title="Express Delivery"
                        description="Tu web lista en 3, 10 o 15 días. Tú eliges el ritmo, nosotros hacemos que suceda. Este es lo que nos hace diferentes."
                        icon={
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        }
                        iconColor="#40c057"
                        delay={300}
                    />
                </div>
            </div>
        </section>
    )
}