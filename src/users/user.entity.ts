import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { PetAccess } from '../pet-access/pet-access.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column({ default: false })
  isEmailVerified!: boolean;

  @OneToMany(() => PetAccess, (access: PetAccess) => access.user)
  petAccesses!: PetAccess[];
}
