const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");


        
    


const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "API de Mi Aplicación",
        version: "1.0.0",
        description: "Documentación de la API con Swagger",
      },
      servers: [
        {
          url: "http://localhost:5000",
        },
      ],
    },
    apis: ["./routes/*.js"], 
  };

  const swaggerSpec = swaggerJsDoc(options);

  const setupSwagger = (app) => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  };

  module.exports = setupSwagger;