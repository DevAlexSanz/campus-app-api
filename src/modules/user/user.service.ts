import { PrismaClient, User } from '@prisma/client';
import { NotFoundException } from '../shared/not-found.exception';
import { ValidateIdDto } from './user.dto';

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
      `User not found`
    );
  }

  return user;
};
