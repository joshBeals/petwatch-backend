import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PetsModule } from './pets/pets.module';
import { PetAccessModule } from './pet-access/pet-access.module';

import { User } from './users/user.entity';
import { Pet } from './pets/pet.entity';
import { PetAccess } from './pet-access/pet-access.entity';
import { ProfileController } from './profile.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432'),
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_NAME || 'petwatch',
      entities: [User, Pet, PetAccess],
      synchronize: true, // ⚠️ Disable in production
    }),
    UsersModule,
    AuthModule,
    PetsModule,
    PetAccessModule,
  ],
  controllers: [ProfileController],
})
export class AppModule {}
