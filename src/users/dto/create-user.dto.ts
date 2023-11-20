import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @Type(() => String)
  @IsString()
  name: string;

  @Type(() => String)
  @IsString()
  @IsOptional()
  logo: string;

  @Type(() => String)
  @IsString()
  address: string;
}
