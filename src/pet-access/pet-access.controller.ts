import {
    Controller,
    Get,
    Post,
    Patch,
    Delete,
    Body,
    Param,
    UseGuards,
  } from '@nestjs/common';
  import { AuthGuard } from '@nestjs/passport';
  import { PetAccessService } from './pet-access.service';
  import { CreatePetAccessDto } from './dto/create-pet-acccess.dto';
  import { UpdatePetAccessDto } from './dto/update-pet-access.dto';
  import { CurrentUser } from '../auth/decorators/current-user.decorator';
  import { User } from '../users/user.entity';
  
  @UseGuards(AuthGuard('jwt'))
  @Controller('pet-access')
  export class PetAccessController {
    constructor(private readonly accessService: PetAccessService) {}
  
    @Post()
    create(
      @Body() dto: CreatePetAccessDto,
      @CurrentUser() user: User,
    ) {
      return this.accessService.create(dto, user);
    }
  
    @Get()
    findAll() {
      return this.accessService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.accessService.findOne(id);
    }
  
    @Patch(':id')
    update(
      @Param('id') id: string,
      @Body() dto: UpdatePetAccessDto,
    ) {
      return this.accessService.update(id, dto);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.accessService.remove(id);
    }
  }
  