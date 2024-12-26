import express, { Application } from 'express';
import Config from '@config/config';
import Database from '@database/database';
import apiRoutes from '@routes/routes';
import Server from '@server/server';

const createServer = () => {
  const { api, db } = Config.getConfig();

  const app: Application = express();
  const database = new Database(db.MONGODB_URI);
  const router = apiRoutes();

  return new Server(app, database, api.PORT, api.CORS_WHITELIST, router);
};

export default createServer;
