import { PrismaClient, User } from '@prisma/client';
import { sendEmail } from '@middlewares/nodemailer.middleware';
import { BadRequestException } from '../shared/bad-request.exception';
import { NotFoundException } from '../shared/not-found.exception';
import { ConflictException } from '../shared/conflict.exception';
import { LoginUserDto, ValidateIdDto } from './user.dto';

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
      `Already exists a user with the username: '${username}' or email: '${email}'`
    );
  }

  return null;
};

export const create = async (createUserDto: LoginUserDto): Promise<User> => {
  const newUser = await prisma.user.create({
    data: {
      username: createUserDto.username,
      email: createUserDto.email,
      password: createUserDto.password,
    },
  });

  return newUser;
};

export const sendEmailAndUpdateUser = async (
  id: string,
  email: string,
  username: string
): Promise<void> => {
  const codeVerification = await sendEmail(email, username);

  if (!codeVerification) {
    throw new BadRequestException(
      'The request could not be processed correctly'
    );
  }

  await prisma.user.update({
    where: {
      id,
    },
    data: {
      codeVerification,
    },
  });
};

export const validateCodeVerificationAndUpdate = async (
  codeVerification: number,
  email: string
) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new NotFoundException('User not found');
  }

  if (user.isVerified) {
    throw new BadRequestException('The user is already verified');
  }

  if (user.codeVerification === codeVerification) {
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        isVerified: true,
        codeVerification: null,
      },
    });
  } else {
    throw new BadRequestException(
      'The code verification is incorrect, please try again'
    );
  }
};
