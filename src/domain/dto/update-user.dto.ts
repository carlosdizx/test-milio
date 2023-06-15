import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, MinLength } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
