
import { PartialType } from '@nestjs/mapped-types';
import { CreatePetAccessDto } from './create-pet-acccess.dto'; 

export class UpdatePetAccessDto extends PartialType(CreatePetAccessDto) {}
