import express, {
  Application,
  Router,
  Request,
  Response,
  NextFunction,
} from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { corsWhitelistValidator } from '@utils/validators/cors-whitelist.validator';

export const createServer = (
  app: Application,
  port: number,
  corsWhitelist: string[],
  apiRoutes: Router
) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors(corsWhitelistValidator(corsWhitelist)));
  app.use(morgan('dev'));

  app.use(
    (
      error: Error,
      _request: Request,
      response: Response,
      next: NextFunction
    ): void => {
      if (error instanceof SyntaxError && 'body' in error) {
        response.status(400).json({
          message: 'Invalid JSON payload passed.',
          status: 400,
          success: false,
        });
      } else {
        next(error);
      }
    }
  );

  const server = app.listen(port, () => {
    console.log(
      '===========================================================\n' +
        '                Server listening and running\n' +
        '===========================================================\n' +
        `              Access the server at port: ${port}\n` +
        '==========================================================='
    );
  });

  app.use('/api', apiRoutes);

  app.get('/', (_request: Request, response: Response): void => {
    response.redirect('/health');
  });

  app.use('/health', (_request: Request, response: Response): Response => {
    return response.status(200).json({
      message: 'Server is listening and running!',
      status: 200,
      success: true,
    });
  });

  return server;
};
