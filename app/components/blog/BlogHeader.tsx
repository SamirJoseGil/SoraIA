import { Link } from "@remix-run/react";
import { useLanguage } from "~/i18n/context";

interface BlogHeaderProps {
  title: string;
  subtitle: string;
  showBackLink?: boolean;
  backLinkText?: string;
}

export default function BlogHeader({ 
  title, 
  subtitle, 
  showBackLink = false,
  backLinkText
}: BlogHeaderProps) {
  const { t } = useLanguage();
  
  return (
    <div className="bg-gradient-to-b from-gray-900 to-soraia-light pt-20 pb-4">
      <div className="container mx-auto px-4">
        {showBackLink && (
          <div className="mb-8">
            <Link 
              to="/blog" 
              className="inline-flex items-center text-soraia-dark hover:text-soraia-primary transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              {backLinkText || t('blog.backToList')}
            </Link>
          </div>
        )}
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">{title}</h1>
        <p className="text-lg text-soraia-dark max-w-3xl">{subtitle}</p>
      </div>
    </div>
  );
}
