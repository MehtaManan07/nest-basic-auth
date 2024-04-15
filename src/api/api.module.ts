import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { loggingMiddleware, PrismaModule } from 'nestjs-prisma';
import { CategoriesModule } from './categories/categories.module';
import { ExpensesModule } from './expenses/expenses.module';

@Module({
  imports: [
    PrismaModule.forRoot({
      isGlobal: true,
      prismaServiceOptions: {
        explicitConnect: true,
        middlewares: [loggingMiddleware()],
      },
    }),
    AuthModule,
    UsersModule,
    CategoriesModule,
    ExpensesModule,
  ],
  exports: [AuthModule, UsersModule],
})
export class ApiModule {}
