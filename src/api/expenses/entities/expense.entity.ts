import { ApiProperty } from '@nestjs/swagger';
import { Expense } from '@prisma/client';
import { CategoryEntity } from 'src/api/categories/entities/category.entity';

export class ExpenseEntity implements Expense {
  constructor(partial: Partial<ExpenseEntity>) {
    Object.assign(this, partial);
  }
  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  isDeleted: boolean;

  @ApiProperty()
  id: number;

  @ApiProperty()
  amount: number;

  @ApiProperty()
  categoryId: number;

  @ApiProperty()
  date: Date;

  @ApiProperty()
  userId: number;

  @ApiProperty()
  category?: Partial<CategoryEntity>;
}
