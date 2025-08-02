require('dotenv').config();
const connectDB = require('./config/db');
const Idea = require('./models/idea.model');
const User = require('./models/user.model');

connectDB();

const seedIdeas = [
  {
    name: "Portfólio Criativo",
    description: "Um site para mostrar meus projetos",
    category: "Portfólio",
    technologies: ["React", "Node.js"],
    status: "Em andamento",
    priority: "Alta"
  },
  // Adicione mais ideias...
];

const seedUsers = [
  {
    name: "Admin",
    email: "admin@example.com",
    password: "123456",
    role: "admin"
  }
];

const importData = async () => {
  try {
    await Idea.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(seedUsers);
    const userId = createdUsers[0]._id;

    const ideasWithUser = seedIdeas.map(idea => ({
      ...idea,
      createdBy: userId
    }));

    await Idea.insertMany(ideasWithUser);
    console.log('Dados importados com sucesso');
    process.exit();
  } catch (error) {
    console.error('Erro ao importar dados:', error);
    process.exit(1);
  }
};

importData();