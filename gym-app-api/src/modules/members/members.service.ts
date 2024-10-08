import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { calculateExpirationDate } from '../membership-plans/utilities';

import { CreateMemberDto, UpdateMemberDto } from './dto';
import { Member } from './entities';
import { MemberNotFoundException } from './exceptions';

@Injectable()
export class MembersService {
  constructor(
    @InjectRepository(Member)
    private readonly membersRepository: Repository<Member>,
  ) {}

  create(createMemberDto: CreateMemberDto) {
    const newMember = this.membersRepository.create(createMemberDto);
    try {
      return this.membersRepository.save(newMember);
    } catch (e) {
      throw new InternalServerErrorException(`Error: ${e.message}`);
    }
  }

  findAll() {
    return this.membersRepository.find();
  }

  async findOne(id: number) {
    const member = await this.membersRepository.findOneBy({
      id: id,
    });

    if (!member) {
      throw new MemberNotFoundException(id);
    }

    return member;
  }

  // TODO - normalize return types
  async checkAccess(nationalId: string) {
    const member = await this.membersRepository.findOne({
      where: { nationalId },
      relations: ['membershipPlan'],
    });

    if (!member) {
      throw new MemberNotFoundException();
    }

    if (!member.membershipPlan && !member.expirationDate) {
      return { message: 'Member has no plan assigned' };
    }

    const today = new Date();
    // Set time to midnight
    today.setUTCHours(0, 0, 0, 0);

    const memberExpirationDate = new Date(member.expirationDate);

    if (memberExpirationDate < today) {
      // pass expired
      return {
        expired: true,
        message: `Pass expired on ${member.expirationDate}`,
        member: member,
      };
    } else {
      return {
        expired: false,
        message: `Pass expires on ${member.expirationDate}`,
        member: member,
      };
    }
  }

  async update(id: number, updateMemberDto: UpdateMemberDto) {
    const member = await this.membersRepository.findOneBy({
      id: id,
    });

    if (!member) {
      throw new MemberNotFoundException(id);
    }

    Object.assign(member, updateMemberDto);

    return this.membersRepository.save(member);
  }

  async remove(id: number) {
    const member = await this.membersRepository.findOneBy({
      id: id,
    });

    if (!member) {
      throw new MemberNotFoundException(id);
    }

    return await this.membersRepository.remove(member);
  }
}
