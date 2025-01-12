import { PrismaClient, User } from '@prisma/client';
import {
  sendCodeVerificationEmail,
  sendUserVerifiedEmail,
} from '@middlewares/nodemailer.middleware';
import { BadRequestException } from '../shared/bad-request.exception';
import { NotFoundException } from '../shared/not-found.exception';
import { ConflictException } from '../shared/conflict.exception';
import { registerDto } from './auth.dto';
import { encryptPassword } from '@src/core/middlewares/bcrypt';

const prisma = new PrismaClient();

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
      `A user with the same username or email already exists`
    );
  }

  return null;
};

export const create = async (createUserDto: registerDto): Promise<User> => {
  const hashedPassword = await encryptPassword(createUserDto.password);

  const newUser = await prisma.user.create({
    data: {
      username: createUserDto.username,
      email: createUserDto.email,
      password: hashedPassword,
    },
  });

  return newUser;
};

export const sendEmailAndUpdateUser = async (
  id: string,
  email: string,
  username: string
): Promise<void> => {
  const codeVerification = await sendCodeVerificationEmail(email, username);

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

    await sendUserVerifiedEmail(user.email, user.username);
  } else {
    throw new BadRequestException(
      'The code verification is incorrect, please try again'
    );
  }
};
