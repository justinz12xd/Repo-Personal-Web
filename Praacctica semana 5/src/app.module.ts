import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Animal } from './animales/entities/animale.entity';
import { ConfigModule } from '@nestjs/config';
import { AnimalesModule } from './animales/animales.module';
import { AdopcionModule } from './adopcion/adopcion.module';
import { Adopcion } from './adopcion/entities/adopcion.entity';


@Module({
  imports: [ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'test',
      entities: [Animal, Adopcion],
      synchronize: true,
    }), AnimalesModule, AdopcionModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
