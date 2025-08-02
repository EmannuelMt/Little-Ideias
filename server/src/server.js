require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const fileUpload = require('express-fileupload');
const ideasRouter = require('./routes/ideas.routes');
const { errorHandler } = require('./middlewares/errorHandler');
const authRouter = require('./routes/auth.routes');
const dashboardRouter = require('./routes/dashboard.routes');
const uploadRouter = require('./routes/upload.routes');
const reportsRouter = require('./routes/reports.routes');
const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(fileUpload());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Health Check Endpoint
app.get('/api/health', async (req, res) => {
  const dbStatus = mongoose.connection.readyState;
  const statusMap = {
    0: 'Disconnected',
    1: 'Connected',
    2: 'Connecting',
    3: 'Disconnecting'
  };

  try {
    // Teste operacional do banco
    await mongoose.connection.db.admin().ping();
    
    res.status(200).json({
      status: 'OK',
      database: {
        status: statusMap[dbStatus],
        host: mongoose.connection.host,
        name: mongoose.connection.name,
        ping: 'success'
      },
      uptime: process.uptime()
    });
  } catch (err) {
    res.status(503).json({
      status: 'ERROR',
      error: err.message,
      database: {
        status: statusMap[dbStatus],
        error: 'Database ping failed'
      }
    });
  }
});

// Conexão com o MongoDB com tratamento robusto
connectDB().then(() => {
  // Rotas
  app.use('/api/ideas', ideasRouter);
  app.use('/api/auth', authRouter);
  app.use('/api/dashboard', dashboardRouter);
  app.use('/api/upload', uploadRouter);
  app.use('/api/reports', reportsRouter);

  // Middleware de erro (deve ser o último)
  app.use(errorHandler);

  // Inicia o servidor somente após conexão com o DB
  app.listen(PORT, () => {
    console.log(`✅ Servidor rodando na porta ${PORT}`);
    console.log(`🔄 Health check disponível em: http://localhost:${PORT}/api/health`);
  });
}).catch(err => {
  console.error('❌ Falha crítica na conexão com MongoDB:', err);
  process.exit(1);
});

// Eventos de conexão do Mongoose para monitoramento
mongoose.connection.on('connected', () => {
  console.log('📊 Conexão estabelecida com MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ Erro na conexão MongoDB:', err);
});

mongoose.connection.on('disconnected', () => {
  console.warn('⚠️ Conexão com MongoDB perdida');
});

// Graceful shutdown
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('⏹️ Conexão com MongoDB encerrada');
  process.exit(0);
});
app.listen(PORT, '0.0.0.0', () => {  // Adicione '0.0.0.0'
  console.log(`✅ Servidor rodando em http://localhost:${PORT}`);
});