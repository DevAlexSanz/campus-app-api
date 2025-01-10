import { Request, Response } from 'express';
import { LoginUserDto } from './user.dto';
import {
  create,
  findAll,
  findAlreadyExists,
  findOne,
  sendEmailAndUpdateUser,
  validateCodeVerificationAndUpdate,
} from './user.service';
import { BadRequestException } from '../shared/bad-request.exception';
import { NotFoundException } from '../shared/not-found.exception';
import { ConflictException } from '../shared/conflict.exception';
import { jsonResponse } from '@utils/helpers/json-response.helper';

export const getAllUsers = async (
  _request: Request,
  response: Response
): Promise<Response> => {
  try {
    const users = await findAll();

    return jsonResponse(response, {
      status: 200,
      success: true,
      data: users,
    });
  } catch (error) {
    return jsonResponse(response, {
      message: 'Internal Server Error',
      status: 500,
      success: false,
    });
  }
};

export const getUserById = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const { id } = request.params;
  try {
    const user = await findOne({ id });

    return jsonResponse(response, {
      message: 'User was found',
      status: 200,
      success: true,
      data: user,
    });
  } catch (error) {
    if (error instanceof NotFoundException) {
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

export const registerUser = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const userData = request.body as LoginUserDto;
  try {
    await findAlreadyExists(userData.username, userData.email);

    const newUser = await create(userData);

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

export const verifyUser = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const { codeVerification, email } = request.body;

  try {
    await validateCodeVerificationAndUpdate(codeVerification, email);

    return jsonResponse(response, {
      message: 'User verified successfully',
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
