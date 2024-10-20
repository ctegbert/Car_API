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
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
    schemas: {
      Car: {
        type: 'object',
        required: ['make', 'model', 'year', 'price', 'mileage', 'color'],
        properties: {
          make: {
            type: 'string',
          },
          model: {
            type: 'string',
          },
          year: {
            type: 'integer',
          },
          price: {
            type: 'number',
          },
          mileage: {
            type: 'integer',
          },
          color: {
            type: 'string',
          },
          description: {
            type: 'string',
          },
        },
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
};

// Options for the Swagger docs
const options = {
  swaggerDefinition,
  apis: ['./routes/*.js', './authRoutes.js'], // Ensure these paths include all your route files
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);

module.exports = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, { explorer: true }));
};
