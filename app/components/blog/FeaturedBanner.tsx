import { Link } from "@remix-run/react";

interface FeaturedBannerProps {
  title: string;
  subtitle: string;
  link: string;
}

export default function FeaturedBanner({ title, subtitle, link }: FeaturedBannerProps) {
  return (
    <Link 
      to={link}
      className="block w-full bg-white text-black mb-8 rounded-xl overflow-hidden transition-transform hover:transform hover:scale-[1.01]"
    >
      <div className="px-6 py-5 text-center">
        <h3 className="text-lg md:text-xl font-medium mb-2">
          {title}
        </h3>
        <p className="text-gray-700 text-sm md:text-base">
          {subtitle}
        </p>
      </div>
    </Link>
  );
}
