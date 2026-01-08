import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AnimalesService } from './animales.service';
import { CreateAnimaleDto } from './dto/create-animale.dto';
import { UpdateAnimaleDto } from './dto/update-animale.dto';

@Controller('animales')
export class AnimalesController {
  constructor(private readonly animalesService: AnimalesService) {}

  @Post()
  create(@Body() createAnimaleDto: CreateAnimaleDto) {
    return this.animalesService.create(createAnimaleDto);
  }

  @Get()
  findAll() {
    return this.animalesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.animalesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAnimaleDto: UpdateAnimaleDto) {
    return this.animalesService.update(id, updateAnimaleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.animalesService.remove(id);
  }
}
