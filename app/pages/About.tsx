import { useEffect, useRef, useState } from "react";

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

export default function About() {
    const { ref: aboutRef, isVisible: aboutIsVisible } = useIntersectionObserver({ threshold: 0.1 });

    return (
        <section id="about" className="py-20 bg-gray-900">
            <div className="container mx-auto px-4">
                <h2 className="section-title">¿QUÉ HACEMOS EN SORAIA?</h2>

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
    )
}