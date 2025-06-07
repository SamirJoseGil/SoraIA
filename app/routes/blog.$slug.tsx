import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import { formatDate } from "~/utils/blog-utils";
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import FloatingWhatsApp from "~/components/FloatingWhatsApp";
import BlogHeader from "~/components/blog/BlogHeader";
import type { BlogPost } from "~/types/blog";
import blogData from "~/data/blog.json";
import type { MetaFunction } from "@remix-run/node";

// Define el tipo de datos que devuelve el loader
type LoaderData = {
  post: BlogPost;
  relatedPosts: BlogPost[];
};

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  // Si no hay datos o ocurrió un error
  if (!data) {
    return [
      { title: "Artículo no encontrado | Soraia Blog" },
      { name: "description", content: "El artículo que buscas no existe o ha sido movido." }
    ];
  }
  
  return [
    { title: `${data.post.title} | Soraia Blog` },
    { name: "description", content: data.post.summary }
  ];
};

export async function loader({ params }: LoaderFunctionArgs) {
  const slug = params.slug;
  
  // Convertir el JSON importado al tipo BlogPost[]
  const posts = blogData as BlogPost[];
  
  // Buscar el post por slug
  const post = posts.find(post => post.slug === slug);
  
  if (!post) {
    throw new Response("Post not found", { status: 404 });
  }
  
  // Encontrar posts relacionados (misma categoría, excluyendo el actual)
  const relatedPosts = posts
    .filter(p => p.category === post.category && p.id !== post.id)
    .slice(0, 3);
  
  return json({ post, relatedPosts });
}

export default function BlogPost() {
  const { post, relatedPosts } = useLoaderData<typeof loader>();

  return (
    <div className="min-h-screen bg-soraia-light flex flex-col">
      <Header activeSection="blog" />
      
      <main className="flex-grow">
        <BlogHeader 
          title={post.title} 
          subtitle={`Por ${post.author} • ${formatDate(post.publishedAt)}`} 
          showBackLink={true} 
        />
        
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            {/* Imagen destacada */}
            <div className="mb-10 rounded-xl overflow-hidden">
              <img 
                src={post.coverImage} 
                alt={post.title} 
                className="w-full h-auto object-cover"
              />
            </div>
            
            {/* Metadata del post */}
            <div className="flex items-center mb-8">
              <span className="px-3 py-1 text-sm font-semibold rounded-full bg-soraia-primary/20 text-soraia-primary mr-4">
                {post.category}
              </span>
              <span className="text-soraia-dark text-sm">
                {formatDate(post.publishedAt)}
              </span>
            </div>
            
            {/* Contenido */}
            <div 
              className="prose prose-lg prose-invert prose-headings:text-soraia-primary prose-a:text-soraia-accent prose-strong:text-white prose-img:rounded-xl max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
            
            {/* Autor */}
            <div className="mt-12 p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-gray-700/30">
              <h3 className="text-xl font-bold text-white mb-2">Autor</h3>
              <p className="text-soraia-dark">{post.author}</p>
            </div>
            
            {/* Posts relacionados */}
            {relatedPosts.length > 0 && (
              <div className="mt-16">
                <h3 className="text-2xl font-bold text-white mb-6">Artículos relacionados</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedPosts.map(relatedPost => (
                    <div key={relatedPost.id} className="bg-white/5 backdrop-blur-sm rounded-lg overflow-hidden hover:bg-white/10 transition-all">
                      <Link to={`/blog/${relatedPost.slug}`} className="block">
                        <img 
                          src={relatedPost.coverImage} 
                          alt={relatedPost.title} 
                          className="w-full h-40 object-cover"
                        />
                        <div className="p-4">
                          <h4 className="text-white font-medium mb-2 hover:text-soraia-primary transition-colors">
                            {relatedPost.title}
                          </h4>
                          <span className="text-xs text-soraia-dark">
                            {formatDate(relatedPost.publishedAt)}
                          </span>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <FloatingWhatsApp />
      <Footer />
    </div>
  );
}
