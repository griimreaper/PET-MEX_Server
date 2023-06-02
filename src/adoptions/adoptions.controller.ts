import { Controller, Post, Body } from '@nestjs/common';
import { AdoptionsService } from './adoptions.service';
import { AdoptionDto } from './dto/adoptions.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Adoptions')
@Controller('adoptions')
export class AdoptionsController {
  constructor(private adoptionsService:AdoptionsService) {}

  @Post()
  adoptPet(@Body() IDS:AdoptionDto) {
    return this.adoptionsService.adopt(IDS);
  }
}
