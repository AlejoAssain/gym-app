import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateMembershipPlanDto, UpdateMembershipPlanDto } from './dto';
import { MembershipPlan } from './entities';
import { PeriodEnum } from './enums';
import { MembershipPlanNotFoundException } from './exceptions';
import { InvalidPeriodException } from './exceptions/invalid-period.exception';
import { calculateExpirationDate } from './utilities';

@Injectable()
export class MembershipPlansService {
  constructor(
    @InjectRepository(MembershipPlan)
    private readonly membershipsRepository: Repository<MembershipPlan>,
  ) {}

  getExpirationDate(membershipPlan: MembershipPlan) {
    const expirationDate = calculateExpirationDate(
      membershipPlan.period as PeriodEnum,
    );

    if (!expirationDate) {
      throw new InvalidPeriodException();
    }

    return expirationDate;
  }

  async create(createMembershipPlanDto: CreateMembershipPlanDto) {
    const newMembershipPlan = this.membershipsRepository.create({
      ...createMembershipPlanDto,
    });

    return this.membershipsRepository.save(newMembershipPlan);
  }

  findAll() {
    return this.membershipsRepository.find();
  }

  async findOne(id: number) {
    const membershipPlan = await this.membershipsRepository.findOneBy({ id });

    if (!membershipPlan) {
      throw new MembershipPlanNotFoundException(id);
    }

    return membershipPlan;
  }

  async update(id: number, updateMembershipPlanDto: UpdateMembershipPlanDto) {
    const membershipPlan = await this.membershipsRepository.findOneBy({ id });

    if (!membershipPlan) {
      throw new MembershipPlanNotFoundException(id);
    }

    Object.assign(membershipPlan, updateMembershipPlanDto);

    return this.membershipsRepository.save(membershipPlan);
  }

  remove(id: number) {
    return `This action removes a #${id} membershipPlan`;
  }
}
