import { useEffect, useRef, useState } from "react";
import CirclesBackground from "~/components/CirclesBackground";

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

export default function Hero() {
    const { ref: heroRef, isVisible: heroIsVisible } = useIntersectionObserver({ threshold: 0.1 });

    return (
        <section id="home" className="min-h-screen flex flex-col justify-center relative overflow-hidden bg-gradient-to-br from-soraia-light via-gray-800 to-gray-900">
            {/* Animated background circles */}
            <CirclesBackground />
            <div
                ref={heroRef}
                className={`container relative mx-auto px-16 py-12 z-10 ${heroIsVisible ? 'animate-fade-in' : 'opacity-0'}`}
            >
                <div className="flex flex-col lg:flex-row items-center">
                    {/* Left Column - Content - Now centered */}
                    <div className="lg:w-1/2 text-center">
                        {/* Accent line above heading - centered */}
                        <div className="w-24 h-1 bg-gradient-to-r from-soraia-primary to-soraia-accent mb-8 rounded-full mx-auto"></div>

                        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white leading-tight">
                            Tu página web lista en <span className="text-soraia-accent">tiempo récord</span>
                        </h1>

                        {/* Animated underline - centered */}
                        <div className="w-32 h-1 bg-gradient-to-r from-soraia-accent to-soraia-primary mb-8 rounded-full animate-pulse mx-auto"></div>

                        <p className="text-xl md:text-2xl mb-12 text-soraia-dark max-w-xl mx-auto leading-relaxed backdrop-blur-sm py-4 px-6 rounded-xl">
                            En Soraia diseñamos y desarrollamos sitios web, landing pages y marketplaces
                            con rapidez, estrategia y estilo. Sabemos lo valioso que es tu tiempo, por eso
                            hacemos que tu proyecto esté en línea… antes de lo que imaginas.
                        </p>

                        {/* Centered CTA button */}
                        <div className="flex justify-center">
                            <a
                                href="#contact"
                                className="relative overflow-hidden group bg-soraia-primary text-soraia-light px-10 py-4 rounded-full font-bold transition-all duration-300 hover:shadow-lg hover:shadow-soraia-primary/30 transform hover:-translate-y-1 inline-flex items-center"
                            >
                                <span className="relative z-10">Solicita asesoría</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                                <div className="absolute inset-0 w-0 bg-soraia-secondary group-hover:w-full transition-all duration-500 ease-out"></div>
                            </a>
                        </div>
                    </div>

                    {/* Right Column - Image without background */}
                    <div className="lg:w-1/2 mt-12 lg:mt-0 relative flex justify-center">
                        <div className="relative z-10">
                            {/* Image without container background */}
                            <img
                                src="PcPhoneImg.png"
                                alt="Diseño web profesional"
                                className="w-auto h-auto max-h-96 drop-shadow-xl"
                                onError={(e) => {
                                    // Fallback if image doesn't load
                                    const target = e.target as HTMLImageElement;
                                    target.onerror = null;
                                    target.src = "https://placehold.co/800x600/3a75b0/ffffff?text=Soraia+Web";
                                }}
                            />
                        </div>
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
    )
}