import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { NftTokenService } from './nft_token.service';
import { CreateNftTokenDto } from './dto/create-nft_token.dto';
import { UpdateNftTokenDto } from './dto/update-nft_token.dto';

@Controller('nft-token')
export class NftTokenController {
  constructor(private readonly nftTokenService: NftTokenService) {}

  @Post()
  create(@Body() createNftTokenDto: CreateNftTokenDto) {
    return this.nftTokenService.create(createNftTokenDto);
  }

  @Get()
  findAll() {
    return this.nftTokenService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.nftTokenService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateNftTokenDto: UpdateNftTokenDto,
  ) {
    return this.nftTokenService.update(+id, updateNftTokenDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.nftTokenService.remove(+id);
  }
}
