const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const articleRoutes = require('./routes/articleRoutes');
const userRoutes = require('./routes/userRoutes');

// Load environment variables (.env) before anything else
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Parse incoming JSON bodies
app.use(express.json());

// Mount domain routers
app.use('/api/articles', articleRoutes);
app.use('/api/users', userRoutes);

// Connect to Atlas first, then start listening
(async () => {
  try {
    await connectDB(process.env.MONGODB_URI);
    app.listen(PORT, () => {
      console.log(`MERN server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Critical server startup error:', err.message);
    process.exit(1);
  }
})();
