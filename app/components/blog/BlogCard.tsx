import { Link } from "@remix-run/react";
import type { BlogPost } from "~/types/blog";
import { formatDate } from "~/utils/blog-utils";

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="group bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden hover:bg-white/10 transition-all duration-300 hover:shadow-lg hover:shadow-soraia-primary/10 h-full flex flex-col">
      <Link to={`/blog/${post.slug}`} className="block relative overflow-hidden aspect-[16/9]">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
        <img 
          src={post.coverImage} 
          alt={post.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute bottom-4 left-4 z-20">
          <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-soraia-primary text-soraia-light">
            {post.category}
          </span>
        </div>
      </Link>
      
      <div className="p-6 flex flex-col flex-grow">
        <span className="text-xs text-soraia-dark mb-2">{formatDate(post.publishedAt)}</span>
        
        <Link to={`/blog/${post.slug}`} className="block">
          <h3 className="text-xl font-bold mb-3 text-white group-hover:text-soraia-primary transition-colors duration-300">
            {post.title}
          </h3>
        </Link>
        
        <p className="text-soraia-dark text-sm mb-4 flex-grow">{post.summary}</p>
        
        <div className="flex items-center justify-between mt-auto">
          <span className="text-xs text-soraia-dark/80">{post.author}</span>
          <Link 
            to={`/blog/${post.slug}`}
            className="inline-flex items-center text-sm text-soraia-primary hover:text-soraia-accent transition-colors"
          >
            Leer más
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
}
