import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { X, AlertTriangle } from 'lucide-react';

/**
 * Modal de confirmação para ações críticas
 */
export default function ConfirmationModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  message,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  danger = true
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="confirmation-modal-overlay">
      <div className="confirmation-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <div className="modal-header">
          <div className="title-icon">
            <AlertTriangle size={24} />
          </div>
          <h3 id="modal-title">{title}</h3>
          <button onClick={onClose} className="close-button" aria-label="Fechar modal">
            <X size={20} />
          </button>
        </div>
        
        <div className="modal-content">
          <p>{message}</p>
        </div>
        
        <div className="modal-actions">
          <button 
            onClick={onClose} 
            className="cancel-button"
            aria-label={cancelText}
          >
            {cancelText}
          </button>
          <button 
            onClick={() => {
              onConfirm();
              onClose();
            }} 
            className={`confirm-button ${danger ? 'danger' : ''}`}
            aria-label={confirmText}
            autoFocus
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

ConfirmationModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  confirmText: PropTypes.string,
  cancelText: PropTypes.string,
  danger: PropTypes.bool
};