import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('nft-token')
export class NftTokenEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  tokenId: string;

  @Column()
  owner: string;

  @Column()
  image: string;

  @Column()
  website: string;

  @Column()
  description: string;

  @Column()
  price: string;

  @Column()
  category: string;
}
