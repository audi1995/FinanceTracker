import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport"
import { Strategy } from "passport-local"
import { User } from "src/user/entities/user.entity";
import { UserService } from '../../user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private userService: UserService) {
        super({
            usernameField: "email",
            passwordField: "password"
        })
    }

    async validate(email: string, password: string): Promise<User> {
        const user: User = await this.userService.findUserByEmail(email);

        if (!user) {
            throw new UnauthorizedException("User not found: " + email);
        }

        const isPasswordMatch = await bcrypt.compareSync(password, user.password);

        if (!isPasswordMatch) {
            throw new UnauthorizedException("Invalid password");
        }

        return user;
    }
}