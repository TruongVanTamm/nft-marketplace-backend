import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  logo: string;

  @Column()
  address: string;

  @Column()
  email: string;

  @Column()
  description: string;

  @Column()
  website: string;

  @Column()
  facebook: string;

  @Column()
  twitter: string;

  @Column()
  instargram: string;
}
