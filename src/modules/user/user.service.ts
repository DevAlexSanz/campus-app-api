import { PrismaClient, User } from '@prisma/client';
import { CreateUserDto, ValidateIdDto } from './user.dto';
import { ConflictException } from '../shared/conflict.exception';
import { NotFoundException } from '../shared/not-found.exception';

const prisma = new PrismaClient();

export const findAll = async (): Promise<User[]> => {
  const users = await prisma.user.findMany();

  return users;
};

export const findOne = async (
  validateIdDto: ValidateIdDto
): Promise<User | null> => {
  const user = await prisma.user.findUnique({
    where: {
      id: validateIdDto.id,
    },
  });

  if (!user) {
    throw new NotFoundException(
      `User with id: '${validateIdDto.id}' not found`
    );
  }

  return user;
};

export const findAlreadyExists = async (
  username: string,
  email: string
): Promise<User | null> => {
  const user = await prisma.user.findFirst({
    where: {
      OR: [
        {
          username,
        },
        {
          email,
        },
      ],
    },
  });

  if (user) {
    throw new ConflictException(
      `Ya existe un usuario con ese 'username' o 'email'`
    );
  }

  return null;
};

export const create = async (createUserDto: CreateUserDto): Promise<User> => {
  const newUser = await prisma.user.create({
    data: {
      username: createUserDto.username,
      email: createUserDto.email,
      password: createUserDto.password,
    },
  });

  return newUser;
};
