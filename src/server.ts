import "reflect-metadata";  
import { validationMetadatasToSchemas } from 'class-validator-jsonschema'
import { Container } from "typedi";
import * as dotenv from "dotenv";
import express from "express";
import { createExpressServer, useContainer, getMetadataArgsStorage } from "routing-controllers";
import { routingControllersToSpec } from 'routing-controllers-openapi'
import { MoviesController } from "./controllers/movies.controller";
import * as swaggerUi from 'swagger-ui-express'
import { Logger } from "./common/logger/logger";
import { OpenAPIObject } from "openapi3-ts";
const { defaultMetadataStorage } = require('class-transformer/storage')

useContainer(Container);

dotenv.config();

Container.set(Logger, new Logger());
 
const routingControllersOptions = {
  cors: true,
  classTransformer: true,
  routePrefix: '/api',
  controllers: [MoviesController], // we specify controllers we want to use
};

// Parse class-validator classes into JSON Schema:
const schemas :any = validationMetadatasToSchemas({
  classTransformerMetadataStorage: defaultMetadataStorage,
  refPointerPrefix: '#/components/schemas/',
})

// Parse routing-controllers classes into OpenAPI spec:
const storage = getMetadataArgsStorage()
const spec = routingControllersToSpec(storage, routingControllersOptions, {
  components: {
    schemas,
    securitySchemes: {
      basicAuth: {
        scheme: 'basic',
        type: 'http',
      },
    },
  },
  info: {
    description: 'Generated with `routing-controllers-openapi`',
    title: 'Movie search an favourites',
    version: '1.0.0',
  },
})
if (!process.env.PORT) process.exit(1);
const PORT: number = parseInt(process.env.PORT as string, 10);
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/docs", swaggerUi.serve, swaggerUi.setup(spec));
const routingApp  = createExpressServer(routingControllersOptions);
app.use(routingApp);

// // Render spec on root:
app.get('/', (_req: any, res: { json: (arg0: OpenAPIObject) => void; }) => {
  res.json(spec)
})

/**
 * Server Activation
 */
const server = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
