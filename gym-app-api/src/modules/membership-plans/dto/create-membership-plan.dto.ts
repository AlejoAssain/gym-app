import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CurrencyEnum } from '../../../enums';
import { PeriodEnum } from '../enums';

export class CreateMembershipPlanDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsEnum(CurrencyEnum)
  @IsNotEmpty()
  currency: string;

  @IsEnum(PeriodEnum)
  period: string;
}
