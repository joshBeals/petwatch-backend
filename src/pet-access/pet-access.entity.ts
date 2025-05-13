// src/pet-access/pet-access.entity.ts
import {
  Entity, PrimaryGeneratedColumn, ManyToOne, Column,
  CreateDateColumn, UpdateDateColumn,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Pet } from '../pets/pet.entity';
import { PetRole } from './enums/pet-role.enum'; 

@Entity()
export class PetAccess {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => User, user => user.petAccesses, { eager: true })
  user!: User;

  @ManyToOne(() => Pet, pet => pet.accesses, { eager: true })
  pet!: Pet;

  @Column({ type: 'enum', enum: PetRole })
  role!: PetRole;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
