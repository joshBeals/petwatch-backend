import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pet } from './pet.entity';
import { PetsService } from './pets.service';
import { PetsController } from './pets.controller';
import { PetAccess } from '../pet-access/pet-access.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pet, PetAccess])],
  providers: [PetsService],
  controllers: [PetsController],
})
export class PetsModule {}
