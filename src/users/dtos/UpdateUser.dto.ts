// import { IsString } from 'class-validator';

import { IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    theme?: string;

    @IsOptional()
    @IsString()
    avatarURL?: string;

    @IsString()
    refreshToken: string;
}
