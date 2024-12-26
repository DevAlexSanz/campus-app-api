import express, { Application } from 'express';
import Config from '@config/config';
import apiRoutes from '@routes/routes';
import Server from '@server/server';

const createServer = () => {
  const { api } = Config.getConfig();

  const app: Application = express();
  const router = apiRoutes();

  return new Server(app, api.PORT, api.CORS_WHITELIST, router);
};

export default createServer;
