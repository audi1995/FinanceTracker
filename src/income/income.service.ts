import { Injectable } from '@nestjs/common';
import { CreateIncomeDto } from './dto/create-income.dto';
import { UpdateIncomeDto } from './dto/update-income.dto';
import { Income } from './entities/income.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class IncomeService {
  constructor(@InjectRepository(Income)
  private incomeRepository: Repository<Income>) { }


  async create(createIncomeDto: CreateIncomeDto, requser) {
    try {
      console.log(requser.userId);

      const income: Income = this.incomeRepository.create({
        ...createIncomeDto,
        user: requser.userId
      });

      const savedincome: Income = await this.incomeRepository.save(income);
      return savedincome;
    } catch (error) {

      throw new Error('Failed to create Income');
    }
  }

  findAll() {
    return `This action returns all income`;
  }

  findUserById(incomeId: number) {
    return this.incomeRepository.findOne({where: {incomeId}, relations: ['user']});
  }



  async update(id: number, updateIncomeDto: UpdateIncomeDto, requser): Promise<Income> {
    const income = await this.findUserById(id);
    console.log("income", income);
    if (!income) {
      throw new Error('User not found');
    } else {
      console.log(income.user)
      if (income.user.id !== requser.userId) {
        throw new Error('Unauthorized to update use222r');
      }
      else {
      if (updateIncomeDto.salary) {
        income.salary = updateIncomeDto.salary;
      }
      if (updateIncomeDto.otherIncome) {
        income.otherIncome = updateIncomeDto.otherIncome;
      }
      try {
        return this.incomeRepository.save(income);
      } 
      catch (error) {
        throw new Error('Failed to update user');
      }
    }}}


  remove(id: number) {
    return `This action removes a #${id} income`;
  }
}
