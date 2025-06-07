import { Link } from "@remix-run/react";

interface CategoryListProps {
  categories: string[];
  activeCategory: string | null;
}

export default function CategoryList({ categories, activeCategory }: CategoryListProps) {
  return (
    <div className="mb-8 overflow-x-auto pb-2">
      <div className="flex space-x-2">
        <Link
          to="/blog"
          className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
            activeCategory === null
              ? "bg-soraia-primary text-soraia-light"
              : "bg-white/5 text-soraia-dark hover:bg-white/10 hover:text-white"
          }`}
        >
          Todos
        </Link>
        
        {categories.map((category) => (
          <Link
            key={category}
            to={`/blog?category=${encodeURIComponent(category)}`}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              activeCategory === category
                ? "bg-soraia-primary text-soraia-light"
                : "bg-white/5 text-soraia-dark hover:bg-white/10 hover:text-white"
            }`}
          >
            {category}
          </Link>
        ))}
      </div>
    </div>
  );
}
