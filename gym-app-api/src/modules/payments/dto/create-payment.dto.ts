import { Type } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

import { PaymentMethodsEnum } from '../enums';

export class CreatePaymentDto {
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsEnum(PaymentMethodsEnum)
  @IsNotEmpty()
  paymentMethod: string;

  @IsString()
  @IsOptional()
  transactionId?: string;

  // TODO - check where and how to handle payment status
  // @IsEnum(PaymentStatusEnum)
  // status: string;

  @IsNumber()
  @IsNotEmpty()
  memberId: number;

  @IsNumber()
  @IsNotEmpty()
  membershipPlanId: number;
}
