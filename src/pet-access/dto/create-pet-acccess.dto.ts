
import { IsEnum, IsUUID } from 'class-validator';
import { PetRole } from '../enums/pet-role.enum';

export class CreatePetAccessDto {
  @IsUUID()
  userId!: string;

  @IsUUID()
  petId!: string;

  @IsEnum(PetRole)
  role!: PetRole;
}
