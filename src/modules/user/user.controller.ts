import { Request, Response } from 'express';
import {
  findAll,
  findOne,
} from './user.service';
import { NotFoundException } from '../shared/not-found.exception';
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
