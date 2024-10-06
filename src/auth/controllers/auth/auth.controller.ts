import {
    Body,
    Controller,
    Get,
    HttpStatus,
    Post,
    Req,
    Res,
    UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthDto } from 'src/auth/dtos/Auth.dto';
import { AuthService } from 'src/auth/services/auth/auth.service';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { RefreshTokenGuard } from 'src/common/guards/refreshToken.guard';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';

@Controller('api/auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('register')
    signup(@Body() createUserDto: CreateUserDto) {
        return this.authService.signUp(createUserDto);
    }

    @Post('login')
    signIn(@Body() authDto: AuthDto) {
        return this.authService.signIn(authDto);
    }

    @Get('google')
    @UseGuards(AccessTokenGuard)
    @Get('logout')
    logout(@Req() req: Request, @Res() res: Response) {
        res.status(204).json({ message: 'Logout' });

        this.authService.logout(req.user['sub']);
    }

    @UseGuards(RefreshTokenGuard)
    @Get('refresh')
    refreshTokens(@Req() req: Request) {
        const userId = req.user['sub'];
        const refreshToken = req.user['refreshToken'];
        return this.authService.refreshTokens(userId, refreshToken);
    }

    @UseGuards(AccessTokenGuard)
    @Get('current')
    getCurrent(@Req() req: Request) {
        return this.authService.getCurrentUser(req.user['email']);
    }
}
