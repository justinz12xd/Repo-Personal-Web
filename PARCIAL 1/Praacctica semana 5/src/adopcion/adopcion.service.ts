import { Injectable } from '@nestjs/common';
import { CreateAdopcionDto } from './dto/create-adopcion.dto';
import { UpdateAdopcionDto } from './dto/update-adopcion.dto';
import { NotFoundError } from 'rxjs';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Adopcion } from './entities/adopcion.entity';


@Injectable()
export class AdopcionService {
    constructor(
      @InjectRepository(Adopcion)
      private readonly adopcionRepository: Repository<Adopcion>,
    ){}

  async create(createAdopcionDto: CreateAdopcionDto) {
    return await this.adopcionRepository.save(createAdopcionDto);
  }

  async findAll() {
    return this.adopcionRepository.find();
  }

  async findOne(id_adopcion: string) {
    return this.adopcionRepository.findOneBy({id_adopcion});
  }

  async update(id_adopcion: string, updateAdopcionDto: UpdateAdopcionDto) {
    const adopcionEncontrada = await this.adopcionRepository.findOneBy({id_adopcion});
    if (!adopcionEncontrada){
      throw new NotFoundError('Animal No encontrado')
    }
    await this.adopcionRepository.update(id_adopcion, updateAdopcionDto)
    return await this.adopcionRepository.findOneBy({id_adopcion})
  }

  async remove(id: string) {
    const adopcionEncontrada= await this.adopcionRepository.delete({id_adopcion:id});
    
  }
}
