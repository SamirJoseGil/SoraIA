import { useState, useEffect } from "react";
import { Link } from "@remix-run/react";
import type { MetaFunction } from "@remix-run/node";
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import FloatingWhatsApp from "~/components/FloatingWhatsApp";
import ServiceCard from "~/components/ServiceCard";
import { useLanguage } from "~/i18n/context";

export const meta: MetaFunction = () => {
    return [
        { title: "Servicios y Precios | Soraia" },
        { name: "description", content: "Conoce nuestros servicios de desarrollo web, landing pages y marketplaces con precios transparentes y adaptados a tus necesidades" },
    ];
};

export default function ServiciosPage() {
    const { t } = useLanguage();

    // Add animation styles
    useEffect(() => {
        const style = document.createElement('style');
        style.textContent = `
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
      
      .animate-fade-in {
        animation: fadeIn 0.8s ease-out forwards;
      }
      
      @keyframes buttonGlow {
        0% { box-shadow: 0 0 5px rgba(255, 255, 255, 0.5); }
        50% { box-shadow: 0 0 15px rgba(255, 255, 255, 0.8); }
        100% { box-shadow: 0 0 5px rgba(255, 255, 255, 0.5); }
      }
      
      .animate-button-glow {
        animation: buttonGlow 2s ease-in-out infinite;
      }
    `;
        document.head.appendChild(style);

        return () => {
            document.head.removeChild(style);
        };
    }, []);

    return (
        <div className="landing-gradient-bg min-h-screen">
            {/* Header */}
            <Header activeSection="servicios" />

            <main className="pt-20 pb-16">
                {/* Back button */}
                <div className="container mx-auto px-4 mb-8">
                    <Link to="/#services" className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-md rounded-lg text-white hover:bg-white/20 transition-all animate-button-glow">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                        </svg>
                        {t('common.back')}
                    </Link>
                </div>

                {/* Services Header */}
                <div className="container mx-auto px-4 mb-16">
                    <h1 className="section-title">
                        {t('servicesPage.title')}
                    </h1>
                    <p className="text-lg text-center text-gray-300 max-w-3xl mx-auto">
                        {t('servicesPage.subtitle')}
                    </p>
                </div>

                {/* Services Cards with Pricing */}
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Plan Básico */}
                        <ServiceCard
                            title={t('services.basic.name')}
                            description={t('services.basic.description')}
                            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>}
                            iconColor="#3b82f6"
                            delay={100}
                            planType="basic"
                            priceRange={t('services.basic.priceRange')}
                            features={[
                                "Diseño personalizado y responsive",
                                "Hasta 5 páginas (Inicio, Nosotros, Servicios, Galería, Contacto)",
                                "Formulario de contacto",
                                "Optimización SEO básica",
                                "Integración básica con redes sociales",
                                "Entrega en 2 semanas"
                            ]}
                        />

                        {/* Plan Intermedio */}
                        <ServiceCard
                            title={t('services.intermediate.name')}
                            description={t('services.intermediate.description')}
                            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                            </svg>}
                            iconColor="#8b5cf6"
                            delay={200}
                            planType="intermediate"
                            priceRange={t('services.intermediate.priceRange')}
                            features={[
                                "Todas las características del Plan Básico",
                                "E-commerce completo con gestión de productos",
                                "Sistema de reservas online",
                                "Menús dinámicos para restaurantes",
                                "Panel de administración de contenido",
                                "Landing pages para campañas",
                                "Entrega en 4 semanas"
                            ]}
                        />

                        {/* Plan Pro */}
                        <ServiceCard
                            title={t('services.pro.name')}
                            description={t('services.pro.description')}
                            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>}
                            iconColor="#f59e0b"
                            delay={300}
                            planType="pro"
                            priceRange={t('services.pro.priceRange')}
                            features={[
                                "Todas las características del Plan Intermedio",
                                "App web personalizada",
                                "Integración avanzada con redes sociales",
                                "Dashboard analítico personalizado",
                                "Sistema de membresías y suscripciones",
                                "Funcionalidades a medida según necesidades",
                                "Soporte prioritario",
                                "Entrega en 8 semanas"
                            ]}
                            showContactButton={true}
                        />
                    </div>
                </div>

                {/* Additional services section */}
                <div className="container mx-auto px-4 mt-16">
                    <h2 className="section-title">
                        {t('services.additional.title')}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl animate-fade-in" style={{ animationDelay: '0.4s' }}>
                            <h3 className="text-xl font-bold text-white mb-4">{t('services.additional.maintenance.title')}</h3>
                            <p className="text-gray-300 mb-4">{t('services.additional.maintenance.description')}</p>
                            <div className="p-4 bg-white/5 rounded-lg mb-4">
                                <p className="text-sm text-gray-300 mb-2">Desde</p>
                                <p className="text-2xl font-bold text-white">{t('services.additional.maintenance.price')}</p>
                            </div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl animate-fade-in" style={{ animationDelay: '0.5s' }}>
                            <h3 className="text-xl font-bold text-white mb-4">{t('services.additional.seo.title')}</h3>
                            <p className="text-gray-300 mb-4">{t('services.additional.seo.description')}</p>
                            <div className="p-4 bg-white/5 rounded-lg mb-4">
                                <p className="text-sm text-gray-300 mb-2">Desde</p>
                                <p className="text-2xl font-bold text-white">{t('services.additional.seo.price')}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* WhatsApp flotante */}
            <FloatingWhatsApp />

            {/* Footer */}
            <Footer />
        </div>
    );
}
