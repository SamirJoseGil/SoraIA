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
        className={`card ${isVisible ? 'animate-slide-up opacity-100' : 'opacity-0'}`}
        style={{ transitionDelay: `${delay}ms` }}
      >
        <div className="text-soraia-primary mb-4 inline-block">{icon}</div>
        <h3 className="text-xl font-bold mb-3 text-soraia-dark">{title}</h3>
        <p className="text-soraia-dark mb-6">{description}</p>
        <a href="#" className="inline-block px-6 py-2 bg-soraia-primary text-white rounded-lg hover:bg-soraia-secondary hover:shadow-lg transition-all transform hover:scale-105">
          Saber más
        </a>
      </div>
    );
  }