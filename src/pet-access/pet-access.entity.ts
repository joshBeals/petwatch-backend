import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Pet } from '../pets/pet.entity';

@Entity()
export class PetAccess {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, (user: User) => user.petAccesses)
  user!: User;

  @ManyToOne(() => Pet, (pet: Pet) => pet.petAccesses)
  pet!: Pet;

  @Column()
  role!: 'owner' | 'family' | 'sitter';

  @Column({ type: 'timestamp', nullable: true })
  expiresAt!: Date | null;
}
