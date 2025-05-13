
import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn,
  UpdateDateColumn, OneToMany,
} from 'typeorm';
import { PetAccess } from '../pet-access/pet-access.entity';
import { Species } from './enums/species.enum';

@Entity()
export class Pet {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column({ type: 'enum', enum: Species })
  species!: Species;

  @Column({ nullable: true })
  breed?: string;

  @Column({ type: 'date', nullable: true })
  birthdate?: Date;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @OneToMany(() => PetAccess, access => access.pet)
  accesses!: PetAccess[];
}
