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

export default function Contact() {
    const { ref: contactRef, isVisible: contactIsVisible } = useIntersectionObserver({ threshold: 0.1 });
    const { t } = useLanguage();

    // Estado para controlar las animaciones secuenciales
    const [animationsStarted, setAnimationsStarted] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    // Efecto para iniciar las animaciones cuando el componente sea visible
    useEffect(() => {
        if (contactIsVisible) {
            setAnimationsStarted(true);
        }
    }, [contactIsVisible]);

    // Si tienes una función de envío de formulario, asegúrate de actualizar estas variables
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            // Tu lógica de envío de formulario actual
            // ...

            // Al completarse exitosamente:
            setSuccess(true);
            setError(false);
            // Si deseas, puedes limpiar el formulario aquí
        } catch (err) {
            setError(true);
            setSuccess(false);
            console.error("Error al enviar el formulario:", err);
        }
    };

    return (
        <section id="contact" className="py-10 relative overflow-hidden bg-transparent">
            {/* Add animated background circles with different configuration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Unique circles positioned differently than other sections */}
                <div
                    className={`circle-lg absolute bottom-1/4 right-1/5 w-72 h-72 rounded-full bg-soraia-primary/15 blur-2xl transition-all duration-1000 ${animationsStarted ? 'opacity-100 animate-float' : 'opacity-0'}`}
                    style={{ transitionDelay: '300ms' }}
                ></div>
                <div
                    className={`circle-md absolute top-1/3 left-1/4 w-56 h-56 rounded-full bg-soraia-accent/10 blur-2xl transition-all duration-1000 ${animationsStarted ? 'opacity-100 animate-float-delay' : 'opacity-0'}`}
                    style={{ transitionDelay: '500ms' }}
                ></div>
                <div
                    className={`circle-sm absolute bottom-2/3 right-1/3 w-40 h-40 rounded-full bg-soraia-secondary/15 blur-xl transition-all duration-1000 ${animationsStarted ? 'opacity-100 animate-float-reverse' : 'opacity-0'}`}
                    style={{ transitionDelay: '700ms' }}
                ></div>
                <div
                    className={`circle-xs absolute bottom-1/2 left-1/3 w-24 h-24 rounded-full bg-soraia-primary/20 blur-xl transition-all duration-1000 ${animationsStarted ? 'opacity-100 animate-float-slow' : 'opacity-0'}`}
                    style={{ transitionDelay: '900ms' }}
                ></div>

                {/* Additional particles */}
                <div
                    className={`absolute bottom-1/4 right-1/3 w-1 h-1 rounded-full bg-white/60 transition-all duration-500 ${animationsStarted ? 'opacity-100 animate-ping' : 'opacity-0'}`}
                    style={{ animationDelay: "0.5s", transitionDelay: '1100ms' }}
                ></div>
                <div
                    className={`absolute top-1/3 left-1/2 w-1 h-1 rounded-full bg-white/60 transition-all duration-500 ${animationsStarted ? 'opacity-100 animate-ping' : 'opacity-0'}`}
                    style={{ animationDelay: "1.5s", transitionDelay: '1300ms' }}
                ></div>
            </div>

            <div ref={contactRef} className="container relative mx-auto px-4 z-10">
                <div className="text-center mb-4">
                    <h2
                        className={`section-title transition-all duration-1000 transform ${animationsStarted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}
                        style={{ transitionDelay: '400ms' }}
                    >
                        {t('contact.title')}
                    </h2>

                    <p
                        className={`section-subtitle transition-all duration-1000 ${animationsStarted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                        style={{ transitionDelay: '600ms' }}
                    >
                        {t('contact.subtitle')}
                    </p>
                </div>

                <div
                    className={`max-w-2xl mx-auto mt-12 transition-all duration-1000 transform ${animationsStarted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
                    style={{ transitionDelay: '800ms' }}
                >
                    {/* Glass effect on the form container */}
                    <div className="relative overflow-hidden backdrop-blur-md bg-gray-800/60 border border-gray-700/50 rounded-xl shadow-xl p-8 transition-all duration-300 hover:shadow-2xl group">
                        {/* Background glow effect */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-soraia-primary/20 via-transparent to-soraia-accent/20 rounded-xl blur opacity-20 group-hover:opacity-30 transition duration-500"></div>

                        {/* Content with relative position */}
                        <div className="relative">
                            <form className="space-y-6" onSubmit={handleSubmit}>
                                <div
                                    className={`transition-all duration-700 transform ${animationsStarted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                                    style={{ transitionDelay: '900ms' }}
                                >
                                    <label htmlFor="name" className="block text-soraia-dark mb-2">{t('contact.nameLabel')}</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        className="w-full px-4 py-3 rounded-lg bg-gray-700/70 backdrop-blur-sm border border-gray-600/80 focus:outline-none focus:ring-2 focus:ring-soraia-primary text-soraia-dark"
                                        placeholder={t('contact.namePlaceholder')}
                                    />
                                </div>

                                <div
                                    className={`transition-all duration-700 transform ${animationsStarted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                                    style={{ transitionDelay: '1000ms' }}
                                >
                                    <label htmlFor="email" className="block text-soraia-dark mb-2">{t('contact.emailLabel')}</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        className="w-full px-4 py-3 rounded-lg bg-gray-700/70 backdrop-blur-sm border border-gray-600/80 focus:outline-none focus:ring-2 focus:ring-soraia-primary text-soraia-dark"
                                        placeholder={t('contact.emailPlaceholder')}
                                    />
                                </div>

                                <div
                                    className={`transition-all duration-700 transform ${animationsStarted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                                    style={{ transitionDelay: '1100ms' }}
                                >
                                    <label htmlFor="message" className="block text-soraia-dark mb-2">{t('contact.messageLabel')}</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows={5}
                                        className="w-full px-4 py-3 rounded-lg bg-gray-700/70 backdrop-blur-sm border border-gray-600/80 focus:outline-none focus:ring-2 focus:ring-soraia-primary text-soraia-dark"
                                        placeholder={t('contact.messagePlaceholder')}
                                    ></textarea>
                                </div>

                                <div
                                    className={`transition-all duration-700 transform ${animationsStarted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                                    style={{ transitionDelay: '1200ms' }}
                                >
                                    <button
                                        type="submit"
                                        className="relative overflow-hidden group w-full bg-soraia-primary/90 backdrop-blur-sm text-white font-bold py-3 px-6 rounded-lg hover:bg-soraia-secondary transition-colors duration-300 transform hover:scale-105"
                                    >
                                        <span className="relative z-10">{t('contact.submitButton')}</span>
                                        <div className="absolute inset-0 w-0 bg-soraia-secondary group-hover:w-full transition-all duration-500 ease-out"></div>
                                    </button>
                                </div>

                                {/* Success/error messages */}
                                {success && <p className="text-green-400 mt-4">{t('contact.success')}</p>}
                                {error && <p className="text-red-400 mt-4">{t('contact.error')}</p>}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}