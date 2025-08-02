const mockIdeas = [
  {
    id: 1,
    name: "Portfólio Interativo",
    description: "Um portfólio com animações e interações criativas",
    category: "Portfólio",
    technologies: ["React", "Framer Motion", "Tailwind CSS"],
    status: "Em andamento",
    priority: "Alta",
    inspirations: [
      "https://www.awwwards.com",
      "https://dribbble.com"
    ],
    notes: "Focar na performance para mobile",
    createdAt: "2025-07-15",
    favorite: false
  }
]

const mockApi = {
  getIdeas: () => new Promise(resolve => {
    setTimeout(() => resolve([...mockIdeas]), 500)
  }),
  
  getIdeaById: (id) => new Promise(resolve => {
    setTimeout(() => {
      const idea = mockIdeas.find(item => item.id === parseInt(id))
      resolve(idea ? {...idea} : null)
    }, 500)
  }),
  
  createIdea: (newIdea) => new Promise(resolve => {
    setTimeout(() => {
      const idea = {
        id: mockIdeas.length + 1,
        createdAt: new Date().toISOString().split('T')[0],
        ...newIdea,
        favorite: false
      }
      mockIdeas.push(idea)
      resolve({...idea})
    }, 500)
  }),
  
  updateIdea: (id, updatedIdea) => new Promise(resolve => {
    setTimeout(() => {
      const index = mockIdeas.findIndex(item => item.id === parseInt(id))
      if (index >= 0) {
        mockIdeas[index] = {...mockIdeas[index], ...updatedIdea}
        resolve({...mockIdeas[index]})
      } else {
        resolve(null)
      }
    }, 500)
  }),
  
  deleteIdea: (id) => new Promise(resolve => {
    setTimeout(() => {
      const index = mockIdeas.findIndex(item => item.id === parseInt(id))
      if (index >= 0) {
        mockIdeas.splice(index, 1)
        resolve(true)
      } else {
        resolve(false)
      }
    }, 500)
  }),
  
  toggleFavorite: (id) => new Promise(resolve => {
    setTimeout(() => {
      const index = mockIdeas.findIndex(item => item.id === parseInt(id))
      if (index >= 0) {
        mockIdeas[index].favorite = !mockIdeas[index].favorite
        resolve({...mockIdeas[index]})
      }
      resolve(null)
    }, 300)
  })
}

export default mockApi