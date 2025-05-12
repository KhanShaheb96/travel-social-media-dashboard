import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SavedDestination {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  destination: string;

  @Column()
  userId: number;
}