import { ReactNode, useEffect, useRef, useState } from "react";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  delay?: number;
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

export default function ServiceCard({ title, description, icon, delay = 0 }: ServiceCardProps) {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden backdrop-blur-md bg-gray-800/60 border border-gray-700/50 rounded-xl shadow-xl p-6 transition-all duration-500 hover:shadow-2xl hover:scale-105 text-soraia-dark group ${isVisible ? 'animate-slide-up opacity-100' : 'opacity-0'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Background glow effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-soraia-primary/30 via-transparent to-soraia-accent/30 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>

      {/* Animated light effect */}
      <div className="absolute inset-0 rounded-xl overflow-hidden">
        <div className="absolute top-0 left-[-100%] h-full w-[50%] bg-gradient-to-r from-transparent via-white/10 to-transparent transform rotate-30 animate-light-sweep pointer-events-none"></div>
      </div>

      {/* Content with relative position to appear above the glow */}
      <div className="relative">
        <div className="text-soraia-primary mb-4 inline-block transform transition-all group-hover:scale-110 group-hover:text-soraia-accent">{icon}</div>
        <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
        <p className="text-soraia-dark mb-6">{description}</p>
        <a href="#" className="inline-block px-6 py-2 bg-soraia-primary/80 backdrop-blur-sm text-white rounded-lg hover:bg-soraia-secondary hover:shadow-lg transition-all transform hover:scale-105">
          Saber más
        </a>
      </div>
    </div>
  );
}