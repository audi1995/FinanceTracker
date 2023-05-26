
import { Injectable, CanActivate, ExecutionContext, Inject, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/user/entities/user.entity';
import { Constants } from 'src/utils/constants';


@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor( private readonly jwtService: JwtService) {
        super();
    }
    async canActivate(context: ExecutionContext): Promise<any> {
        const request = context.switchToHttp().getRequest();
        const token = request.headers.authorization?.split(' ')[1];
        for (let x = 0; x < Constants.By_pass_url.length; x++) {
            if (request.url == Constants.By_pass_url[x])
                return true;
        }
        if (token) {
            try {
                const user = await this.jwtService.verifyAsync<User>(token)
                request.user = user;
                return true;
            } catch (err) {
                throw new UnauthorizedException("jwt expired")
            }
        }
        else {
            return super.canActivate(context);
    }
    }

}

