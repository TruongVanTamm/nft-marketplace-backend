import { Module } from '@nestjs/common';
import { NftTokenService } from './nft_token.service';
import { NftTokenController } from './nft_token.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NftTokenEntity } from './entities/nft_token.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NftTokenEntity])],
  controllers: [NftTokenController],
  providers: [NftTokenService],
})
export class NftTokenModule {}
