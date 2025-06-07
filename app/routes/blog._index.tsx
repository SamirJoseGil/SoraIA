import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import FloatingWhatsApp from "~/components/FloatingWhatsApp";
import BlogHeader from "~/components/blog/BlogHeader";
import BlogPostCard from "~/components/blog/BlogPostCard";
import FeaturedBanner from "~/components/blog/FeaturedBanner";
import { useLanguage } from "~/i18n/context";
import type { BlogPost } from "~/types/blog";
import blogData from "~/data/blog.json";
import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Blog | Soraia" },
    { name: "description", content: "Artículos, guías y recursos sobre desarrollo web, diseño y tecnología" },
  ];
};

export async function loader() {
  // Convertir el JSON importado al tipo BlogPost[]
  const posts = blogData as BlogPost[];
  
  // Obtener categorías únicas
  const categories = Array.from(new Set(posts.map(post => post.category)));
  
  return json({ posts, categories });
}

export default function BlogIndex() {
  const { posts, categories } = useLoaderData<typeof loader>();
  const { t } = useLanguage();
  
  // Encuentra el artículo destacado por su slug
  const featuredPost = posts.find(post => post.slug === "desarrollo-web-personalizado-2025");

  return (
    <div className="min-h-screen bg-soraia-light flex flex-col">
      <Header activeSection="blog" />
      
      <main className="flex-grow">
        <BlogHeader 
          title={t('blog.title')} 
          subtitle={t('blog.subtitle')} 
        />
        
        <div className="container mx-auto px-4 py-12">
          {/* Banner destacado */}
          {featuredPost && (
            <FeaturedBanner
              link={`/blog/${featuredPost.slug}`}
            />
          )}
          
          {/* Filtros de categoría */}
          <div className="mb-10 flex flex-wrap gap-2">
            <button className="px-4 py-2 rounded-full bg-soraia-primary text-white text-sm font-medium">
              {t('blog.categories.all')}
            </button>
            
            {categories.map(category => (
              <button 
                key={category} 
                className="px-4 py-2 rounded-full bg-white/10 text-soraia-dark hover:bg-white/20 transition-colors text-sm font-medium"
              >
                {category}
              </button>
            ))}
          </div>
          
          {/* Grid de artículos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map(post => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </main>
      
      <FloatingWhatsApp />
      <Footer />
    </div>
  );
}
