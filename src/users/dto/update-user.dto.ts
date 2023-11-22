import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @Type(() => Number)
  @IsNumber()
  id: number;

  @Type(() => String)
  @IsString()
  email: string;

  @Type(() => String)
  @IsString()
  description: string;

  @Type(() => String)
  @IsString()
  website: string;

  @Type(() => String)
  @IsString()
  facebook: string;

  @Type(() => String)
  @IsString()
  twitter: string;

  @Type(() => String)
  @IsString()
  instargram: string;
}
