import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { MembersService } from '../members/members.service';
import { MembershipPlansService } from '../membership-plans/membership-plans.service';
import { CreatePaymentDto } from './dto';
import { Payment } from './entities';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentsRepository: Repository<Payment>,
    private readonly membersService: MembersService,
    private readonly membershipPlansService: MembershipPlansService,
  ) {}

  async create(createPaymentDto: CreatePaymentDto) {
    const newPayment = this.paymentsRepository.create({
      amount: createPaymentDto.amount,
      transactionId: createPaymentDto.transactionId,
      paymentMethod: createPaymentDto.paymentMethod,
    });

    newPayment.membershipPlan = await this.membershipPlansService.findOne(
      createPaymentDto.membershipPlanId,
    );

    const expirationDate = this.membershipPlansService.getExpirationDate(
      newPayment.membershipPlan,
    );

    newPayment.member = await this.membersService.update(
      createPaymentDto.memberId,
      {
        expirationDate,
      },
    );

    return await this.paymentsRepository.save(newPayment);
  }

  findAll() {
    return this.paymentsRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} payment`;
  }

  remove(id: number) {
    return `This action removes a #${id} payment`;
  }
}
