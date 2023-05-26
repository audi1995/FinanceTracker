import { IsPhoneNumber, IsDateString, IsEmail, IsInt, IsString } from "class-validator";

export class CreateUserDto {
    @IsString()
    userName: string;

    @IsString()
    firstName: string;

    @IsString()
    lastname: string;

    @IsEmail()
    email: string;

    @IsString()
    password: string;

    @IsString()
    address: string;

    @IsDateString({ strict: true }, { message: 'dob must be a valid ISO 8601 date string' })
    dob: string;

    @IsString()
    gender: string;

    @IsInt()
    monthly_savings_target: number;

}
