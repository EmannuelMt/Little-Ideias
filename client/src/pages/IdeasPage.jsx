import { useState, useEffect } from 'react';
import mockApi from '../services/mockApi';
import IdeaCard from '../components/ui/IdeaCard';
import FilterBar from '../components/ui/FilterBar';
import SearchBar from '../components/ui/SearchBar';
import LoadingSpinner from '../components/ui/LoadingSpinner';

export default function IdeasPage() {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    status: 'all',
    category: ''
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await mockApi.getIdeas();
        setIdeas(data);
        
        // Extrai categorias únicas
        const uniqueCategories = [...new Set(data.map(idea => idea.category))];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error('Error fetching ideas:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const handleFilterChange = (type, value) => {
    setFilters(prev => ({ ...prev, [type]: value }));
  };

  const filteredIdeas = ideas.filter(idea => {
    // Filtro por status
    if (filters.status === 'completed' && idea.status !== 'Finalizado') return false;
    if (filters.status === 'progress' && idea.status !== 'Em andamento') return false;
    if (filters.status === 'ideas' && idea.status !== 'Ideia') return false;
    
    // Filtro por categoria
    if (filters.category && idea.category !== filters.category) return false;
    
    // Busca - CORREÇÃO DEFINITIVA
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      return (
        idea.name.toLowerCase().includes(term) ||
        idea.description.toLowerCase().includes(term) ||
        idea.technologies.some(tech => tech.toLowerCase().includes(term))
      );
    }
    
    return true;
  });

  return (
    <div className="ideas-page">
      <div className="page-header">
        <h1>Minhas Ideias</h1>
        <SearchBar 
          value={searchTerm} 
          onChange={setSearchTerm} 
          placeholder="Buscar por nome, tecnologia ou descrição..."
        />
      </div>
      
      <FilterBar 
        currentFilter={filters.status}
        onFilterChange={handleFilterChange}
        categories={categories}
      />
      
      {loading ? (
        <LoadingSpinner />
      ) : filteredIdeas.length === 0 ? (
        <div className="no-results">
          <p>Nenhuma ideia encontrada</p>
          {(searchTerm || filters.status !== 'all' || filters.category) && (
            <button 
              onClick={() => {
                setSearchTerm('');
                setFilters({ status: 'all', category: '' });
              }}
              className="clear-filters"
            >
              Limpar filtros
            </button>
          )}
        </div>
      ) : (
        <div className="ideas-grid">
          {filteredIdeas.map((idea, index) => (
            <IdeaCard 
              key={idea.id} 
              idea={idea} 
              style={{ animationDelay: `${index * 0.1}s` }}
            />
          ))}
        </div>
      )}
    </div>
  );
}