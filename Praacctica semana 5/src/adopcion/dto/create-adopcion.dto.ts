import { IsString } from "class-validator";


export class CreateAdopcionDto {
    @IsString()
    estado: string;
}
