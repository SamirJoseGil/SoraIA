import { Link } from "@remix-run/react";
import { useState } from "react";
import { useLanguage } from "~/i18n/context";

interface FeaturedBannerProps {
  link: string;
}

export default function FeaturedBanner({ link }: FeaturedBannerProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { t } = useLanguage();
  
  return (
    <Link 
      to={link}
      className="block w-full mb-10 overflow-hidden rounded-xl relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Fondo con gradiente y efecto de movimiento */}
      <div className={`absolute inset-0 bg-gradient-to-r from-indigo-800 via-indigo-600 to-purple-600 transition-transform duration-3000 ease-in-out ${isHovered ? 'scale-110' : 'scale-100'}`}></div>
      
      {/* Overlay con patrón */}
      <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzRjMC0yLjIwOS0xLjc5MS00LTQtNHMtNCAxLjc5MS00IDQgMS43OTEgNCA0IDQgNC0xLjc5MSA0LTRtMC0xMHYtOGgtNDBoNDBWMzAiLz48L2c+PC9nPjwvc3ZnPg==')]"></div>
      
      {/* Contenido con efecto de brillo */}
      <div className="relative px-8 py-10 bg-white/10 backdrop-blur-sm flex flex-col md:flex-row items-center gap-6 overflow-hidden">
        {/* Ícono circular con animación */}
        <div className={`flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-full bg-white flex items-center justify-center shadow-lg relative z-10 transition-all duration-500 ${isHovered ? 'scale-110 rotate-12' : ''}`}>
          <span className="text-3xl md:text-4xl transform transition-transform">👨‍💻</span>
          
          {/* Halo de brillo animado */}
          <div className={`absolute inset-0 rounded-full bg-white blur-md -z-10 transition-opacity duration-500 ${isHovered ? 'animate-pulse opacity-80' : 'opacity-0'}`}></div>
        </div>
        
        <div className="flex-grow text-center md:text-left">
          {/* Título con efecto de resaltado */}
          <h3 className="text-xl md:text-2xl font-bold mb-2 text-white">
            {t('blog.featuredPost.title')}
          </h3>
          
          {/* Subtítulo con animación de aparición */}
          <p className="text-white/80 text-sm md:text-base italic relative overflow-hidden">
            "{t('blog.featuredPost.subtitle')}"
          </p>
        </div>
        
        {/* Botón "Leer más" */}
        <div className={`flex-shrink-0 transition-all duration-500 ${isHovered ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0 md:translate-x-0 md:opacity-100'}`}>
          <span className="inline-flex items-center gap-1 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm transition-all">
            {t('common.readMore')}
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </span>
        </div>
      </div>
      
      {/* Efectos de brillo en hover */}
      <div className={`absolute inset-0 bg-gradient-to-tr from-white/0 via-white/30 to-white/0 transition-opacity duration-700 ${isHovered ? 'opacity-20' : 'opacity-0'}`} style={{ transform: 'translateX(-100%) skewX(-20deg)' }}></div>
      <div className={`absolute inset-0 bg-gradient-to-tr from-white/0 via-white/30 to-white/0 transition-all duration-1000 ${isHovered ? 'opacity-20 translate-x-full' : 'opacity-0 -translate-x-full'}`} style={{ transform: isHovered ? 'translateX(100%) skewX(-20deg)' : 'translateX(-100%) skewX(-20deg)' }}></div>
    </Link>
  );
}
