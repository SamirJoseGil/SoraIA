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

  return (
    <div className="landing-gradient-bg">
      {/* Header */}
      <Header activeSection={activeSection} />

      {/* Hero Section */}
      <Hero />

      {/* About Section */}
      <About />

      {/* Services Section */}
      <Services />

      {/* Por qué Soraia section */}
      <Because />

      {/* Contact Section */}
      <Contact />

      {/* WhatsApp flotante */}
      <FloatingWhatsApp />

      {/* Footer */}
      <Footer />
    </div>
  );
}