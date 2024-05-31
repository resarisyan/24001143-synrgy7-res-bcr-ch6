import 'reflect-metadata';
import { InversifyExpressServer } from 'inversify-express-utils';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import './controllers/AuthController.js';
import { Model } from 'objection';
import knex from 'knex';
import swaggerUi from 'swagger-ui-express';
import knexConfig from './common/configs/knex.js';
import { diContainer } from './di/inversify.config.js';
import swaggerDocument from '../swagger.json';

Model.knex(knex(knexConfig));
dotenv.config();
const port = process.env.PORT || 9999;
const app = express();
app.locals.baseURL = `${process.env.BASE_URL}:${port}`;
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
const server = new InversifyExpressServer(
  diContainer,
  null,
  { rootPath: '/api/v1' },
  app
);
const appConfigured = server.build();
appConfigured.listen(port, () => console.log(`Server running on port ${port}`));
