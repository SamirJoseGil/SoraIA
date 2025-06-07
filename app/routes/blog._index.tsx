import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, useSearchParams } from "@remix-run/react";
import { useState, useEffect } from "react";
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import FloatingWhatsApp from "~/components/FloatingWhatsApp";
import BlogHeader from "~/components/blog/BlogHeader";
import BlogCard from "~/components/blog/BlogCard";
import CategoryList from "~/components/blog/CategoryList";
import SearchBar from "~/components/blog/SearchBar";
import { extractCategories, filterPosts, sortPostsByDate } from "~/utils/blog-utils";
import type { BlogPost } from "~/types/blog";
import blogData from "~/data/blog.json";
import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Blog | Soraia" },
    { name: "description", content: "Recursos, guías y tendencias sobre diseño web, marketing digital y estrategias para tu negocio online." },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const category = url.searchParams.get("category");
  const searchTerm = url.searchParams.get("search");

  // Convertir el JSON importado al tipo BlogPost[]
  const posts = blogData as BlogPost[];
  
  // Extraer categorías únicas para los filtros
  const categories = extractCategories(posts);
  
  // Filtrar y ordenar los posts
  const filteredPosts = filterPosts(posts, category, searchTerm);
  const sortedPosts = sortPostsByDate(filteredPosts);

  return json({
    posts: sortedPosts,
    categories,
    initialCategory: category,
    initialSearchTerm: searchTerm
  });
}

export default function BlogIndex() {
  const { posts, categories, initialCategory, initialSearchTerm } = useLoaderData<typeof loader>();
  const [searchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState<string | null>(initialCategory);
  const [searchTerm, setSearchTerm] = useState<string | null>(initialSearchTerm);
  
  // Actualizar estados cuando cambian los parámetros de búsqueda
  useEffect(() => {
    setActiveCategory(searchParams.get("category"));
    setSearchTerm(searchParams.get("search"));
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-soraia-light flex flex-col">
      <Header activeSection="blog" />
      
      <main className="flex-grow">
        <BlogHeader />
        
        <div className="container mx-auto px-4 py-12">
          {/* Búsqueda y filtros */}
          <div className="mb-12">
            <SearchBar searchTerm={searchTerm} />
            <CategoryList categories={categories} activeCategory={activeCategory} />
          </div>
          
          {/* Lista de posts */}
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map(post => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-2xl font-semibold text-white mb-4">No se encontraron artículos</h3>
              <p className="text-soraia-dark mb-8">Intenta con otros términos de búsqueda o categorías</p>
              <a 
                href="/blog" 
                className="inline-block px-6 py-3 bg-soraia-primary text-white rounded-lg hover:bg-soraia-primary/80 transition-colors"
              >
                Ver todos los artículos
              </a>
            </div>
          )}
        </div>
      </main>
      
      <FloatingWhatsApp />
      <Footer />
    </div>
  );
}
