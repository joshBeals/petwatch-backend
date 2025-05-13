import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PetAccess } from './pet-access.entity';
import { PetAccessService } from './pet-access.service';
import { PetAccessController } from './pet-access.controller';
import { User } from '../users/user.entity';
import { Pet } from '../pets/pet.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PetAccess, User, Pet])],
  providers: [PetAccessService],
  controllers: [PetAccessController],
})
export class PetAccessModule {}
