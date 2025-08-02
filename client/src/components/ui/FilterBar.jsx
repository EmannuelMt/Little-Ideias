export default function FilterBar({ currentFilter, onFilterChange, categories }) {
  const filters = [
    { value: 'all', label: 'Todas' },
    { value: 'ideas', label: 'Ideias' },
    { value: 'progress', label: 'Em Andamento' },
    { value: 'completed', label: 'Finalizadas' }
  ];

  return (
    <div className="filter-container">
      <div className="status-filters">
        {filters.map(filter => (
          <button
            key={filter.value}
            className={`filter-btn ${currentFilter === filter.value ? 'active' : ''}`}
            onClick={() => onFilterChange(filter.value)}
          >
            {filter.label}
          </button>
        ))}
      </div>
      
      <select 
        onChange={(e) => onFilterChange('category', e.target.value)}
        className="category-filter"
      >
        <option value="">Todas categorias</option>
        {categories.map(category => (
          <option key={category} value={category}>{category}</option>
        ))}
      </select>
    </div>
  );
}