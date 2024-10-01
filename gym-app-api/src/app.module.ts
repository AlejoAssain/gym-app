import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EmployeesModule } from './modules/employees/employees.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { MembershipPlansModule } from './modules/membership-plans/membership-plans.module';
import { MembersModule } from './modules/members/members.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.db',
      autoLoadEntities: true,
      synchronize: true,
    }),
    EmployeesModule,
    PaymentsModule,
    MembershipPlansModule,
    MembersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  static port: number;

  constructor(private readonly configService: ConfigService) {
    AppModule.port = +this.configService.get('PORT');
  }
}
