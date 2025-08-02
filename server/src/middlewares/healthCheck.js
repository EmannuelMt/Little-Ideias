
const router = require('express').Router();

router.get('/health', async (req, res) => {
  const dbStatus = mongoose.connection.readyState;
  
  const statusMap = {
    0: 'Disconectado',
    1: 'Conectado',
    2: 'Conectando',
    3: 'Desconectando'
  };

  res.status(dbStatus === 1 ? 200 : 503).json({
    database: {
      status: statusMap[dbStatus],
      details: mongoose.connection.host,
      collections: dbStatus === 1 ? await mongoose.connection.db.listCollections().toArray() : null
    }
  });
});

module.exports = router;