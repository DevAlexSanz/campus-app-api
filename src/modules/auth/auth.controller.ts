import { Request, Response } from 'express';
import { jsonResponse } from '@utils/helpers/json-response.helper';
import {
  create,
  findAlreadyExists,
  sendEmailAndUpdateUser,
  validateCodeVerificationAndUpdate,
} from './auth.service';
import { registerDto } from './auth.dto';
import { BadRequestException } from '../shared/bad-request.exception';
import { NotFoundException } from '../shared/not-found.exception';
import { ConflictException } from '../shared/conflict.exception';

export const register = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const { username, email, password } = request.body as registerDto;

  try {
    await findAlreadyExists(username, email);

    const newUser = await create({ username, email, password });

    await sendEmailAndUpdateUser(newUser.id, newUser.email, newUser.username);

    return jsonResponse(response, {
      message: 'User registered and email sent successfully',
      status: 201,
      success: true,
    });
  } catch (error) {
    if (
      error instanceof ConflictException ||
      error instanceof BadRequestException
    ) {
      return jsonResponse(response, {
        message: error.message,
        status: error.status,
        success: error.success,
      });
    }

    return jsonResponse(response, {
      message: 'Internal Server Error',
      status: 500,
      success: false,
    });
  }
};

export const verifyAccount = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const { codeVerification, email } = request.body;

  try {
    await validateCodeVerificationAndUpdate(codeVerification, email);

    return jsonResponse(response, {
      message: 'Account verified successfully',
      status: 200,
      success: true,
    });
  } catch (error) {
    if (
      error instanceof NotFoundException ||
      error instanceof BadRequestException
    ) {
      return jsonResponse(response, {
        message: error.message,
        status: error.status,
        success: error.success,
      });
    }

    return jsonResponse(response, {
      message: 'Internal Server Error',
      status: 500,
      success: false,
    });
  }
};
