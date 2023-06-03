import { Controller, Post, Body, Get, HttpCode } from '@nestjs/common';
import { AnimalsService } from './animals.service';
import { AnimalDto } from './dto/animals.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Animals')
@Controller('animals')
export class AnimalsController {
  constructor(private animalsService: AnimalsService) {}

  @Get()
  allPets() {
    return this.animalsService.getPets();
  }

  @HttpCode(201)
  @Post()
  createPet(@Body() pet:AnimalDto):Promise<string> {
    return this.animalsService.postPet(pet);
  }
}
