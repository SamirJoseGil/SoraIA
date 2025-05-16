import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData
} from "@remix-run/react";
import type { LinksFunction, LoaderFunction } from "@remix-run/node";
import { json } from '@remix-run/node';
import { LanguageProvider } from '~/i18n/context';
import { detectBrowserLanguage, DEFAULT_LANGUAGE } from '~/i18n/config';

import "./tailwind.css";

import esTranslations from '~/i18n/translations/es.json';
import enTranslations from '~/i18n/translations/en.json';

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
  // Animate.css for animations
  {
    rel: "stylesheet",
    href: "https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css",
  },
];

// Función para extraer el idioma de la URL o usar el idioma por defecto
function getLanguageFromRequest(request: Request): string {
  const url = new URL(request.url);
  const pathname = url.pathname;

  // Extraer el código de idioma si está presente como primer segmento de la URL
  const langCode = pathname.split('/')[1];

  // Verificar si es un código de idioma válido
  if (['es', 'en'].includes(langCode)) {
    return langCode;
  }

  // Si no está en la URL, intentar obtenerlo de las cookies
  const cookies = request.headers.get('Cookie') || '';
  const cookieMatch = cookies.match(/(?:^|;\s*)language=([^;]*)/);
  if (cookieMatch) {
    return cookieMatch[1];
  }

  // Si no hay cookie, usar el idioma por defecto
  return DEFAULT_LANGUAGE;
}

// Loader para obtener el idioma en el servidor
export const loader: LoaderFunction = async ({ request }) => {
  const language = getLanguageFromRequest(request);

  // Traducciones iniciales
  const initialTranslations = {
    es: esTranslations,
    en: enTranslations
  };

  return json({ language, initialTranslations });
};

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="font-sans">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const { language, initialTranslations } = useLoaderData<{
    language: string;
    initialTranslations: Record<string, any>;
  }>();

  return (
    <LanguageProvider initialLanguage={language} initialTranslations={initialTranslations}>
      <Outlet />
    </LanguageProvider>
  );
}
