import { Link } from "@remix-run/react";
import { formatDate } from "~/utils/blog-utils";
import { useLanguage } from "~/i18n/context";
import { isExternalUrl } from "~/utils/image-utils";
import type { BlogPost } from "~/types/blog";

interface BlogPostCardProps {
  post: BlogPost;
}

export default function BlogPostCard({ post }: BlogPostCardProps) {
  const { t } = useLanguage();
  
  // Determinar la ruta de la imagen (local o externa)
  const imageUrl = isExternalUrl(post.coverImage) 
    ? post.coverImage 
    : post.coverImage.startsWith('/') 
      ? post.coverImage 
      : `/images/blog/${post.coverImage}`;

  return (
    <Link to={`/blog/${post.slug}`} className="group">
      <div className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden transition-all duration-300 hover:bg-white/10 hover:transform hover:scale-[1.01] hover:shadow-lg">
        <div className="h-48 overflow-hidden">
          <img 
            src={imageUrl} 
            alt={post.title} 
            className="w-full h-full object-cover transition-all duration-500 group-hover:transform group-hover:scale-105"
            onError={(e) => {
              // Fallback si la imagen no se carga
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src = "/images/blog/default-post.jpg";
            }}
          />
        </div>
        <div className="p-5">
          <div className="flex items-center mb-3">
            <span className="px-2 py-1 text-xs font-semibold rounded-full bg-soraia-primary/20 text-soraia-primary mr-4">
              {post.category}
            </span>
            <span className="text-soraia-dark text-xs ml-3">
              {formatDate(post.publishedAt)}
            </span>
          </div>
          <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2 group-hover:text-soraia-primary transition-colors">
            {post.title}
          </h3>
          <p className="text-soraia-dark text-sm line-clamp-3">
            {post.summary}
          </p>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-xs text-soraia-dark">{post.author}</span>
            <span className="text-soraia-primary text-sm font-medium group-hover:underline">
              {t('blog.readMore')}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
