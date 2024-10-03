import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateBoardDto {
    @IsNotEmpty()
    @IsString()
    title: String;
    @IsNotEmpty()
    @IsString()
    background: String;
    @IsNotEmpty()
    @IsString()
    dashboardIcon: String;
}
