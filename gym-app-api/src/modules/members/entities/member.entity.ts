import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { MembershipPlan } from '../../membership-plans/entities/membership-plan.entity';
import { Payment } from '../../payments/entities/payment.entity';

@Entity()
export class Member {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  middleName: string;

  @Column()
  lastName: string;

  // TODO - use gender enum
  @Column()
  gender: string;

  @Column({ type: 'date' })
  dateOfBirth: Date;

  @Column({ unique: true })
  nationalId: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  phone: string;

  @Column()
  emergencyContactName: string;

  @Column()
  emergencyContactPhone: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  observations: string;

  @Column()
  address: string;

  @Column({ default: false })
  active: boolean;

  @ManyToOne(() => MembershipPlan, (membershipPlan) => membershipPlan.members, {
    nullable: true,
  })
  membershipPlan: MembershipPlan;

  @OneToMany(() => Payment, (payment) => payment.member)
  payments: Payment[];

  @Column({ type: 'date' })
  joinDate: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
