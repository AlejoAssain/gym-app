import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateMemberDto, UpdateMemberDto } from './dto';
import { Member } from './entities/member.entity';
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
