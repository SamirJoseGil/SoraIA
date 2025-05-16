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

    return (
        <section id="about" className="py-20 bg-gray-900">
            <div className="container mx-auto px-4">
                <h2 className="section-title">
                    {t('about.title')}
                </h2>
                <p className="text-soraia-dark mb-6 text-lg">
                    {t('about.subtitle')}
                </p>
                <p className="text-soraia-dark text-lg">
                    {t('about.description')}
                </p>

                <div
                    ref={aboutRef}
                    className={`grid grid-cols-1 md:grid-cols-2 gap-12 items-center mt-12 ${aboutIsVisible ? 'animate-fade-in' : 'opacity-0'}`}
                >
                    <div className={`${aboutIsVisible ? 'animate-slide-in-left' : 'opacity-0'}`}>
                        <div className="...">
                            <h3>{t('about.item1.title')}</h3>
                            <p>{t('about.item1.description')}</p>
                        </div>
                        <div className="...">
                            <h3>{t('about.item2.title')}</h3>
                            <p>{t('about.item2.description')}</p>
                        </div>
                        <div className="...">
                            <h3>{t('about.item3.title')}</h3>
                            <p>{t('about.item3.description')}</p>
                        </div>
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