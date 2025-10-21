import { Module } from '@nestjs/common';
import { AnimalesService } from './animales.service';
import { AnimalesController } from './animales.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Animal } from './entities/animale.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Animal])],
  controllers: [AnimalesController],
  providers: [AnimalesService],
})
export class AnimalesModule {}
