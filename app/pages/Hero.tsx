import { useEffect, useRef, useState } from "react";
import CirclesBackground from "~/components/CirclesBackground";
import { useLanguage } from "~/i18n/context";

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
    const { t } = useLanguage();

    // Estado para controlar las animaciones secuenciales
    const [animationsStarted, setAnimationsStarted] = useState(false);

    // Efecto para iniciar las animaciones cuando el componente sea visible
    useEffect(() => {
        if (heroIsVisible) {
            setAnimationsStarted(true);
        }
    }, [heroIsVisible]);

    return (
        <section id="home" className="min-h-screen flex flex-col justify-center relative overflow-hidden bg-gradient-to-br from-soraia-light via-gray-800 to-gray-900">
            {/* Animated background circles */}
            <CirclesBackground />

            <div
                ref={heroRef}
                className={`container relative mx-auto px-16 z-10 ${heroIsVisible ? 'animate-fade-in' : 'opacity-0'}`}
            >
                <div className="flex flex-col lg:flex-row items-center">
                    {/* Left Column - Content - Left aligned */}
                    <div className="lg:w-1/2 text-left">
                        {/* Accent line above heading - left aligned */}
                        <div
                            className={`w-24 h-1 bg-gradient-to-r from-soraia-primary to-soraia-accent rounded-full transition-all duration-1000 transform ${animationsStarted ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}
                            style={{ transitionDelay: '200ms' }}
                        ></div>

                        <h1
                            className={`text-5xl md:text-7xl font-bold mb-6 text-white leading-tight transition-all duration-1000 transform ${animationsStarted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                            style={{ transitionDelay: '400ms' }}
                        >
                            {t('hero.title')}
                        </h1>

                        {/* Animated underline - left aligned */}
                        <div
                            className={`w-32 h-1 bg-gradient-to-r from-soraia-accent to-soraia-primary mb-8 rounded-full animate-pulse transition-all duration-1000 transform ${animationsStarted ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}
                            style={{ transitionDelay: '600ms' }}
                        ></div>

                        <p
                            className={`text-lg md:text-lg mb-12 text-soraia-dark max-w-xl leading-relaxed backdrop-blur-sm rounded-xl transition-all duration-1000 ${animationsStarted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                            style={{ transitionDelay: '800ms' }}
                        >
                            {t('hero.subtitle')}
                        </p>

                        {/* Left-aligned CTA button with animation */}
                        <a
                            href="#contact"
                            className={`relative overflow-hidden group bg-soraia-primary text-soraia-light px-10 py-4 rounded-full font-bold transition-all duration-1000 hover:shadow-lg hover:shadow-soraia-primary/30 transform hover:-translate-y-1 inline-flex items-center ${animationsStarted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                            style={{ transitionDelay: '1000ms' }}
                        >
                            <span className="relative z-10">{t('hero.ctaButton')}</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                            <div className="absolute inset-0 w-0 bg-soraia-secondary group-hover:w-full transition-all duration-500 ease-out"></div>
                        </a>
                    </div>

                    {/* Right Column - Image with entrance animation */}
                    <div className="lg:w-1/2 mt-12 lg:mt-0 relative flex justify-center">
                        <div
                            className={`relative z-10 transition-all duration-1000 transform ${animationsStarted ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 translate-x-20 scale-95'}`}
                            style={{ transitionDelay: '700ms' }}
                        >
                            {/* Image without container background - increased size */}
                            <img
                                src="PcPhoneImg.png"
                                alt="Diseño web profesional"
                                className="w-auto h-auto max-h-[50rem] drop-shadow-xl"
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

            {/* Scroll indicator with delayed animation */}
            <div
                className={`absolute bottom-24 left-1/2 transform -translate-x-1/2 transition-all duration-1000 ${animationsStarted ? 'opacity-100 translate-y-0 animate-bounce' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: '1500ms' }}
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-soraia-primary/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
            </div>
        </section>
    )
}