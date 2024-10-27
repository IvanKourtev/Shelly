const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Swagger configuration
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Webhook API',
      version: '1.0.0',
      description: 'API for managing webhooks',
    },
    servers: [
      {
        url: 'http://localhost:3000/api/webhooks',
      },
    ],
  },
  apis: ['./routes/*.js'], // Път до файловете с API описание
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};