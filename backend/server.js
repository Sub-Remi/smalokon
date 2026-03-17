require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const db = require('./models'); // mengimpor seluruh model dan sequelize instance
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (frontend)
app.use(express.static(path.join(__dirname, 'public')));

// API routes
app.use('/api', routes);

// Sync database dan jalankan server
db.sequelize.authenticate()
  .then(() => {
    console.log('Database connected...');
    return db.sequelize.sync({ alter: true }); // sinkronisasi model
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error('Unable to connect to database:', err));