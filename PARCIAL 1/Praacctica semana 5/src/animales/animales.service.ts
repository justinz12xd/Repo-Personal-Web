import { Injectable } from '@nestjs/common';
import { CreateAnimaleDto } from './dto/create-animale.dto';
import { UpdateAnimaleDto } from './dto/update-animale.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Animal } from './entities/animale.entity';
import { NotFoundError } from 'rxjs';


@Injectable()
export class AnimalesService {
  constructor(
    @InjectRepository(Animal)
    private readonly animalesRepository: Repository<Animal>,
  ){}

  async create(createAnimaleDto: CreateAnimaleDto) {
    return await this.animalesRepository.save(createAnimaleDto);
    
  }

 async  findAll() {
    return this.animalesRepository.find();
  }

 async findOne(id_animal: string) {
    const animalEncontrado = await this.animalesRepository.findOneBy({id_animal});
    if (!animalEncontrado){
      throw new NotFoundError('Animal No encontrado')
    }
    return animalEncontrado;
  }

  async update(id_animal: string, updateAnimaleDto: UpdateAnimaleDto) {
    const animalEncontrado = await this.animalesRepository.findOneBy({id_animal});
    if (!animalEncontrado){
      throw new NotFoundError('Animal No encontrado')
    }
    await this.animalesRepository.update(id_animal, updateAnimaleDto)
    return await this.animalesRepository.findOneBy({id_animal})
  }

  async remove(id_animal: string) {
    const animalEncontrado= await this.animalesRepository.delete({id_animal})
  }
}
