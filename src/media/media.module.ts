import { Module } from '@nestjs/common';
import { MediaService } from './service/media.service';
import { MediaController } from './controller/media.controller';
@Module({
  controllers: [MediaController],
  providers: [MediaService],
  exports: [MediaService],
})
export class MediaModule {}
