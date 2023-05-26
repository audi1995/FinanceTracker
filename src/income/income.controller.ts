import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { IncomeService } from './income.service';
import { CreateIncomeDto } from './dto/create-income.dto';
import { UpdateIncomeDto } from './dto/update-income.dto';

@Controller('income')
export class IncomeController {
  constructor(private readonly incomeService: IncomeService) {}

  @Post()
  async create(@Body() createIncomeDto: CreateIncomeDto, @Req()req) {
    const requser = await  req.user
    return this.incomeService.create( createIncomeDto, requser);
  }

  @Get()
  findAll() {
    return this.incomeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.incomeService.findUserById(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateIncomeDto: UpdateIncomeDto, @Req() req) {
    const requser = await req.user;
    return this.incomeService.update(+id, updateIncomeDto, requser);
  }


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.incomeService.remove(+id);
  }
}
