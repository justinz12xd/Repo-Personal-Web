import { IsString, IsNumber, IsEmpty, IsAlpha, isString } from "class-validator";

export class CreateAnimaleDto {
    @IsString()
    nombre: string;

    @IsString()
    edad: string;

    @IsString()
    estado: string;

    @IsString()
    descripcion: string;

    @IsEmpty()
    fotos: string;

    @IsString()
    estado_adopcion: string;
}
