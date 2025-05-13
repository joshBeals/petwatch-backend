
import { IsEnum, IsNotEmpty, IsOptional, IsString, IsDateString } from 'class-validator';
import { Species } from '../enums/species.enum';

export class CreatePetDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsEnum(Species)
  species!: Species;

  @IsString()
  @IsOptional()
  breed?: string;

  @IsDateString()
  @IsOptional()
  birthdate?: string;
}
