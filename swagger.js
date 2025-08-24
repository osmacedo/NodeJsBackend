// swagger.js
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0", // Versión de OpenAPI
    info: {
      title: "API Documentación con Swagger",
      version: "1.0.0",
      description: "Documentación de mi API Express usando Swagger",
    },
    servers: [
      {
        url: "http://localhost:3000", // tu servidor local
      },
    ],
  },
  apis: ["./src/routes/*.js"], // Rutas donde tienes los endpoints documentados
};

const swaggerSpec = swaggerJsDoc(options);

export function swaggerDocs(app, port) {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    console.log(`📄 Swagger Docs disponible en http://localhost:${port}/api-docs`);
  }
