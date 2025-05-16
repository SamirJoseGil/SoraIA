import { useEffect, useRef, useState } from "react";
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

export default function Because() {
    const { t } = useLanguage();
    const { ref: whySoraiaRef, isVisible: whySoraiaIsVisible } = useIntersectionObserver({ threshold: 0.1 });

    // Estado para controlar las animaciones secuenciales
    const [animationsStarted, setAnimationsStarted] = useState(false);

    // Efecto para iniciar las animaciones cuando el componente sea visible
    useEffect(() => {
        if (whySoraiaIsVisible) {
            setAnimationsStarted(true);
        }
    }, [whySoraiaIsVisible]);

    return (
        <section id="why-soraia" className="py-20 relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-900 to-black">
            {/* Animated background circles with entrance animations */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div
                    className={`circle-lg absolute top-1/4 right-1/5 w-72 h-72 rounded-full bg-soraia-primary/5 blur-2xl transition-all duration-1000 ${animationsStarted ? 'opacity-100 animate-float' : 'opacity-0'}`}
                    style={{ transitionDelay: '300ms' }}
                ></div>
                <div
                    className={`circle-md absolute bottom-1/3 left-1/4 w-56 h-56 rounded-full bg-soraia-accent/5 blur-2xl transition-all duration-1000 ${animationsStarted ? 'opacity-100 animate-float-delay' : 'opacity-0'}`}
                    style={{ transitionDelay: '400ms' }}
                ></div>
                <div
                    className={`circle-sm absolute top-2/3 right-1/3 w-40 h-40 rounded-full bg-soraia-secondary/5 blur-xl transition-all duration-1000 ${animationsStarted ? 'opacity-100 animate-float-reverse' : 'opacity-0'}`}
                    style={{ transitionDelay: '500ms' }}
                ></div>
                <div
                    className={`circle-xs absolute bottom-1/4 left-1/2 w-24 h-24 rounded-full bg-white/5 blur-xl transition-all duration-1000 ${animationsStarted ? 'opacity-100 animate-float-slow' : 'opacity-0'}`}
                    style={{ transitionDelay: '600ms' }}
                ></div>

                {/* Additional sparkles */}
                <div
                    className={`absolute top-1/3 right-1/4 w-1 h-1 rounded-full bg-white/60 transition-all duration-500 ${animationsStarted ? 'opacity-100 animate-ping' : 'opacity-0'}`}
                    style={{ animationDelay: "0.8s", transitionDelay: '900ms' }}
                ></div>
                <div
                    className={`absolute bottom-1/4 left-1/3 w-1 h-1 rounded-full bg-white/60 transition-all duration-500 ${animationsStarted ? 'opacity-100 animate-ping' : 'opacity-0'}`}
                    style={{ animationDelay: "2s", transitionDelay: '1000ms' }}
                ></div>
            </div>

            <div ref={whySoraiaRef} className="container relative mx-auto px-4 z-10">
                <div className="text-center mb-16">
                    <div
                        className={`w-20 h-1 bg-gradient-to-r from-soraia-primary to-soraia-accent mx-auto mb-6 rounded-full transition-all duration-1000 transform ${animationsStarted ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`}
                        style={{ transitionDelay: '200ms' }}
                    ></div>

                    <h2
                        className={`text-3xl md:text-4xl font-bold mb-6 text-center text-white transition-all duration-1000 transform ${animationsStarted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}
                        style={{ transitionDelay: '400ms' }}
                    >
                        {t('because.title')}
                    </h2>

                    <p
                        className={`text-gray-300 mb-10 max-w-2xl mx-auto text-sm md:text-base transition-all duration-1000 ${animationsStarted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                        style={{ transitionDelay: '600ms' }}
                    >
                        {t('because.subtitle')}
                    </p>

                    <div
                        className={`w-24 h-1 bg-gradient-to-r from-soraia-accent to-soraia-primary mx-auto mt-6 rounded-full transition-all duration-1000 transform ${animationsStarted ? 'opacity-100 animate-pulse' : 'opacity-0'}`}
                        style={{ transitionDelay: '800ms' }}
                    ></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
                    {/* Card 1 - with entrance animation */}
                    <div
                        className={`relative overflow-hidden bg-gray-800/40 backdrop-blur-md rounded-xl p-6 text-center transition-all duration-1000 hover:transform hover:scale-105 group border border-gray-700/30 ${animationsStarted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
                        style={{ transitionDelay: '400ms' }}
                    >
                        {/* Background glow effect */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-soraia-primary/10 via-transparent to-soraia-primary/10 rounded-xl blur opacity-20 group-hover:opacity-30 transition duration-500"></div>

                        <div className="relative z-10">
                            <div
                                className={`bg-soraia-primary/20 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center backdrop-blur-sm transition-all duration-700 ${animationsStarted ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}
                                style={{ transitionDelay: '600ms' }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-soraia-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-3">{t('because.point1.title')}</h3>
                            <p className="text-soraia-dark">{t('because.point1.description')}</p>
                        </div>
                    </div>

                    {/* Card 2 - with entrance animation */}
                    <div
                        className={`relative overflow-hidden bg-gray-800/40 backdrop-blur-md rounded-xl p-6 text-center transition-all duration-1000 hover:transform hover:scale-105 group border border-gray-700/30 ${animationsStarted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
                        style={{ transitionDelay: '550ms' }}
                    >
                        {/* Background glow effect */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-soraia-primary/10 via-transparent to-soraia-primary/10 rounded-xl blur opacity-20 group-hover:opacity-30 transition duration-500"></div>

                        <div className="relative z-10">
                            <div
                                className={`bg-soraia-primary/20 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center backdrop-blur-sm transition-all duration-700 ${animationsStarted ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}
                                style={{ transitionDelay: '750ms' }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-soraia-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-3">{t('because.point2.title')}</h3>
                            <p className="text-soraia-dark">{t('because.point2.description')}</p>
                        </div>
                    </div>

                    {/* Card 3 - with entrance animation */}
                    <div
                        className={`relative overflow-hidden bg-gray-800/40 backdrop-blur-md rounded-xl p-6 text-center transition-all duration-1000 hover:transform hover:scale-105 group border border-gray-700/30 ${animationsStarted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
                        style={{ transitionDelay: '700ms' }}
                    >
                        {/* Background glow effect */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-soraia-primary/10 via-transparent to-soraia-primary/10 rounded-xl blur opacity-20 group-hover:opacity-30 transition duration-500"></div>

                        <div className="relative z-10">
                            <div
                                className={`bg-soraia-primary/20 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center backdrop-blur-sm transition-all duration-700 ${animationsStarted ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}
                                style={{ transitionDelay: '900ms' }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-soraia-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-3">{t('because.point3.title')}</h3>
                            <p className="text-soraia-dark">{t('because.point3.description')}</p>
                        </div>
                    </div>

                    {/* Card 4 - with entrance animation */}
                    <div
                        className={`relative overflow-hidden bg-gray-800/40 backdrop-blur-md rounded-xl p-6 text-center transition-all duration-1000 hover:transform hover:scale-105 group border border-gray-700/30 ${animationsStarted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
                        style={{ transitionDelay: '850ms' }}
                    >
                        {/* Background glow effect */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-soraia-primary/10 via-transparent to-soraia-primary/10 rounded-xl blur opacity-20 group-hover:opacity-30 transition duration-500"></div>

                        <div className="relative z-10">
                            <div
                                className={`bg-soraia-primary/20 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center backdrop-blur-sm transition-all duration-700 ${animationsStarted ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}
                                style={{ transitionDelay: '1050ms' }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-soraia-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-3">{t('because.point4.title')}</h3>
                            <p className="text-soraia-dark">{t('because.point4.description')}</p>
                        </div>
                    </div>
                </div>

                {/* Final decorative element with animation */}
                <div
                    className={`w-20 h-1 bg-gradient-to-r from-soraia-primary to-soraia-accent mx-auto mt-16 rounded-full transition-all duration-1000 transform ${animationsStarted ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}
                    style={{ transitionDelay: '1100ms' }}
                ></div>
            </div>
        </section>
    )
}