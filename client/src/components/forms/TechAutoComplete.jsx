import { useState } from 'react';

export default function TechAutoComplete({ suggestions, onSelect }) {
  const [inputValue, setInputValue] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    
    if (value) {
      setFilteredSuggestions(
        suggestions.filter(tech => 
          tech.toLowerCase().includes(value.toLowerCase())
        )
      );
    } else {
      setFilteredSuggestions([]);
    }
  };

  const handleSelect = (tech) => {
    onSelect(tech);
    setInputValue('');
    setFilteredSuggestions([]);
  };

  return (
    <div className="tech-autocomplete">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Digite uma tecnologia..."
      />
      {filteredSuggestions.length > 0 && (
        <ul className="suggestions-list">
          {filteredSuggestions.map(tech => (
            <li key={tech} onClick={() => handleSelect(tech)}>
              {tech}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}