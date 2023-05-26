import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsString, IsEmail, IsDate, IsInt } from 'class-validator';

export class UpdateUserDto{
    @IsString()
    userName?: string;
  
    @IsString()
    firstName?: string;
  
    @IsString()
    lastname?: string;
  
    @IsEmail()
    email?: string;
  
    @IsString()
    password?: string;
  
    @IsString()
    address?: string;
  
    @IsDate()
    dob?: Date;
  
    @IsString()
    gender?: string;
  
    @IsInt()
    monthly_savings_target?: number;
  
}
