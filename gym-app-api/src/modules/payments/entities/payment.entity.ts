import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Member } from '../../members/entities/member.entity';
import { MembershipPlan } from '../../membership-plans/entities/membership-plan.entity';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amount: number;

  // TODO - use enum payment method
  @Column()
  paymentMethod: string;

  @Column()
  transactionId: string;

  // TODO - use enum payment status and check how to handle status
  // @Column()
  // status: string;

  @ManyToOne(() => Member, (member) => member.payments, { nullable: false })
  member: Member;

  @ManyToOne(
    () => MembershipPlan,
    (membershipPlan) => membershipPlan.payments,
    { nullable: false },
  )
  membershipPlan: MembershipPlan;

  @CreateDateColumn()
  createdAt: Date;
}
