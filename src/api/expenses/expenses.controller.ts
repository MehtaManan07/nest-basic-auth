import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import {
  CreateExpenseBulkDto,
  CreateExpenseDto,
} from './dto/create-expense.dto';
import { JwtAuthGuard } from '../auth/guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('expenses')
@ApiTags('expenses')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Post()
  create(@Body() createExpenseDto: CreateExpenseDto, @Req() req: any) {
    return this.expensesService.create(createExpenseDto, +req.user.id);
  }

  @Post('bulk')
  createBulk(@Body() createExpenseDto: CreateExpenseBulkDto, @Req() req: any) {
    return this.expensesService.createBulk(createExpenseDto, +req.user.id);
  }

  @Get('category/:id')
  getExpenseByCategory(@Param('id') id: string, @Req() req: any) {
    return this.expensesService.getExpenseByCategory(+req.user.id, +id);
  }

  @Get('me')
  findAll(@Req() req: any) {
    return this.expensesService.findAll(+req.user.id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.expensesService.remove(+id);
  }
}
