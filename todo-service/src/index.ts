import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

import { AppDataSource } from "./data-source";
import V1Routes from "./routes/v1";
import logger, { stream } from "./config/logger";

const PORT = process.env.PORT || 3000;

const swaggerDefinition = {
  openapi: "3.1.0",
  info: {
    title: "TODO Service API",
    version: "1.0.0",
    description: "TODO Service API Documentation",
  },
  servers: [
    {
      url: `http://localhost:${PORT}/api/{version}`,
      description: "Development server",
      variables: {
        version: {
          default: "v1",
          enum: ["v1", "v2"],
        },
      },
    },
  ],
  externalDocs: {
    // <<< this will add the link to your swagger page
    description: "swagger.json", // <<< link text
    url: "/api-docs/swagger.json", // <<< and the file added below in api.get(...)
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
};

const swaggerOptions = {
  swaggerDefinition,
  apis: ["./**/*.ts"],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

const app = express();
app.use(morgan("short", { stream }));

app.use(cors());
app.use(express.json());

app.use("/api/v1", V1Routes);

app.get("/api-docs/swagger.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});
app.use("/api-docs", swaggerUi.serve);
app.get("/api-docs", swaggerUi.setup(swaggerSpec));

AppDataSource.initialize()
  .then(async () => {
    app.listen(PORT, () => {
      logger.info(`Server listening on port ${PORT}...`);
    });
    logger.info("Data Source has been initialized!");
  })
  .catch((error) => logger.error(error));
