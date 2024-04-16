import { Injectable } from '@nestjs/common';
import {
  CreateExpenseBulkDto,
  CreateExpenseDto,
} from './dto/create-expense.dto';
import { PrismaService } from 'nestjs-prisma';
import { ExpenseEntity } from './entities/expense.entity';

@Injectable()
export class ExpensesService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createExpenseDto: CreateExpenseDto, userId: number) {
    const { amount, categoryId } = createExpenseDto;
    await this.prisma.expense.create({
      data: {
        amount,
        userId: userId,
        date: new Date(),
        categoryId: categoryId,
      },
    });
    return;
  }

  async createBulk(createExpenseBulkDto: CreateExpenseBulkDto, userId: number) {
    const { expenses } = createExpenseBulkDto;
    const expensesData = expenses.map((expense) => {
      const { amount, categoryId } = expense;
      return {
        amount,
        userId: userId,
        date: new Date(),
        categoryId: categoryId,
      };
    });
    await this.prisma.expense.createMany({ data: expensesData });
    return;
  }

  async findAll(userId: number) {
    const expensesDoc = await this.prisma.expense.findMany({
      where: { userId },
      include: { category: { select: { name: true, id: true } } },
      orderBy: { date: 'desc' },
    });
    const expenses = expensesDoc.map((expense) => new ExpenseEntity(expense));
    return expenses;
  }

  async getExpenseByCategory(userId: number, categoryId: number) {
    const expensesDoc = await this.prisma.expense.findMany({
      where: { AND: [{ userId }, { categoryId }] },
    });
    const expenses = expensesDoc.map((expense) => new ExpenseEntity(expense));
    return expenses;
  }

  async remove(id: number) {
    await this.prisma.expense.update({
      where: { id },
      data: { isDeleted: true },
    });
    return;
  }
}
