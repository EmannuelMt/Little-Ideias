import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Clock, Lightbulb, CheckCircle, Star, Edit, Trash2, Share2, Download, ArrowLeft } from 'lucide-react';
import mockApi from '../services/mockApi';
import ConfirmationModal from '../components/ui/ConfirmationModal';
import { exportToJSON, exportToPDF } from '../utils/exportUtils';
import TagCloud from '../components/ui/TagCloud';

export default function IdeaDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [idea, setIdea] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchIdea = async () => {
      try {
        setLoading(true);
        const data = await mockApi.getIdeaById(id);
        setIdea(data);
        setIsFavorite(data?.favorite || false);
      } catch (error) {
        console.error('Error fetching idea:', error);
        navigate('/ideas');
      } finally {
        setLoading(false);
      }
    };

    fetchIdea();
  }, [id, navigate]);

  const handleDelete = async () => {
    try {
      await mockApi.deleteIdea(id);
      navigate('/ideas');
    } catch (error) {
      console.error('Error deleting idea:', error);
    }
  };

  const toggleFavorite = async () => {
    try {
      await mockApi.toggleFavorite(id);
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(`${window.location.origin}/ideas/${id}`);
    alert('Link copiado para a área de transferência!');
  };

  const handleExport = (type) => {
    if (type === 'json') {
      const link = document.createElement('a');
      link.href = exportToJSON(idea);
      link.download = `ideia-${idea.name}.json`;
      link.click();
    } else if (type === 'pdf') {
      exportToPDF(idea); // Implementar esta função
    }
  };

  if (loading) return <div className="loading">Carregando...</div>;
  if (!idea) return <div className="not-found">Ideia não encontrada</div>;

  const statusIcons = {
    'Ideia': <Lightbulb size={20} />,
    'Em andamento': <Clock size={20} />,
    'Finalizado': <CheckCircle size={20} />
  };

  return (
    <div className="idea-detail">
      <div className="detail-header">
        <button onClick={() => navigate('/ideas')} className="back-button">
          <ArrowLeft size={20} /> Voltar
        </button>
        
        <div className="header-actions">
          <button 
            onClick={toggleFavorite} 
            className={`favorite-btn ${isFavorite ? 'active' : ''}`}
            aria-label={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
          >
            <Star size={20} fill={isFavorite ? 'currentColor' : 'none'} />
          </button>
          
          <button onClick={handleShare} className="action-btn">
            <Share2 size={20} /> Compartilhar
          </button>
          
          <Link to={`/ideas/${id}/edit`} className="action-btn">
            <Edit size={20} /> Editar
          </Link>
          
          <button onClick={() => setShowConfirm(true)} className="action-btn delete">
            <Trash2 size={20} /> Excluir
          </button>
        </div>
      </div>

      <div className="detail-content">
        <div className="main-info">
          <h1>{idea.name}</h1>
          
          <div className="meta-info">
            <span className={`status ${idea.status.toLowerCase().replace(' ', '-')}`}>
              {statusIcons[idea.status]} {idea.status}
            </span>
            <span className={`priority ${idea.priority.toLowerCase()}`}>
              {idea.priority}
            </span>
            {idea.deadline && (
              <span className="deadline">
                📅 {new Date(idea.deadline).toLocaleDateString()}
              </span>
            )}
          </div>
          
          <p className="description">{idea.description}</p>
        </div>

        <div className="detail-grid">
          <div className="detail-section">
            <h3>Categoria</h3>
            <p>{idea.category}</p>
          </div>
          
          <div className="detail-section">
            <h3>Tecnologias</h3>
            <TagCloud ideas={[idea]} />
          </div>
        </div>

        {idea.inspirations?.length > 0 && (
          <div className="detail-section">
            <h3>Inspirações</h3>
            <ul className="inspiration-list">
              {idea.inspirations.map((url, index) => (
                <li key={index}>
                  <a href={url} target="_blank" rel="noopener noreferrer">
                    {url}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {idea.attachments?.length > 0 && (
          <div className="detail-section">
            <h3>Anexos</h3>
            <div className="attachments-grid">
              {idea.attachments.map((attachment, index) => (
                <div key={index} className="attachment-item">
                  {attachment.type === 'image' ? (
                    <img src={attachment.data} alt={`Anexo ${index}`} />
                  ) : (
                    <a href={attachment.data} target="_blank" rel="noopener noreferrer">
                      Ver anexo
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {idea.notes && (
          <div className="detail-section">
            <h3>Notas</h3>
            <p className="notes">{idea.notes}</p>
          </div>
        )}

        <div className="export-actions">
          <button onClick={() => handleExport('json')} className="export-btn">
            <Download size={16} /> Exportar como JSON
          </button>
          <button onClick={() => handleExport('pdf')} className="export-btn">
            <Download size={16} /> Exportar como PDF
          </button>
        </div>
      </div>

      <ConfirmationModal
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleDelete}
        title="Confirmar Exclusão"
        message="Tem certeza que deseja excluir esta ideia permanentemente?"
      />
    </div>
  );
}