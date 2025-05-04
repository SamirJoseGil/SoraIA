import { useState, useEffect, useRef } from "react";

interface HeaderProps {
  activeSection: string;
}

export default function Header({ activeSection }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [fixed, setFixed] = useState(false);
  // Estado para controlar el menú móvil
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Guardamos una referencia al elemento header 
  const headerRef = useRef<HTMLDivElement>(null);
  // Guardamos la altura para el espacio de reemplazo
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    // Calculamos y guardamos la altura del header
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight);
    }

    let initialPosition = 0;
    let lastScrollPosition = 0;
    let ticking = false;

    // Función para inicializar la posición de referencia
    const initPosition = () => {
      if (headerRef.current) {
        initialPosition = headerRef.current.getBoundingClientRect().top + window.scrollY;
      }
    };

    // Inicializamos la posición después de cargar todo
    window.addEventListener('load', initPosition);

    // También inicializamos inmediatamente por si ya está cargado
    initPosition();

    const handleScroll = () => {
      lastScrollPosition = window.scrollY;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          // Lógica base: transparencia al scrollear un poco
          setScrolled(lastScrollPosition > 50);

          // Lógica de fijación: si pasamos la posición inicial del navbar
          if (lastScrollPosition >= initialPosition) {
            setFixed(true);
          } else {
            setFixed(false);
          }

          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', initPosition);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', initPosition);
      window.removeEventListener('load', initPosition);
    };
  }, []);

  // Cerrar el menú móvil cuando se hace clic en un enlace
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();

    // Cerrar el menú móvil si está abierto
    setMobileMenuOpen(false);

    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      const rect = targetElement.getBoundingClientRect();
      const targetPosition = rect.top + window.pageYOffset;

      // Calculamos el offset basado en la altura del header
      const offsetPosition = fixed ? targetPosition - headerHeight : targetPosition;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Lista de enlaces de navegación
  const navLinks = [
    { id: 'home', label: 'Inicio' },
    { id: 'about', label: 'Qué Hacemos' },
    { id: 'services', label: 'Servicios' },
    { id: 'why-soraia', label: '¿Por qué Soraia?' },
    { id: 'contact', label: 'Contacto' }
  ];

  return (
    <>
      {/* Espacio de reemplazo cuando la navbar está fija - ahora con el color de fondo correcto */}
      {fixed && <div className="bg-soraia-light" style={{ height: `${headerHeight}px` }} />}

      <header
        ref={headerRef}
        className={`w-full z-50 py-2 transition-all duration-300 ${fixed
            ? "fixed top-0 left-0 right-0 flex justify-center bg-transparent"
            : "bg-soraia-light"
          }`}
      >
        <div
          className={`container mx-auto px-4 rounded-full flex items-center justify-between ${scrolled
              ? "bg-gray-800/80 border border-gray-700/50 backdrop-blur-md shadow-lg"
              : "bg-soraia-light/90 backdrop-blur-sm"
            }`}
        >
          <div className="flex items-center">
            <span className="text-2xl md:text-3xl font-bold text-soraia-primary my-3 sm:my-4">
              soraia
            </span>
          </div>

          {/* Navegación para pantallas medianas y grandes */}
          <nav className="hidden md:flex space-x-4 lg:space-x-8 py-2">
            {navLinks.map(item => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)}
                className={`transition-colors relative ${activeSection === item.id
                    ? "text-soraia-primary font-bold after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-soraia-primary"
                    : "text-soraia-dark hover:text-soraia-primary"
                  }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Botón de menú para móviles */}
          <button
            className="md:hidden p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-soraia-primary"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menú de navegación"
          >
            {mobileMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-soraia-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-soraia-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Menú móvil desplegable */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-gray-800/90 shadow-lg rounded-b-lg z-50 transition-all duration-300 transform animate-fade-in backdrop-blur-md border border-gray-700/50">
            <div className="container mx-auto px-4 py-3">
              <nav className="flex flex-col space-y-3">
                {navLinks.map(item => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(e) => handleNavClick(e, item.id)}
                    className={`block py-2 px-4 rounded-md transition-colors ${activeSection === item.id
                        ? "bg-soraia-primary/20 text-soraia-primary font-bold"
                        : "text-soraia-dark hover:bg-soraia-primary/10 hover:text-soraia-primary"
                      }`}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>
          </div>
        )}
      </header>
    </>
  );
}