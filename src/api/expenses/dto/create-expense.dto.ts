import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreateExpenseDto {
  @IsNumber({ maxDecimalPlaces: 2 })
  amount: number;

  @IsNumber()
  categoryId: number;
}

export class CreateExpenseBulkDto {
  @ApiProperty({ type: [CreateExpenseDto] })
  expenses: CreateExpenseDto[];
}
