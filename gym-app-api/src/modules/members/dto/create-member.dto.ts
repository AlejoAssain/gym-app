import { IsString } from 'class-validator';

// TODO - finish creating DTO
export class CreateMemberDto {
  @IsString()
  firstName: string;

  @IsString()
  middleName: string;

  @IsString()
  lastName: string;

  gender: string;

  dateOfBirth: Date;

  nationalId: string;

  email: string;

  phone: string;

  emergencyContactName: string;

  emergencyContactPhone: string;

  observations: string;

  address: string;
}
