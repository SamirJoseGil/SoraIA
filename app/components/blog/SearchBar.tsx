import { Form, useSubmit, useNavigation } from "@remix-run/react";
import { useEffect, useRef } from "react";

interface SearchBarProps {
  searchTerm: string | null;
}

export default function SearchBar({ searchTerm }: SearchBarProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const submit = useSubmit();
  const navigation = useNavigation();
  const isSearching = navigation.state === "submitting" && 
                     navigation.formData?.get("_action") === "search";

  // Manejar la búsqueda mientras el usuario escribe
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isFirstSearch = searchTerm === null;
    submit(formRef.current, {
      replace: !isFirstSearch
    });
  };

  // Restaurar el valor del campo de búsqueda después de la navegación
  useEffect(() => {
    if (inputRef.current && searchTerm) {
      inputRef.current.value = searchTerm;
    }
  }, [searchTerm]);

  return (
    <Form ref={formRef} method="get" className="mb-8">
      <input type="hidden" name="_action" value="search" />
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-soraia-dark">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        
        <input
          ref={inputRef}
          type="search"
          name="search"
          placeholder="Buscar artículos..."
          className="block w-full p-3 pl-10 bg-white/5 border border-gray-700/30 rounded-lg text-white placeholder-soraia-dark/50 focus:outline-none focus:ring-2 focus:ring-soraia-primary"
          defaultValue={searchTerm || ""}
          onChange={handleSearchChange}
          aria-label="Buscar artículos"
        />
        
        {isSearching && (
          <div className="absolute inset-y-0 right-3 flex items-center">
            <div className="animate-spin h-5 w-5 border-2 border-soraia-primary border-t-transparent rounded-full"></div>
          </div>
        )}
      </div>
    </Form>
  );
}
