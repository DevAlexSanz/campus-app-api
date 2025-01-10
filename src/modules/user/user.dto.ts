import { IsPrismaCUID } from '@decorators/is-prisma-cuid.decorator';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
} from 'class-validator';

export class LoginUserDto {
  @IsString()
  @IsNotEmpty({
    message: `The 'username' field must not be empty`,
  })
  @Length(3, 20, {
    message: `The 'username' field must be between 3 and 20 characters`,
  })
  username: string;

  @IsEmail(
    {},
    {
      message: `The 'email' field must be a valid email address`,
    }
  )
  @IsNotEmpty({
    message: `The 'email' field must not be empty`,
  })
  email: string;

  @IsString()
  @IsNotEmpty({
    message: `The 'password' field must not be empty`,
  })
  @Length(8, 20, {
    message: `The 'password' field must be between 8 and 20 characters`,
  })
  password: string;

  constructor(username: string, email: string, password: string) {
    this.username = username;
    this.email = email;
    this.password = password;
  }
}

export class VerifyUserDto {
  @IsEmail(
    {},
    {
      message: `The 'email' field must be a valid email address`,
    }
  )
  @IsNotEmpty({
    message: `The 'email' field must not be empty`,
  })
  email: string;

  @IsNumber(
    {},
    {
      message: `The 'codeVerification' field must be a number`,
    }
  )
  @IsNotEmpty({
    message: `The 'codeVerification' field must not be empty`,
  })
  codeVerification: number;

  constructor(email: string, codeVerification: number) {
    this.email = email;
    this.codeVerification = codeVerification;
  }
}

export class ValidateIdDto {
  @IsPrismaCUID({
    message: `The 'id' field must be a valid Prisma CUID`,
  })
  @IsNotEmpty({
    message: `The 'id' field must not be empty`,
  })
  id: string;

  constructor(id: string) {
    this.id = id;
  }
}
