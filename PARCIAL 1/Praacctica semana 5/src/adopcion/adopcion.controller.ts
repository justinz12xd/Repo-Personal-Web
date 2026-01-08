import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AdopcionService } from './adopcion.service';
import { CreateAdopcionDto } from './dto/create-adopcion.dto';
import { UpdateAdopcionDto } from './dto/update-adopcion.dto';

@Controller('adopcion')
export class AdopcionController {
  constructor(private readonly adopcionService: AdopcionService) {}

  @Post()
  create(@Body() createAdopcionDto: CreateAdopcionDto) {
    return this.adopcionService.create(createAdopcionDto);
  }

  @Get()
  findAll() {
    return this.adopcionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adopcionService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdopcionDto: UpdateAdopcionDto) {
    return this.adopcionService.update(id, updateAdopcionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adopcionService.remove(id);
  }
}
