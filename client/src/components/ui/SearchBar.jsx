import { Search, X } from 'lucide-react';
import { useEffect, useRef } from 'react';

export default function SearchBar({ value, onChange }) {
  const inputRef = useRef(null);

  useEffect(() => {
    // Focar no input quando o componente é montado
    inputRef.current.focus();
  }, []);

  return (
    <div className="search-bar">
      <Search size={18} className="search-icon" />
      <input
        ref={inputRef}
        type="text"
        placeholder="Buscar por nome, tecnologia..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {value && (
        <button 
          onClick={() => onChange('')}
          className="clear-search"
          aria-label="Limpar busca"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}