
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pet } from './pet.entity';
import { User } from '../users/user.entity';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';

@Injectable()
export class PetsService {
  constructor(
    @InjectRepository(Pet)
    private readonly petRepository: Repository<Pet>,
  ) {}

  async create(createPetDto: CreatePetDto, owner: User): Promise<Pet> {
    const pet = this.petRepository.create({
      ...createPetDto,
      owner,
    });
    const savedPet = await this.petRepository.save(pet);
    return savedPet;
  }
  

  async findAll(): Promise<Pet[]> {
    return this.petRepository.find();
  }

  async findByOwner(id: string): Promise<Pet[]> {
    const pets = await this.petRepository.find({ 
        where: {
            owner: { id }
        }
    });
    return pets;
  }

  async findOne(id: string): Promise<Pet> {
    const pet = await this.petRepository.findOneBy({ id });
    if (!pet) throw new NotFoundException('Pet not found');
    return pet;
  }

  async update(id: string, updatePetDto: UpdatePetDto): Promise<Pet> {
    const pet = await this.findOne(id);
    Object.assign(pet, updatePetDto);
    return this.petRepository.save(pet);
  }

  async remove(id: string): Promise<void> {
    const result = await this.petRepository.delete(id);
    if (result.affected === 0) throw new NotFoundException('Pet not found');
  }
}
