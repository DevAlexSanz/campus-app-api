import express, { Application, Request, Response, Router } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { IDatabase } from '@database/database';
import { corsWhitelistValidator } from '@utils/validators/cors-whitelist.validator';

class Server {
  private app: Application;
  private database: IDatabase;
  private port: number;
  private corsWhitelist: string[];
  private apiRoutes: Router;

  constructor(
    app: Application,
    database: IDatabase,
    port: number,
    corsWhitelist: string[],
    apiRoutes: Router
  ) {
    this.app = app;
    this.database = database;
    this.port = port;
    this.corsWhitelist = corsWhitelist;
    this.apiRoutes = apiRoutes;

    this.initializeMiddlewares();
    this.setupHealthRoute();
  }

  private initializeMiddlewares(): void {
    this.app.use(express.json());
    this.app.use(cors(corsWhitelistValidator(this.corsWhitelist)));
    this.app.use(morgan('dev'));
  }

  private setupHealthRoute(): void {
    this.app.use(
      '/health',
      (_request: Request, response: Response): Response => {
        return response.status(200).json({
          message: 'Server is listening and running!',
          status: 200,
          success: true,
        });
      }
    );
  }

  private setupApiRoutes(): void {
    this.app.use('/api', this.apiRoutes);
  }

  public async start(): Promise<void> {
    try {
      await this.database.initializeDB();

      this.setupApiRoutes();

      this.app.listen(this.port, () => {
        console.log(
          '===========================================================\n' +
            '                Server listening and running\n' +
            '===========================================================\n' +
            `              Access the server at port: ${this.port}\n` +
            '==========================================================='
        );
      });

      this.app.get('/', (_request: Request, response: Response): void => {
        return response.redirect('/health');
      });
    } catch (error) {
      console.error(
        '===========================================================\n' +
          '                Could not start the server\n' +
          '===========================================================\n' +
          `Error: ${error}`
      );

      process.exit(1);
    }
  }
}

export default Server;
