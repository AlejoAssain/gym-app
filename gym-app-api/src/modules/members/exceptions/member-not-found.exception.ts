import { NotFoundException } from '@nestjs/common';

export class MemberNotFoundException extends NotFoundException {
  constructor(memberId?: number) {
    super(
      memberId
        ? `Member with id '${memberId}' does not exists!`
        : 'Member does not exists!',
    );
  }
}
