import { ReactNode, useEffect, useRef, useState, cloneElement, isValidElement } from "react";
import { Link } from "@remix-run/react";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  delay?: number;
  iconColor?: string;
  planType?: "basic" | "intermediate" | "pro";
  priceRange?: string;
  features?: string[];
  showContactButton?: boolean;
}

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

export default function ServiceCard({
  title,
  description,
  icon,
  delay = 0,
  iconColor = "#3a75b0",
  planType,
  priceRange,
  features = [],
  showContactButton = false
}: ServiceCardProps) {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.1 });
  const [hovered, setHovered] = useState(false);

  // Process the icon to add color
  const coloredIcon = isValidElement(icon)
    ? cloneElement(icon as React.ReactElement<any>, { stroke: iconColor })
    : icon;

  // Define plan badge colors
  const planBadgeColors = {
    basic: "from-blue-400 to-cyan-300",
    intermediate: "from-purple-400 to-pink-400",
    pro: "from-yellow-400 to-orange-500"
  };

  // Define plan titles
  const planTitles = {
    basic: "Plan Básico",
    intermediate: "Plan Intermedio",
    pro: "Plan Pro"
  };

  return (
    <div
      ref={ref}
      className={`relative bg-[#101010]/30 backdrop-blur-md rounded-xl shadow-lg p-6 w-full transition-all duration-500 overflow-hidden 
        hover:shadow-xl hover:shadow-${iconColor}/20 hover:scale-105 hover:bg-[#101010]/50 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}
      style={{ transitionDelay: `${delay}ms` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Background floating circles */}
      <div
        className="absolute -right-10 -bottom-10 w-40 h-40 rounded-full blur-2xl opacity-60"
        style={{ background: `radial-gradient(circle, ${iconColor}30, transparent 70%)` }}
      ></div>
      <div
        className="absolute -left-8 -top-8 w-32 h-32 rounded-full blur-xl opacity-60"
        style={{ background: `radial-gradient(circle, ${iconColor}25, transparent 70%)` }}
      ></div>

      {/* Hover border effect */}
      <div className={`absolute inset-0 rounded-xl transition-opacity duration-300 opacity-0 ${hovered ? 'opacity-100' : ''}`}>
        <div className="absolute inset-0 rounded-xl border-2 border-opacity-30" style={{ borderColor: iconColor }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 transition-all duration-300 flex flex-col items-center text-center">
        {/* Plan badge if plan type is provided */}
        {planType && (
          <div className={`absolute -top-1 -right-1 px-3 py-1 rounded-bl-lg rounded-tr-xl bg-gradient-to-r ${planBadgeColors[planType]} text-xs font-bold text-black`}>
            {planTitles[planType]}
          </div>
        )}

        {/* Centered icon with circle background */}
        <div
          className="flex items-center justify-center w-16 h-16 mb-4 rounded-full transition-transform duration-300"
          style={{
            background: `radial-gradient(circle, ${iconColor}20, transparent 80%)`,
            transform: hovered ? 'scale(1.1)' : 'scale(1)'
          }}
        >
          <div className="text-4xl" style={{ color: iconColor }}>
            {coloredIcon}
          </div>
        </div>

        <h3
          className="text-xl font-semibold mb-2 transition-colors duration-300"
          style={{ color: 'white' }}
        >
          {title}
        </h3>
        <p className="text-gray-400 mb-4">{description}</p>

        {/* Price range if provided */}
        {priceRange && (
          <div className="mb-4 p-3 bg-black/30 rounded-lg w-full">
            <p className="text-sm text-gray-300 mb-1">Precio estimado:</p>
            <p className="text-xl font-bold text-white">{priceRange}</p>
          </div>
        )}

        {/* Features list if provided */}
        {features.length > 0 && (
          <ul className="text-left w-full mb-4 space-y-2">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <svg className="h-5 w-5 mr-2 text-green-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-300 text-sm">{feature}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Contact button for Pro plan */}
        {showContactButton && (
          <Link
            to="/#contact"
            className="mt-2 w-full px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-medium rounded-lg hover:from-yellow-500 hover:to-orange-600 transition-colors duration-300"
          >
            Contáctanos para más detalles
          </Link>
        )}

        {/* Maintenance notice */}
        {planType && (
          <div className="mt-4 text-xs text-gray-400 bg-black/20 p-2 rounded-lg w-full">
            {planType === "pro" ? (
              <p>Incluye mantenimiento y gestión sin costo adicional</p>
            ) : (
              <p>Opción de mantenimiento y gestión: $120 adicionales/mes</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}