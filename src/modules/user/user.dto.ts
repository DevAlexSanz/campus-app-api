import { IsPrismaCUID } from '@decorators/is-prisma-cuid.decorator';
import { IsNotEmpty } from 'class-validator';

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
