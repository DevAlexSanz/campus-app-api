import { Response } from 'express';

export const jsonResponse = (
  response: Response,
  {
    message,
    status,
    success,
    data,
  }: {
    message?: string;
    status: number;
    success: boolean;
    data?: any;
  }
): Response => {
  return response.status(status).json({
    message,
    status,
    success,
    data,
  });
};
