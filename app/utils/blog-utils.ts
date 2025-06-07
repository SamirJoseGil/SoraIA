import type { BlogPost } from '~/types/blog';

/**
 * Formatea una fecha a formato legible en español
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
}

/**
 * Extrae las categorías únicas de una lista de posts
 */
export function extractCategories(posts: BlogPost[]): string[] {
  const categoriesSet = new Set<string>();
  posts.forEach(post => {
    if (post.category) {
      categoriesSet.add(post.category);
    }
  });
  return Array.from(categoriesSet);
}

/**
 * Filtra posts por categoría y/o término de búsqueda
 */
export function filterPosts(
  posts: BlogPost[], 
  category?: string | null, 
  searchTerm?: string | null
): BlogPost[] {
  return posts.filter(post => {
    // Filtrar por categoría si está especificada
    const matchesCategory = !category || post.category === category;
    
    // Filtrar por término de búsqueda si está especificado
    const matchesSearch = !searchTerm || 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      post.summary.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });
}

/**
 * Ordena los posts por fecha de publicación (más recientes primero)
 */
export function sortPostsByDate(posts: BlogPost[]): BlogPost[] {
  return [...posts].sort((a, b) => {
    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
  });
}
