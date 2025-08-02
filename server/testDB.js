require('dotenv').config();
const connectDB = require('./config/db');
const Idea = require('./models/idea.model');

connectDB();

const testConnection = async () => {
  try {
    const count = await Idea.countDocuments();
    console.log(`Conexão bem-sucedida! Encontrados ${count} ideias no banco.`);
    process.exit(0);
  } catch (error) {
    console.error('Falha ao testar conexão:', error);
    process.exit(1);
  }
};

testConnection();