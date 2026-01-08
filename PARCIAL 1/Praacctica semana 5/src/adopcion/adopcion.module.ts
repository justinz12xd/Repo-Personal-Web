import { Module } from '@nestjs/common';
import { AdopcionService } from './adopcion.service';
import { AdopcionController } from './adopcion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Adopcion } from './entities/adopcion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Adopcion])],
  controllers: [AdopcionController],
  providers: [AdopcionService],
})
export class AdopcionModule {}
