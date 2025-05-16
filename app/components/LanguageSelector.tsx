import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '~/i18n/context';
import { LANGUAGES } from '~/i18n/config';

export default function LanguageSelector() {
    const { language, setLanguage } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Cierra el menú cuando se hace clic fuera
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Encuentra la bandera del idioma actual
    const currentFlag = LANGUAGES.find(l => l.code === language)?.flag || '🌐';

    return (
        <div ref={dropdownRef} className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center space-x-1 px-3 py-2 rounded-md text-white hover:bg-white/10 transition-colors duration-200"
                aria-label="Seleccionar idioma"
            >
                <span className="text-lg">{currentFlag}</span>
                <span className="text-xs uppercase">{language}</span>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-4 w-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-36 rounded-md shadow-lg bg-white/10 backdrop-blur-md border border-white/20 overflow-hidden transition-all transform origin-top-right animate-fade-in z-50">
                    <div className="py-1">
                        {LANGUAGES.map((lang) => (
                            <button
                                key={lang.code}
                                onClick={() => {
                                    setLanguage(lang.code);
                                    setIsOpen(false);
                                }}
                                className={`w-full text-left px-4 py-2 text-sm flex items-center space-x-2 transition-colors duration-200 
                  ${language === lang.code ? 'bg-white/20 text-white' : 'text-gray-200 hover:bg-white/10'}`}
                            >
                                <span className="text-lg">{lang.flag}</span>
                                <span>{lang.name}</span>
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
