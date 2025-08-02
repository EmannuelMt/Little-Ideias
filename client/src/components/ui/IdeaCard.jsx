import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Lightbulb, CheckCircle, Star } from 'lucide-react';
import mockApi from '../../services/mockApi';

const statusIcons = {
  'Ideia': <Lightbulb size={16} />,
  'Em andamento': <Clock size={16} />,
  'Finalizado': <CheckCircle size={16} />
};

export default function IdeaCard({ idea }) {
  const [isFavorite, setIsFavorite] = useState(idea.favorite || false);

  const toggleFavorite = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await mockApi.toggleFavorite(idea.id);
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  return (
    <Link to={`/ideas/${idea.id}`} className="idea-card">
      <div className="card-header">
        <div>
          <h3>{idea.name}</h3>
          <span className={`priority ${idea.priority.toLowerCase()}`}>
            {idea.priority}
          </span>
        </div>
        <button 
          onClick={toggleFavorite}
          className={`favorite-btn ${isFavorite ? 'active' : ''}`}
          aria-label={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
        >
          <Star size={18} fill={isFavorite ? 'currentColor' : 'none'} />
        </button>
      </div>
      
      <p className="description">{idea.description}</p>
      
      <div className="card-footer">
        <div className={`status ${idea.status.toLowerCase().replace(' ', '-')}`}>
          {statusIcons[idea.status]}
          <span>{idea.status}</span>
        </div>
      </div>
    </Link>
  );
}