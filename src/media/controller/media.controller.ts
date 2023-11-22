import { Post, Controller, Get, Body, Query, Delete } from '@nestjs/common';
import { MediaService } from '../service/media.service';

@Controller('media')
export class MediaController {
  constructor(private readonly mediaFileService: MediaService) {}
  // get link of private file
  // @UseGuards(AuthGuard('api-key'))
  @Get('access')
  async getLinkAccess(@Query('key') key: string) {
    const url = this.mediaFileService.getLinkMediaKey(key);
    return {
      url: url,
    };
  }

  @Post('create-folder')
  async createFolder(@Body() folderName: string, @Body() pathname: string) {
    return await this.mediaFileService.createFolder(folderName, pathname);
  }

  // delete file
  @Delete('delete')
  async delete(@Body('params') params: any) {
    await this.mediaFileService.deleteFileS3(params);
    return true;
  }
}
