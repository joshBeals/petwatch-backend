import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Patch,
    Delete,
    UseGuards,
  } from '@nestjs/common';
  import { AuthGuard } from '@nestjs/passport';
  import { PetsService } from './pets.service';
  import { CreatePetDto } from './dto/create-pet.dto';
  import { UpdatePetDto } from './dto/update-pet.dto';
  import { CurrentUser } from '../auth/decorators/current-user.decorator';
  import { User } from '../users/user.entity';
  
  @UseGuards(AuthGuard('jwt'))
  @Controller('pets')
  export class PetsController {
    constructor(private readonly petsService: PetsService) {}
  
    @Post()
    create(
        @Body() createPetDto: CreatePetDto,
        @CurrentUser() user: User,
    ) {
        return this.petsService.create(createPetDto, user);
    }
  
    @Get()
    findAll() {
      return this.petsService.findAll();
    }

    @Get('mine')
    getMyPets(@CurrentUser() user: User) {
        return this.petsService.findByOwner(user.id);
    }
  
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.petsService.findOne(id);
    }
  
    @Patch(':id')
    update(
      @Param('id') id: string,
      @Body() updatePetDto: UpdatePetDto,
    ) {
      return this.petsService.update(id, updatePetDto);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.petsService.remove(id);
    }
  }
  