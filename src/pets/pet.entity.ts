import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { PetAccess } from '../pet-access/pet-access.entity';

@Entity()
export class Pet {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  species!: string;

  @OneToMany(() => PetAccess, (access: PetAccess) => access.pet)
  petAccesses!: PetAccess[];
}
