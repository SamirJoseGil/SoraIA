import { useRef } from "react";
import { useLanguage } from "~/i18n/context";

export default function Footer() {
  const { t } = useLanguage();

  // Función para manejar clics en enlaces con navegación suave
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      // Obtenemos la posición del elemento
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;

      // Obtenemos la altura del header si está fijo
      const header = document.querySelector('header') as HTMLElement;
      const headerHeight = header?.offsetHeight || 0;

      // Calculamos la posición correcta y ajustamos por el header
      const offsetPosition = targetPosition - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-transparent py-12">
      {/* Círculos de fondo con tonalidades más oscuras */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="circle-lg absolute top-3/4 left-1/5 w-80 h-80 rounded-full bg-indigo-900/40 animate-float-slow blur-3xl"></div>
        <div className="circle-md absolute bottom-1/3 right-1/4 w-64 h-64 rounded-full bg-gray-900/30 animate-float blur-3xl"></div>
        <div className="circle-sm absolute top-1/2 left-1/2 w-48 h-48 rounded-full bg-indigo-950/35 animate-float-reverse blur-2xl"></div>
      </div>

      <div className="container relative mx-auto px-4 z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Columna 1: Logo e información */}
          <div>
            <div className="mb-4">
              <img 
                src="images/LogoSoraia.png" 
                alt="Soraia" 
                className="h-24 w-auto"
              />
            </div>
            <p className="text-soraia-dark/90">Transformamos ideas en software real.</p>
            <div className="mt-4 flex space-x-4">
              <a
                href="https://www.instagram.com/soraia.web?igsh=dzNuMGtqY2Z6ZWxz"
                target="_blank"
                rel="noopener noreferrer"
                className="text-soraia-primary hover:text-soraia-accent transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/soraya-andrea-ben-jaafar-2568a1233/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-soraia-primary hover:text-soraia-accent transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Columna 2: Enlaces rápidos */}
          <div>
            <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-pink-600 text-transparent bg-clip-text">{t('footer.navigation')}</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#home"
                  onClick={(e) => handleNavClick(e, 'home')}
                  className="text-soraia-dark/80 hover:text-soraia-accent transition-colors"
                >
                  {t('navbar.home')}
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  onClick={(e) => handleNavClick(e, 'about')}
                  className="text-soraia-dark/80 hover:text-soraia-accent transition-colors"
                >
                  {t('navbar.about')}
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  onClick={(e) => handleNavClick(e, 'services')}
                  className="text-soraia-dark/80 hover:text-soraia-accent transition-colors"
                >
                  {t('navbar.services')}
                </a>
              </li>
              <li>
                <a
                  href="#why-soraia"
                  onClick={(e) => handleNavClick(e, 'why-soraia')}
                  className="text-soraia-dark/80 hover:text-soraia-accent transition-colors"
                >
                  {t('navbar.whySoraia')}
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, 'contact')}
                  className="text-soraia-dark/80 hover:text-soraia-accent transition-colors"
                >
                  {t('navbar.contact')}
                </a>
              </li>
            </ul>
          </div>

          {/* Nueva columna 3: Información de contacto */}
          <div>
            <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-pink-600 text-transparent bg-clip-text">{t('footer.contact')}</h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-soraia-accent mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-soraia-dark/90">info@soraia.com</span>
              </div>

              <div className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-soraia-accent mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-soraia-dark/90">+57 321 740 7700</span>
              </div>

              <div className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-soraia-accent mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 010-5.656l4-4a4 4 0 015.656 5.656l-1.1 1.1" />
                </svg>
                <a
                  href="https://www.instagram.com/soraia.web?igsh=dzNuMGtqY2Z6ZWxz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-soraia-dark/90 hover:text-soraia-accent transition-colors"
                >
                  @soraia.web
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700/50 mt-8 pt-8 text-center">
          <p className="text-soraia-dark/70">&copy; {currentYear} Soraia. {t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  );
}