import { Request, Response, NextFunction } from 'express';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

type validationSource = 'body' | 'query' | 'params' | 'headers';

export const validateDto = (dto: any, source: validationSource = 'body') => {
  return async (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> => {
    const data = request[source];

    const instance = plainToInstance(dto, data);

    const errors = await validate(instance, {
      whitelist: true,
      forbidNonWhitelisted: true,
    });

    if (errors.length > 0) {
      const formattedErrors = errors.map((error) => ({
        property: error.property,
        constraints: error.constraints,
      }));

      response.status(400).json({
        message: 'Validación fallida',
        status: 400,
        success: false,
        errors: formattedErrors,
      });

      return;
    }

    next();
  };
};
