import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, NotFoundException, Query, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { request } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('add')
  create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @UseGuards(RoleGuard)
  findAll() {
    return this.userService.findAll();
  }

  @Get('email')
  findUserByEmail(@Param('email') email: string) {
    return this.userService.findUserByEmail(email);
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
   return this.userService.findUserById(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto,  @Req()req) {
   const requser = await  req.user;   
    return this.userService.update(+id, requser ,updateUserDto);
  }

  @Delete(':id')
  @UseGuards(RoleGuard)
  async remove(@Param('id') id: string, @Req()req) {
    const requser = await  req.user
    return this.userService.remove(+id, requser);
  }
  }


