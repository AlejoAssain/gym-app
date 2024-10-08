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

  @Column({ nullable: true })
  middleName: string;

  @Column()
  lastName: string;

  // TODO - use gender enum
  @Column()
  gender: string;

  @Column({ type: 'date' })
  dateOfBirth: string;

  @Column({ unique: true })
  nationalId: string;

  @Column({ unique: true, nullable: true })
  email: string;

  @Column()
  phone: string;

  @Column({ nullable: true })
  emergencyContactName: string;

  @Column({ nullable: true })
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

  @Column({ type: 'date', nullable: true })
  expirationDate: string;

  @OneToMany(() => Payment, (payment) => payment.member)
  payments: Payment[];

  @Column({ type: 'date', nullable: true })
  joinDate: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
