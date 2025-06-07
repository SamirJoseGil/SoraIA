import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import { formatDate } from "~/utils/blog-utils";
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import FloatingWhatsApp from "~/components/FloatingWhatsApp";
import BlogHeader from "~/components/blog/BlogHeader";
import { useLanguage } from "~/i18n/context";
import type { BlogPost } from "~/types/blog";
import blogData from "~/data/blog.json";
import type { MetaFunction } from "@remix-run/node";
import { isExternalUrl } from "~/utils/image-utils";

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
  const { t } = useLanguage();

  // Determinar la ruta de la imagen (local o externa)
  const imageUrl = isExternalUrl(post.coverImage) 
    ? post.coverImage 
    : post.coverImage.startsWith('/') 
      ? post.coverImage 
      : `/images/blog/${post.coverImage}`;

  return (
    <div className="min-h-screen bg-soraia-light flex flex-col">
      <Header activeSection="blog" />
      
      <main className="flex-grow">
        <BlogHeader 
          title={post.title} 
          subtitle={`${t('blog.author')}: ${post.author} • ${formatDate(post.publishedAt)}`} 
          showBackLink={true} 
          backLinkText={t('blog.backToList')}
        />
        
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            {/* Imagen destacada */}
            <div className="mb-10 rounded-xl overflow-hidden">
              <img 
                src={imageUrl} 
                alt={post.title} 
                className="w-full h-auto object-cover"
                onError={(e) => {
                  // Fallback si la imagen no se carga
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = "/images/blog/default-post.jpg";
                }}
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
            
            {/* Contenido con estilos mejorados para HTML */}
            <div 
              className="prose prose-lg prose-invert max-w-none
                prose-headings:text-soraia-primary prose-headings:font-bold
                prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-6
                prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4
                prose-p:mb-6 prose-p:text-soraia-dark prose-p:leading-relaxed
                prose-a:text-soraia-accent prose-a:no-underline hover:prose-a:underline
                prose-strong:text-white
                prose-ul:my-6 prose-ul:list-disc prose-ul:pl-5
                prose-li:text-soraia-dark prose-li:mb-2
                prose-img:rounded-xl"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
            
            {/* Autor */}
            <div className="mt-12 p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-gray-700/30">
              <h3 className="text-xl font-bold text-white mb-2">{t('blog.author')}</h3>
              <p className="text-soraia-dark">{post.author}</p>
            </div>
            
            {/* Posts relacionados */}
            {relatedPosts.length > 0 && (
              <div className="mt-16">
                <h3 className="text-2xl font-bold text-white mb-6">{t('blog.relatedPosts')}</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedPosts.map(relatedPost => {
                    const relatedImageUrl = isExternalUrl(relatedPost.coverImage) 
                      ? relatedPost.coverImage 
                      : relatedPost.coverImage.startsWith('/') 
                        ? relatedPost.coverImage 
                        : `/images/blog/${relatedPost.coverImage}`;
                        
                    return (
                      <div key={relatedPost.id} className="bg-white/5 backdrop-blur-sm rounded-lg overflow-hidden hover:bg-white/10 transition-all">
                        <Link to={`/blog/${relatedPost.slug}`} className="block">
                          <img 
                            src={relatedImageUrl} 
                            alt={relatedPost.title} 
                            className="w-full h-40 object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.onerror = null;
                              target.src = "/images/blog/default-post.jpg";
                            }}
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
                    );
                  })}
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
