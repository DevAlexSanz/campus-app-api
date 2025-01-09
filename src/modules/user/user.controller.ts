import { Request, Response } from 'express';
import { jsonResponse } from '@utils/helpers/json-response.helper';
import { create, findAll, findAlreadyExists, findOne } from './user.service';
import { CreateUserDto } from './user.dto';
import { ConflictException } from '../shared/conflict.exception';
import { NotFoundException } from '../shared/not-found.exception';

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

export const createUser = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const userData = request.body as CreateUserDto;
  try {
    await findAlreadyExists(userData.username, userData.email);

    const newUser = await create(userData);

    return jsonResponse(response, {
      message: 'User was created successfully',
      status: 201,
      success: true,
      data: newUser,
    });
  } catch (error) {
    if (error instanceof ConflictException) {
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
