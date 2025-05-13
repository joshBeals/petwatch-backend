
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PetAccess } from './pet-access.entity';
import { CreatePetAccessDto } from './dto/create-pet-acccess.dto';
import { UpdatePetAccessDto } from './dto/update-pet-access.dto';
import { User } from '../users/user.entity';
import { Pet } from '../pets/pet.entity';

@Injectable()
export class PetAccessService {
  constructor(
    @InjectRepository(PetAccess)
    private readonly accessRepository: Repository<PetAccess>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Pet)
    private readonly petRepository: Repository<Pet>,
  ) {}

  async create(dto: CreatePetAccessDto, requester: User): Promise<PetAccess> {
    const user = await this.userRepository.findOneBy({ id: dto.userId });
    const pet = await this.petRepository.findOne({
      where: { id: dto.petId },
      relations: ['owner'],
    });
  
    if (!user || !pet) {
      throw new NotFoundException('User or Pet not found');
    }
  
    if (pet.owner.id !== requester.id) {
      throw new Error('Only the pet owner can assign access.');
    }
  
    const access = this.accessRepository.create({
      user,
      pet,
      role: dto.role,
    });
  
    return this.accessRepository.save(access);
  }
  

  async findAll(): Promise<PetAccess[]> {
    return this.accessRepository.find();
  }

  async findOne(id: string): Promise<PetAccess> {
    const access = await this.accessRepository.findOneBy({ id });
    if (!access) throw new NotFoundException('PetAccess not found');
    return access;
  }

  async update(id: string, dto: UpdatePetAccessDto): Promise<PetAccess> {
    const access = await this.findOne(id);

    if (dto.userId) {
      const user = await this.userRepository.findOneBy({ id: dto.userId });
      if (!user) throw new NotFoundException('User not found');
      access.user = user;
    }

    if (dto.petId) {
      const pet = await this.petRepository.findOneBy({ id: dto.petId });
      if (!pet) throw new NotFoundException('Pet not found');
      access.pet = pet;
    }

    if (dto.role) {
      access.role = dto.role;
    }

    return this.accessRepository.save(access);
  }

  async remove(id: string): Promise<void> {
    const result = await this.accessRepository.delete(id);
    if (result.affected === 0) throw new NotFoundException('PetAccess not found');
  }
}
