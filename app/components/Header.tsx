import { useState, useEffect, useRef } from "react";

interface HeaderProps {
  activeSection: string;
}

export default function Header({ activeSection }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [fixed, setFixed] = useState(false);
  
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

  // Manejador para los clics de navegación
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
      // Restamos la altura del header cuando está fijo para una correcta posición
      const offsetPosition = fixed ? targetPosition - headerHeight : targetPosition;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      {/* Espacio de reemplazo cuando la navbar está fija */}
      {fixed && <div style={{ height: `${headerHeight}px` }} />}
      
      <header 
        ref={headerRef}
        className={`w-full z-50 py-2 transition-all duration-300 bg-white ${
          fixed 
            ? "fixed top-0 left-0 right-0 flex justify-center" 
            : ""
        }`}
      >
        <div 
          className={`max-w-5xl mx-auto px-6 rounded-full flex items-center justify-between ${
            scrolled 
              ? "bg-white border border-slate-400 "
              : "bg-soraia-light"
          }`}
        >
          <div className="flex items-center">
            <img 
              src="/SoraiaLogo.svg" 
              alt="Soraia Logo" 
              className="h-24 mr-6"
            />
          </div>
          
          <nav className="flex space-x-8 py-2">
            {[
              { id: 'home', label: 'Inicio' },
              { id: 'about', label: 'Quiénes Somos' },
              { id: 'services', label: 'Servicios' },
              { id: 'contact', label: 'Contacto' }
            ].map(item => (
              <a 
                key={item.id}
                href={`#${item.id}`} 
                onClick={(e) => handleNavClick(e, item.id)}
                className={`transition-colors relative ${
                  activeSection === item.id
                    ? "text-soraia-primary font-bold after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-soraia-primary"
                    : "text-soraia-dark hover:text-soraia-primary"
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </header>
    </>
  );
}