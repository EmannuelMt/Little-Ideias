import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import IdeaForm from '../components/forms/IdeaForm'
import mockApi from '../services/mockApi'; 

export default function EditIdeaPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [idea, setIdea] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchIdea = async () => {
      try {
        const data = await mockApi.getIdeaById(id)
        setIdea(data)
      } catch (error) {
        console.error('Error fetching idea:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchIdea()
  }, [id])

  const handleSave = async (updatedData) => {
    try {
      await mockApi.updateIdea(id, updatedData)
      navigate(`/ideas/${id}`)
    } catch (error) {
      console.error('Error updating idea:', error)
    }
  }

  if (loading) return <p>Carregando...</p>
  if (!idea) return <p>Ideia não encontrada</p>

  return (
    <div className="edit-idea-page">
      <h2>Editar Ideia</h2>
      <IdeaForm 
        initialData={idea} 
        onSave={handleSave} 
        onCancel={() => navigate(`/ideas/${id}`)} 
      />
    </div>
  )
}