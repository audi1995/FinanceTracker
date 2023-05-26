import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from "typeorm"
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { Constants } from 'src/utils/constants';
import { request } from 'express';
const saltOrRounds = 10;


@Injectable()
export class UserService {
  constructor(@InjectRepository(User)
  private userRepository: Repository<User>) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.userRepository.findOne({
      where: [{ userName: createUserDto.userName }, { email: createUserDto.email }]
    });
    if (existingUser) {
      throw new Error('Username or email already exists');
    }

    const hashedpassword = await bcrypt.hash(createUserDto.password, saltOrRounds)
    const user: User = this.userRepository.create({
      ...createUserDto,
      password: hashedpassword,
      role: Constants.ROLES.NORMAL_ROLE,
    });
    try {
      const savedUser: User = await this.userRepository.save(user);
      return savedUser;
    } catch (error) {
      throw new Error('Failed to create user');
    }
  }

  findAll() {
    return this.userRepository.find();
  }

  findUserById(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }


  findUserByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email } });
  }

  
  async update(id: number, requser, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findUserById(id);
    if (!user) {
      throw new Error('User not found');
    } else {
      if (user.id !== requser.userId) {
        throw new Error('Unauthorized to update use222r');
      }
      else {
        console.log("hbdcsj");
        
        if (updateUserDto.userName) {
          user.userName = updateUserDto.userName;
        }
        if (updateUserDto.password) {
          const hashedpassword = await bcrypt.hash(updateUserDto.password, saltOrRounds)
          user.password = hashedpassword;
        }
        if (updateUserDto.firstName) {
          user.firstName = updateUserDto.firstName;
        }
        if (updateUserDto.lastname) {
          user.lastname = updateUserDto.lastname;
        }
        if (updateUserDto.email) {
          user.email = updateUserDto.email;
        }
        if (updateUserDto.address) {
          user.address = updateUserDto.address;
        }
        if (updateUserDto.dob) {
          user.dob = updateUserDto.dob;
        }
        if (updateUserDto.gender) {
          user.gender = updateUserDto.gender;
        }
        console.log("user", user);

        try {
          return this.userRepository.save(user);
        } catch (error) {
          throw new Error('Failed to update user');
        }
      }
    }
  }


  async remove(id: number, requser) {
    const user = await this.findUserById(id);
    if (user.id !== requser.userId) {
      throw new Error('Unauthorized to update use222r');
    }
  return this.userRepository.delete({ id });
  }
}

