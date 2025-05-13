import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn,
  UpdateDateColumn, OneToMany, ManyToOne
} from 'typeorm';
import { PetAccess } from '../pet-access/pet-access.entity';
import { Species } from './enums/species.enum';
import { User } from '../users/user.entity';

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

  @ManyToOne(() => User, { eager: true })
  owner!: User;

  @OneToMany(() => PetAccess, access => access.pet)
  accesses!: PetAccess[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
