import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { UserEntity } from './users/entities/user.entity';
import { MediaModule } from './media/media.module';
import { CategoryModule } from './category/category.module';
import { CategoryEntity } from './category/entities/category.entity';
import { NftTokenModule } from './nft_token/nft_token.module';
import { NftTokenEntity } from './nft_token/entities/nft_token.entity';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'nft_marketplace',
      entities: [UserEntity, CategoryEntity, NftTokenEntity],
      synchronize: true,
    }),
    ConfigModule.forRoot(),
    UsersModule,
    MediaModule,
    CategoryModule,
    NftTokenModule,
    NftTokenModule,
  ],
})
export class AppModule {}
