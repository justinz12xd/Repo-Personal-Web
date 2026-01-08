import { PartialType } from '@nestjs/mapped-types';
import { CreateAnimaleDto } from './create-animale.dto';

export class UpdateAnimaleDto extends PartialType(CreateAnimaleDto) {}
