import { Link } from "@remix-run/react";

interface BlogHeaderProps {
  title?: string;
  subtitle?: string;
  showBackLink?: boolean;
}

export default function BlogHeader({ 
  title = "Blog de Soraia",
  subtitle = "Recursos, guías y tendencias sobre diseño web, marketing digital y estrategias para tu negocio online.",
  showBackLink = false
}: BlogHeaderProps) {
  return (
    <div className="py-12 md:py-20 relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-soraia-primary/20 to-transparent opacity-30"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {showBackLink && (
          <Link 
            to="/blog" 
            className="inline-flex items-center mb-8 text-soraia-dark hover:text-soraia-primary transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Volver al blog
          </Link>
        )}
        
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{title}</h1>
        <p className="text-lg text-soraia-dark max-w-3xl">{subtitle}</p>
      </div>
    </div>
  );
}
