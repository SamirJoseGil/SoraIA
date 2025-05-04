import { ReactNode, useEffect, useRef, useState, cloneElement, isValidElement } from "react";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  delay?: number;
  iconColor?: string;
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

export default function ServiceCard({ title, description, icon, delay = 0, iconColor = "#3a75b0" }: ServiceCardProps) {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.1 });
  const [hovered, setHovered] = useState(false);

  // Process the icon to add color
  const coloredIcon = isValidElement(icon)
    ? cloneElement(icon as React.ReactElement<any>, { stroke: iconColor })
    : icon;

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
        <a
          href="#contact"
          className="inline-flex items-center hover:translate-x-1 transition-transform duration-300 mt-auto"
          style={{ color: iconColor }}
        >
          Más información
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke={iconColor} strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </div>
  );
}