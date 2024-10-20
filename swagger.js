const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Swagger definition
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Car API',
    version: '1.0.0',
    description: 'API documentation for the Car API',
  },
  servers: [
    {
      url: 'https://car-api-limh.onrender.com',
      description: 'Production server',
    },
    {
      url: 'http://localhost:3000',
      description: 'Local server',
    },
  ],
};

// Options for the Swagger docs
const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ['./routes/*.js'], // Adjust the path to where your route files are
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);

module.exports = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
