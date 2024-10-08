import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MembersModule } from '../members/members.module';
import { MembershipPlansModule } from '../membership-plans/membership-plans.module';
import { Payment } from './entities';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Payment]),
    MembersModule,
    MembershipPlansModule,
  ],
  controllers: [PaymentsController],
  providers: [PaymentsService],
})
export class PaymentsModule {}
