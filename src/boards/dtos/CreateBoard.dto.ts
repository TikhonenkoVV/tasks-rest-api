import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBoardDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    background: string;

    @IsNotEmpty()
    @IsString()
    dashboardIcon: string;
}
