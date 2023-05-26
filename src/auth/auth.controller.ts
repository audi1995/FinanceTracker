import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Req,
    UseGuards
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { AuthGuard } from '@nestjs/passport';


@Controller('auth')
export class AuthController {
    constructor(private jwtService: JwtService) { }

    @Post('/login')
    @UseGuards(AuthGuard("local"))
    async login(@Req() req: { user: User, body: { password: string } }) {
        const user: User = req.user;
        
        const isPasswordMatch = await bcrypt.compareSync(req.body.password, user.password);
        if (!isPasswordMatch) {
            throw new Error('Invalid password');
        }
        const payload = {
            userId: user.id,
            firstName: user.firstName,
            lastName: user.lastname,
            email: user.email,
            role: user.role
        };
        return { token: this.jwtService.sign(payload) };
    }


}