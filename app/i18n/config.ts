export type Language = {
    code: string;
    name: string;
    flag: string;
    rtl?: boolean;
};

export const LANGUAGES: Language[] = [
    {
        code: 'es',
        name: 'Español',
        flag: '🇪🇸',
    },
    {
        code: 'en',
        name: 'English',
        flag: '🇺🇸',
    },
    // Se pueden agregar más idiomas aquí en el futuro
];

export const DEFAULT_LANGUAGE = 'es';

// Función para detectar el idioma del navegador
export function detectBrowserLanguage(): string {
    if (typeof window === 'undefined') return DEFAULT_LANGUAGE;

    const browserLang = navigator.language.split('-')[0];
    const isSupported = LANGUAGES.some(lang => lang.code === browserLang);

    return isSupported ? browserLang : DEFAULT_LANGUAGE;
}

// Función para obtener un idioma por su código
export function getLanguageByCode(code: string): Language {
    return LANGUAGES.find(lang => lang.code === code) || LANGUAGES.find(lang => lang.code === DEFAULT_LANGUAGE)!;
}
