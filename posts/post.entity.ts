import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @Column({ nullable: true })
  imageUrl: string;

  @Column()
  userId: number;
}