import { IsPrismaCUID } from '@src/core/decorators/is-prisma-cuid.decorator';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({
    message: `El campo 'username' no debe de esta vacío`,
  })
  @Length(3, 20, {
    message: `El campo 'username' debe de tener entre 3 y 20 caracteres`,
  })
  username: string;

  @IsEmail(
    {},
    {
      message: `el campo 'email' debe de tener un formato válido`,
    }
  )
  @IsNotEmpty({
    message: `El campo 'email' no debe de esta vacío`,
  })
  email: string;

  @IsString()
  @IsNotEmpty({
    message: `El campo 'password' username no debe de esta vacío`,
  })
  @Length(8, 20, {
    message: `El campo 'password' debe de tener entre 8 y 20 caracteres`,
  })
  password: string;

  constructor(username: string, email: string, password: string) {
    this.username = username;
    this.email = email;
    this.password = password;
  }
}

export class ValidateIdDto {
  @IsPrismaCUID({
    message: `'id' no tiene un formato válido`,
  })
  @IsNotEmpty({
    message: `El campo 'id' es requerido`,
  })
  id: string;

  constructor(id: string) {
    this.id = id;
  }
}
