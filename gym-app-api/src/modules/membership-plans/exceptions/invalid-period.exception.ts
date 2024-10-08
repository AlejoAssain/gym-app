import { BadRequestException } from '@nestjs/common';

export class InvalidPeriodException extends BadRequestException {
  constructor(invalidPeriod?: string) {
    super(
      invalidPeriod
        ? `Invalid membership period '${invalidPeriod}'`
        : 'Invalid membership period',
    );
  }
}