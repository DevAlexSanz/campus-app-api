import express from 'express';
import { config } from '@config/config';
import apiRoutes from '@routes/routes';
import { createServer } from '@server/server';

export const startServer = () => {
  const { api } = config;

  const app = express();

  return createServer(app, api.PORT, api.API_CORS_WHITELIST, apiRoutes);
};
