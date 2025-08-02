const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/little-ideias', {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 30000,
    });

    console.log(`✅ MongoDB conectado: ${conn.connection.host}`);
    
    // Teste imediato da conexão
    await testDatabaseConnection();
    
    return conn;
  } catch (error) {
    console.error(`❌ Falha na conexão com MongoDB: ${error.message}`);
    process.exit(1);
  }
};

// Função de teste de conexão
async function testDatabaseConnection() {
  try {
    // Cria uma collection temporária se não existir
    const testCollection = mongoose.connection.db.collection('connection_test');
    
    // Teste de escrita
    const insertResult = await testCollection.insertOne({
      test: "Conexão ativa",
      timestamp: new Date()
    });
    
    // Teste de leitura
    const doc = await testCollection.findOne({ _id: insertResult.insertedId });
    
    // Teste de exclusão
    await testCollection.deleteOne({ _id: insertResult.insertedId });
    
    console.log('✔ Teste de conexão com o banco realizado com sucesso');
  } catch (err) {
    console.error('✖ Falha no teste de conexão com o banco:', err);
    throw err;
  }
}
// Verificação periódica (opcional)
setInterval(() => {
  const pingTime = Date.now();
  mongoose.connection.db.admin().ping((err, result) => {
    console.log(`Latência do DB: ${Date.now() - pingTime}ms`);
    if (err) console.error('❌ Falha no ping ao MongoDB', err);
  });
}, 60000); // A cada 1 minuto

module.exports = connectDB;