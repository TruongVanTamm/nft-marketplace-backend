import { Type } from 'class-transformer';
import { IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateNftTokenDto {
  @Type(() => String)
  @IsString()
  name: string;

  @Type(() => String)
  @IsString()
  @IsOptional()
  image: string;

  @Type(() => String)
  @IsString()
  website: string;

  @Type(() => String)
  @IsString()
  description: string;

  @Type(() => String)
  @IsString()
  owner: string;

  @Type(() => Number)
  @IsNumber()
  tokenId: string;

  @Type(() => Number)
  @IsNumber()
  price: string;

  @Type(() => Number)
  @IsNumber()
  category: string;
}
