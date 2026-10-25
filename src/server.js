const dotenv = require('dotenv');
const path = require('path');

// Resolve .env from the project root, regardless of the launch directory.
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const express = require('express');
const connectDB = require('./config/db');
const articleRoutes = require('./routes/articleRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Parse incoming JSON bodies
app.use(express.json());

// Mount domain routers
app.use('/api/articles', articleRoutes);
app.use('/api/users', userRoutes);

async function startServer() {
  const port = Number.parseInt(process.env.PORT || '3000', 10);

  if (!Number.isInteger(port) || port < 0 || port > 65535) {
    throw new Error('PORT must be an integer between 0 and 65535');
  }

  await connectDB(process.env.MONGODB_URI);

  const server = await new Promise((resolve, reject) => {
    const httpServer = app.listen(port);
    httpServer.once('listening', () => resolve(httpServer));
    httpServer.once('error', reject);
  });

  console.log(`MERN server running on http://localhost:${port}`);
  return server;
}

if (require.main === module) {
  startServer().catch((err) => {
    console.error('Critical server startup error:', err.message);
    process.exitCode = 1;
  });
}

module.exports = { app, startServer };
