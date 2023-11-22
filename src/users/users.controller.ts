import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { MediaService } from 'src/media/service/media.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly mediaService: MediaService,
  ) {}

  @Get('infor')
  getUserByAdress(@Query('address') address: string) {
    return this.usersService.getUserByAdress(address);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @UseInterceptors(FileInterceptor('logo'))
  @Post('edit')
  async edit(@UploadedFile() logo: any, @Body('dataRequest') dataRequest: any) {
    let logoUrl: any;
    const dataParse = JSON.parse(dataRequest);
    if (logo) {
      const key = `user/logo-${Date.now()}`;
      const uploadResult = await this.mediaService.uploadFileS3(
        logo.buffer,
        key,
        logo.mimetype,
      );
      logoUrl = uploadResult.Key;
    }
    if (logoUrl) {
      dataParse.logo = logoUrl;
    }
    return this.usersService.edit(dataParse);
  }
}
