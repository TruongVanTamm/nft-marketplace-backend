import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {}

  async getUserByAdress(address: string) {
    const item = await this.userRepo.findOne({
      where: { address: address },
    });
    return item;
  }

  async create(createUserDto: CreateUserDto) {
    const item = await this.userRepo.findOne({
      where: { address: createUserDto.address },
    });
    if (item) {
      return;
    } else {
      return await this.userRepo.save(createUserDto);
    }
  }

  async edit(data: UpdateUserDto) {
    const update = new UserEntity();
    update.logo = data.logo;
    update.name = data.name;
    update.description = data.description;
    update.email = data.email;
    update.website = data.website;
    update.facebook = data.facebook;
    update.twitter = data.twitter;
    update.instargram = data.instargram;
    return await this.userRepo.update(data.id, update);
  }
  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
