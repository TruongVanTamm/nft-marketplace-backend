import { PartialType } from '@nestjs/mapped-types';
import { CreateNftTokenDto } from './create-nft_token.dto';

export class UpdateNftTokenDto extends PartialType(CreateNftTokenDto) {}
