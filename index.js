// Setting Up Constants and Requiring Modules
const express = require('express');
const rateLimit = require('express-rate-limit');
const webhookRoutes = require('./routes/webhooks');
const swaggerSetup = require('./swagger');

// Initializing Express and Setting Up Port
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Rate Limiting Middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000
});
app.use(limiter);

// Routes
app.use('/api/webhooks', webhookRoutes);

swaggerSetup(app);

// Starting the Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

