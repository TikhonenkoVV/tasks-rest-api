import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateColumnDto {
    @IsNotEmpty()
    @IsString()
    title: String;

    @IsNotEmpty()
    @IsNumber()
    index: Number;

    @IsNotEmpty()
    @IsString()
    owner: String;
}
