import { useState, useEffect, useRef, ReactNode } from "react";
import type { MetaFunction } from "@remix-run/node";

import Header from "~/components/Header";
import Footer from "~/components/Footer";
import FloatingWhatsApp from "~/components/FloatingWhatsApp";

import About from "~/pages/About";
import Hero from "~/pages/Hero";
import Services from "~/pages/Services";
import Because from "~/pages/Because";
import Contact from "~/pages/Contact";

export const meta: MetaFunction = () => {
  return [
    { title: "Soraia - Tu página web lista en tiempo récord" },
    { name: "description", content: "En Soraia diseñamos y desarrollamos sitios web, landing pages y marketplaces con rapidez, estrategia y estilo" },
  ];
};

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

export default function Index() {
  const { ref: heroRef, isVisible: heroIsVisible } = useIntersectionObserver({ threshold: 0.1 });
  const { ref: aboutRef, isVisible: aboutIsVisible } = useIntersectionObserver({ threshold: 0.1 });
  const { ref: servicesRef, isVisible: servicesIsVisible } = useIntersectionObserver({ threshold: 0.1 });
  const { ref: whySoraiaRef, isVisible: whySoraiaIsVisible } = useIntersectionObserver({ threshold: 0.1 });
  const { ref: contactRef, isVisible: contactIsVisible } = useIntersectionObserver({ threshold: 0.1 });

  const [activeSection, setActiveSection] = useState('home');

  // Effect to determine active section based on visibility
  useEffect(() => {
    if (contactIsVisible) {
      setActiveSection('contact');
    } else if (whySoraiaIsVisible) {
      setActiveSection('why-soraia');
    } else if (servicesIsVisible) {
      setActiveSection('services');
    } else if (aboutIsVisible) {
      setActiveSection('about');
    } else if (heroIsVisible) {
      setActiveSection('home');
    }
  }, [heroIsVisible, aboutIsVisible, servicesIsVisible, whySoraiaIsVisible, contactIsVisible]);

  // Add animation styles to tailwind styles
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes float {
        0% { transform: translateY(0) translateX(0); }
        50% { transform: translateY(-10px) translateX(5px); }
        100% { transform: translateY(0) translateX(0); }
      }
      @keyframes float-delay {
        0% { transform: translateY(0) translateX(0); }
        50% { transform: translateY(10px) translateX(-5px); }
        100% { transform: translateY(0) translateX(0); }
      }
      @keyframes float-reverse {
        0% { transform: translateY(0) translateX(0) rotate(0deg); }
        50% { transform: translateY(8px) translateX(8px) rotate(5deg); }
        100% { transform: translateY(0) translateX(0) rotate(0deg); }
      }
      @keyframes float-slow {
        0% { transform: translateY(0) translateX(0); }
        50% { transform: translateY(-15px) translateX(-10px); }
        100% { transform: translateY(0) translateX(0); }
      }
      .animate-float {
        animation: float 8s ease-in-out infinite;
      }
      .animate-float-delay {
        animation: float-delay 10s ease-in-out infinite;
      }
      .animate-float-reverse {
        animation: float-reverse 12s ease-in-out infinite;
      }
      .animate-float-slow {
        animation: float-slow 14s ease-in-out infinite;
      }
      @keyframes pulse {
        0%, 100% { opacity: 0.6; transform: scale(1); }
        50% { opacity: 0.3; transform: scale(1.05); }
      }
      
      @keyframes ping {
        75%, 100% {
          transform: scale(2);
          opacity: 0;
        }
      }
      
      .animate-ping {
        animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
      }
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      
      .animate-fade-in {
        animation: fadeIn 0.8s ease-out forwards;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="bg-soraia-light">
      {/* Header */}
      <Header activeSection={activeSection} />

      {/* Hero Section - modern design without card */}
      <Hero />

      {/* About Section */}
      <About />

      {/* Services Section with new card style */}
      <Services />

      {/* Por qué Soraia section with acrylic effect */}
      <Because />

      {/* Contact Section - with transparent background and animations */}
      <Contact />

      {/* WhatsApp flotante */}
      <FloatingWhatsApp />

      {/* Footer */}
      <Footer />
    </div>
  );
}