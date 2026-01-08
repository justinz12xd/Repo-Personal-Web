import { PartialType } from '@nestjs/mapped-types';
import { CreateAdopcionDto } from './create-adopcion.dto';

export class UpdateAdopcionDto extends PartialType(CreateAdopcionDto) {}
