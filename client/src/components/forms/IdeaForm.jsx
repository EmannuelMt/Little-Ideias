import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Plus, X, Save, Image, Link, Trash2, ExternalLink, Calendar, AlertCircle, Check } from 'lucide-react';
import ImageUploader from './ImageUploader';
import TechAutoComplete from './TechAutoComplete';
import './IdeaForm.css';

const statusOptions = ['Ideia', 'Em andamento', 'Finalizado'];
const priorityOptions = ['Baixa', 'Média', 'Alta'];
const techSuggestions = ['React', 'Node.js', 'TypeScript', 'Next.js', 'Tailwind CSS', 'MongoDB'];

export default function IdeaForm({ initialData, onSave, onCancel, isLoading = false }) {
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isDirty }, 
    setValue,
    watch,
    reset
  } = useForm({
    defaultValues: initialData || {
      name: '',
      description: '',
      category: '',
      technologies: [],
      status: 'Ideia',
      priority: 'Média',
      inspirations: [''],
      notes: '',
      attachments: [],
      deadline: ''
    }
  });

  const [techList, setTechList] = useState(initialData?.technologies || []);
  const [inspirationList, setInspirationList] = useState(initialData?.inspirations || ['']);
  const [attachments, setAttachments] = useState(initialData?.attachments || []);
  const [activeSection, setActiveSection] = useState('basic');
  const [saveSuccess, setSaveSuccess] = useState(false);

  const deadline = watch('deadline');

  useEffect(() => {
    setValue('technologies', techList, { shouldDirty: true });
  }, [techList, setValue]);

  useEffect(() => {
    setValue('inspirations', inspirationList.filter(url => url.trim() !== ''), { shouldDirty: true });
  }, [inspirationList, setValue]);

  useEffect(() => {
    setValue('attachments', attachments, { shouldDirty: true });
  }, [attachments, setValue]);

  const addTechnology = (tech) => {
    if (tech && !techList.includes(tech)) {
      setTechList([...techList, tech]);
    }
  };

  const removeTechnology = (tech) => {
    setTechList(techList.filter(t => t !== tech));
  };

  const addInspiration = () => {
    setInspirationList([...inspirationList, '']);
  };

  const removeInspiration = (index) => {
    if (inspirationList.length > 1) {
      const newList = [...inspirationList];
      newList.splice(index, 1);
      setInspirationList(newList);
    }
  };

  const handleInspirationChange = (index, value) => {
    const newList = [...inspirationList];
    newList[index] = value;
    setInspirationList(newList);
  };

  const handleImageUpload = (imageData) => {
    setAttachments([...attachments, {
      type: 'image',
      data: imageData,
      createdAt: new Date().toISOString(),
      name: `image-${attachments.length + 1}`
    }]);
  };

  const removeAttachment = (index) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  const onSubmit = async (data) => {
    const ideaData = {
      ...data,
      technologies: techList,
      inspirations: inspirationList.filter(url => url.trim() !== ''),
      attachments
    };
    
    try {
      await onSave(ideaData);
      setSaveSuccess(true);
      
      if (!initialData) {
        reset();
        setTechList([]);
        setInspirationList(['']);
        setAttachments([]);
      }
      
      setTimeout(() => setSaveSuccess(false), 2000);
    } catch (error) {
      console.error('Error saving idea:', error);
    }
  };

  const isDeadlinePassed = deadline && new Date(deadline) < new Date();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="idea-form">
      {saveSuccess && (
        <div className="save-success-overlay">
          <div className="success-animation">
            <div className="checkmark-circle">
              <Check size={48} className="checkmark" />
            </div>
            <h3>Ideia salva com sucesso!</h3>
          </div>
        </div>
      )}

      {isLoading && (
        <div className="save-loading-overlay">
          <div className="loading-animation">
            <div className="loading-spinner"></div>
            <p>Salvando sua ideia...</p>
          </div>
        </div>
      )}

      <div className="form-navigation">
        <button 
          type="button" 
          className={`nav-button ${activeSection === 'basic' ? 'active' : ''}`}
          onClick={() => setActiveSection('basic')}
        >
          Informações Básicas
        </button>
        <button 
          type="button" 
          className={`nav-button ${activeSection === 'details' ? 'active' : ''}`}
          onClick={() => setActiveSection('details')}
        >
          Detalhes
        </button>
        <button 
          type="button" 
          className={`nav-button ${activeSection === 'media' ? 'active' : ''}`}
          onClick={() => setActiveSection('media')}
        >
          Mídia & Links
        </button>
      </div>

      <div className={`form-section ${activeSection === 'basic' ? 'active' : ''}`}>
        <h2 className="form-title">
          {initialData ? 'Editar Ideia' : 'Nova Ideia'}
          {isDirty && <span className="dirty-indicator">*</span>}
        </h2>
        
        <div className="form-group">
          <label htmlFor="name">
            Nome da Ideia
            <span className="required-indicator">*</span>
          </label>
          <input
            id="name"
            {...register('name', { 
              required: 'Este campo é obrigatório',
              minLength: {
                value: 3,
                message: 'Mínimo de 3 caracteres'
              }
            })}
            placeholder="Dê um nome para sua ideia"
            className={errors.name ? 'has-error' : ''}
          />
          {errors.name && (
            <span className="error-message">
              <AlertCircle size={14} /> {errors.name.message}
            </span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="description">
            Descrição
            <span className="required-indicator">*</span>
          </label>
          <textarea
            id="description"
            {...register('description', { 
              required: 'Este campo é obrigatório',
              minLength: {
                value: 10,
                message: 'Mínimo de 10 caracteres'
              }
            })}
            rows="4"
            placeholder="Descreva sua ideia com detalhes..."
            className={errors.description ? 'has-error' : ''}
          />
          {errors.description && (
            <span className="error-message">
              <AlertCircle size={14} /> {errors.description.message}
            </span>
          )}
        </div>
      </div>

      <div className={`form-section ${activeSection === 'details' ? 'active' : ''}`}>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="category">
              Categoria
              <span className="required-indicator">*</span>
            </label>
            <input
              id="category"
              {...register('category', { 
                required: 'Este campo é obrigatório',
                pattern: {
                  value: /^[a-zA-ZÀ-ÿ\s]{3,}$/,
                  message: 'Categoria inválida'
                }
              })}
              placeholder="Ex: Portfólio, Blog, App"
              className={errors.category ? 'has-error' : ''}
            />
            {errors.category && (
              <span className="error-message">
                <AlertCircle size={14} /> {errors.category.message}
              </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="status">Status</label>
            <div className="select-wrapper">
              <select id="status" {...register('status')}>
                {statusOptions.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="priority">Prioridade</label>
            <div className="select-wrapper">
              <select id="priority" {...register('priority')}>
                {priorityOptions.map(priority => (
                  <option key={priority} value={priority}>{priority}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="deadline">
              Prazo
              {isDeadlinePassed && (
                <span className="deadline-warning">
                  <AlertCircle size={14} /> Prazo expirado
                </span>
              )}
            </label>
            <div className="date-input-wrapper">
              <Calendar size={18} className="calendar-icon" />
              <input
                id="deadline"
                type="date"
                {...register('deadline')}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
          </div>
        </div>

        <div className="form-group">
          <label>Tecnologias</label>
          <TechAutoComplete
            suggestions={techSuggestions}
            onSelect={addTechnology}
            placeholder="Adicione tecnologias (React, Node.js...)"
          />
          <div className="tech-tags-container">
            {techList.length > 0 ? (
              <div className="tech-tags">
                {techList.map(tech => (
                  <span key={tech} className="tech-tag">
                    {tech}
                    <button 
                      type="button" 
                      onClick={() => removeTechnology(tech)} 
                      className="remove-tag"
                      aria-label={`Remover ${tech}`}
                    >
                      <X size={12} />
                    </button>
                  </span>
                ))}
              </div>
            ) : (
              <span className="hint-text">Nenhuma tecnologia adicionada</span>
            )}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="notes">Notas Adicionais</label>
          <textarea
            id="notes"
            {...register('notes')}
            rows="3"
            placeholder="Anotações, referências, etc..."
            maxLength={500}
          />
          <span className="hint-text">Máximo 500 caracteres</span>
        </div>
      </div>

      <div className={`form-section ${activeSection === 'media' ? 'active' : ''}`}>
        <div className="form-group">
          <label>Links de Inspiração</label>
          <div className="inspiration-list">
            {inspirationList.map((url, index) => (
              <div key={index} className="inspiration-item">
                <div className="input-with-icon">
                  <ExternalLink size={16} className="link-icon" />
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => handleInspirationChange(index, e.target.value)}
                    placeholder="https://exemplo.com"
                    className="inspiration-input"
                  />
                </div>
                <button 
                  type="button" 
                  onClick={() => removeInspiration(index)} 
                  className="remove-button"
                  disabled={inspirationList.length <= 1}
                  aria-label="Remover link"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
            <button 
              type="button" 
              onClick={addInspiration} 
              className="add-link-button"
            >
              <Plus size={16} /> Adicionar link
            </button>
          </div>
        </div>

        <div className="form-group">
          <label>Anexos</label>
          <ImageUploader 
            onUpload={handleImageUpload} 
            maxSizeMB={5}
            allowedTypes={['image/jpeg', 'image/png', 'image/gif']}
          />
          
          {attachments.length > 0 ? (
            <div className="attachments-grid">
              {attachments.map((attachment, index) => (
                <div key={index} className="attachment-card">
                  <div className="attachment-content">
                    {attachment.type === 'image' ? (
                      <>
                        <Image size={20} className="attachment-icon" />
                        <span className="attachment-name">{attachment.name || `Imagem ${index + 1}`}</span>
                      </>
                    ) : (
                      <>
                        <Link size={20} className="attachment-icon" />
                        <span className="attachment-name">{attachment.name || `Anexo ${index + 1}`}</span>
                      </>
                    )}
                  </div>
                  <button 
                    type="button" 
                    onClick={() => removeAttachment(index)}
                    className="remove-attachment"
                    aria-label="Remover anexo"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-attachments">
              <span className="hint-text">Nenhum anexo adicionado</span>
            </div>
          )}
        </div>
      </div>

      <div className="form-actions">
        <button 
          type="button" 
          onClick={onCancel} 
          className="secondary-button"
          disabled={isLoading}
        >
          Cancelar
        </button>
        <button 
          type="submit" 
          className="primary-button"
          disabled={isLoading || !isDirty}
        >
          {isLoading ? (
            <span className="loading-spinner"></span>
          ) : (
            <>
              {initialData ? <Save size={18} /> : <Plus size={18} />}
              {initialData ? 'Salvar Alterações' : 'Criar Ideia'}
            </>
          )}
        </button>
      </div>
    </form>
  );
}