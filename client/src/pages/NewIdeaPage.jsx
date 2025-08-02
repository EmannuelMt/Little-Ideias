import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import IdeaForm from '../components/forms/IdeaForm'
import mockApi from '../services/mockApi'; 

function NewIdeaPage() {
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSave = async (ideaData) => {
    setIsSubmitting(true)
    try {
      await mockApi.createIdea(ideaData)
      navigate('/ideas')
    } catch (error) {
      console.error('Error creating idea:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="new-idea-page">
      <h2>{isSubmitting ? 'Salvando...' : 'Nova Ideia'}</h2>
      <IdeaForm 
        onSave={handleSave} 
        onCancel={() => navigate('/ideas')} 
      />
    </div>
  )
}

// Certifique-se que esta linha está presente:
export default NewIdeaPage