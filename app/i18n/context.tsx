import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { DEFAULT_LANGUAGE, LANGUAGES, detectBrowserLanguage, getLanguageByCode } from './config';

// Tipo para nuestras traducciones
type Translations = Record<string, any>;

// Interfaz del contexto
interface LanguageContextType {
    language: string;
    setLanguage: (lang: string) => void;
    t: (key: string, defaultValue?: string) => string;
    translations: Translations;
}

// Valores por defecto del contexto
const defaultContext: LanguageContextType = {
    language: DEFAULT_LANGUAGE,
    setLanguage: () => { },
    t: (key: string, defaultValue?: string) => defaultValue || key,
    translations: {},
};

// Crear el contexto
const LanguageContext = createContext<LanguageContextType>(defaultContext);

// Hook personalizado para usar el contexto en cualquier componente
export const useLanguage = () => useContext(LanguageContext);

// Propiedades del componente proveedor
interface LanguageProviderProps {
    children: ReactNode;
    initialLanguage?: string;
    initialTranslations?: Record<string, Translations>;
}

export function LanguageProvider({
    children,
    initialLanguage,
    initialTranslations = {}
}: LanguageProviderProps) {
    // Estado para el idioma actual
    const [language, setLanguageState] = useState(initialLanguage || DEFAULT_LANGUAGE);
    // Estado para las traducciones
    const [translations, setTranslations] = useState<Record<string, Translations>>(initialTranslations);

    // Función para cambiar el idioma
    const setLanguage = async (newLanguage: string) => {
        if (LANGUAGES.some(lang => lang.code === newLanguage)) {
            // Guardar la preferencia en localStorage
            if (typeof window !== 'undefined') {
                localStorage.setItem('language', newLanguage);
            }

            // Cargar traducciones si no están ya cargadas
            if (!translations[newLanguage]) {
                try {
                    // En entorno de producción, usamos dynamic import
                    const langModule = await import(`./translations/${newLanguage}.json`);
                    setTranslations(prev => ({ ...prev, [newLanguage]: langModule.default }));
                } catch (error) {
                    console.error(`Error loading translations for ${newLanguage}:`, error);
                }
            }

            setLanguageState(newLanguage);
        }
    };

    // Función para obtener una traducción por su clave
    const t = (key: string, defaultValue?: string): string => {
        const keys = key.split('.');
        let result = translations[language] || {};

        // Navegar por el objeto de traducciones siguiendo la ruta de puntos
        for (const k of keys) {
            result = result?.[k];
            if (result === undefined) break;
        }

        // Si no se encuentra la traducción, intentar con el idioma por defecto
        if (result === undefined && language !== DEFAULT_LANGUAGE) {
            let defaultResult = translations[DEFAULT_LANGUAGE] || {};
            for (const k of keys) {
                defaultResult = defaultResult?.[k];
                if (defaultResult === undefined) break;
            }
            result = defaultResult;
        }

        return result !== undefined ? String(result) : defaultValue || key;
    };

    // Efecto para cargar el idioma del navegador o localStorage en el cliente
    useEffect(() => {
        // Solo ejecutar en el cliente
        if (typeof window === 'undefined') return;

        const storedLanguage = localStorage.getItem('language');
        const detectedLanguage = detectBrowserLanguage();
        const langToUse = storedLanguage || initialLanguage || detectedLanguage;

        if (langToUse !== language) {
            setLanguage(langToUse);
        }
    }, [initialLanguage, language]);

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t, translations }}>
            {children}
        </LanguageContext.Provider>
    );
}
