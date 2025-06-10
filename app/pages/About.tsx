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

export default function About() {
    const { ref: aboutRef, isVisible: aboutIsVisible } = useIntersectionObserver({ threshold: 0.1 });
    const { t } = useLanguage();

    // Estado para controlar las animaciones secuenciales
    const [animationsStarted, setAnimationsStarted] = useState(false);

    // Efecto para iniciar las animaciones cuando el componente sea visible
    useEffect(() => {
        if (aboutIsVisible) {
            setAnimationsStarted(true);
        }
    }, [aboutIsVisible]);

    return (
        <section id="about" className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-soraia-light relative overflow-hidden">
            {/* Background circles with different configuration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div
                    className={`circle-lg absolute top-1/4 left-1/5 w-72 h-72 rounded-full bg-soraia-primary/5 blur-2xl transition-all duration-1000 ${animationsStarted ? 'opacity-100 animate-float' : 'opacity-0'}`}
                    style={{ transitionDelay: '300ms' }}
                ></div>
                <div
                    className={`circle-md absolute bottom-1/3 right-1/4 w-56 h-56 rounded-full bg-soraia-accent/5 blur-2xl transition-all duration-1000 ${animationsStarted ? 'opacity-100 animate-float-delay' : 'opacity-0'}`}
                    style={{ transitionDelay: '500ms' }}
                ></div>
                <div
                    className={`circle-sm absolute top-2/3 left-1/3 w-40 h-40 rounded-full bg-soraia-secondary/5 blur-xl transition-all duration-1000 ${animationsStarted ? 'opacity-100 animate-float-reverse' : 'opacity-0'}`}
                    style={{ transitionDelay: '700ms' }}
                ></div>
                <div
                    className={`circle-xs absolute top-1/2 right-1/3 w-24 h-24 rounded-full bg-white/5 blur-xl transition-all duration-1000 ${animationsStarted ? 'opacity-100 animate-float-slow' : 'opacity-0'}`}
                    style={{ transitionDelay: '900ms' }}
                ></div>
            </div>

            <div ref={aboutRef} className="container relative mx-auto px-4 z-10">
                <div className="text-center mb-12">
                    <div
                        className={`w-20 h-1 bg-gradient-to-r from-soraia-primary to-soraia-accent mx-auto mb-6 rounded-full transition-all duration-1000 transform ${animationsStarted ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}
                        style={{ transitionDelay: '200ms' }}
                    ></div>

                    <h2
                        className={`section-title transition-all duration-1000 transform ${animationsStarted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}
                        style={{ transitionDelay: '400ms' }}
                    >
                        {t('about.title')}
                    </h2>

                    <p
                        className={`text-xl mb-10 text-center max-w-3xl mx-auto text-soraia-dark transition-all duration-1000 ${animationsStarted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                        style={{ transitionDelay: '600ms' }}
                    >
                        {t('about.subtitle')}
                    </p>

                    <div
                        className={`w-24 h-px bg-gradient-to-r from-transparent via-soraia-primary to-transparent mx-auto mb-10 transition-all duration-1000 ${animationsStarted ? 'opacity-60 scale-x-100' : 'opacity-0 scale-x-0'}`}
                        style={{ transitionDelay: '800ms' }}
                    ></div>

                    <p
                        className={`text-gray-300 mb-16 max-w-2xl mx-auto transition-all duration-1000 ${animationsStarted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                        style={{ transitionDelay: '900ms' }}
                    >
                        {t('about.description')}
                    </p>
                </div>

                <div className="max-w-5xl mx-auto">
                    <div
                        className={`grid grid-cols-1 md:grid-cols-3 gap-8 transition-all duration-1000 ${animationsStarted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
                        style={{ transitionDelay: '1000ms' }}
                    >
                        {/* Service 1 */}
                        <div className="about-card">
                            <div className="about-card-content">
                                <h3 className="text-xl font-bold text-white mb-4">{t('about.item1.title')}</h3>
                                <p className="text-soraia-dark">{t('about.item1.description')}</p>
                            </div>
                        </div>

                        {/* Service 2 */}
                        <div className="about-card">
                            <div className="about-card-content">
                                <h3 className="text-xl font-bold text-white mb-4">{t('about.item2.title')}</h3>
                                <p className="text-soraia-dark">{t('about.item2.description')}</p>
                            </div>
                        </div>

                        {/* Service 3 */}
                        <div className="about-card">
                            <div className="about-card-content">
                                <h3 className="text-xl font-bold text-white mb-4">{t('about.item3.title')}</h3>
                                <p className="text-soraia-dark">{t('about.item3.description')}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    className={`w-20 h-1 bg-gradient-to-r from-soraia-accent to-soraia-primary mx-auto mt-16 rounded-full transition-all duration-1000 transform ${animationsStarted ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}
                    style={{ transitionDelay: '1200ms' }}
                ></div>
            </div>
        </section>
    )
}