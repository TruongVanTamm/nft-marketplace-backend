import { Injectable } from '@nestjs/common';
import { CreateNftTokenDto } from './dto/create-nft_token.dto';
import { UpdateNftTokenDto } from './dto/update-nft_token.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NftTokenEntity } from './entities/nft_token.entity';

@Injectable()
export class NftTokenService {
  constructor(
    @InjectRepository(NftTokenEntity)
    private readonly nftTokenRepo: Repository<NftTokenEntity>,
  ) {}

  async create(createNftTokenDto: CreateNftTokenDto) {
    const data = new NftTokenEntity();
    data.name = createNftTokenDto.name;
    data.image = createNftTokenDto.image;
    data.tokenId = createNftTokenDto.tokenId;
    data.owner = createNftTokenDto.owner;
    data.description = createNftTokenDto.description;
    data.price = createNftTokenDto.price;
    data.category = createNftTokenDto.category;
    return await this.nftTokenRepo.save(data);
  }

  findAll() {
    return `This action returns all nftToken`;
  }

  findOne(id: number) {
    return `This action returns a #${id} nftToken`;
  }

  update(id: number, updateNftTokenDto: UpdateNftTokenDto) {
    return `This action updates a #${id} nftToken`;
  }

  remove(id: number) {
    return `This action removes a #${id} nftToken`;
  }
}
