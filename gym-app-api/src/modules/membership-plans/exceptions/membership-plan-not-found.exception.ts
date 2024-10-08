import { NotFoundException } from '@nestjs/common';

export class MembershipPlanNotFoundException extends NotFoundException {
  constructor(membershipPlanId?: number) {
    super(
      membershipPlanId
        ? `Membership plan with id ${membershipPlanId} not found`
        : `Membership plan not found`,
    );
  }
}
