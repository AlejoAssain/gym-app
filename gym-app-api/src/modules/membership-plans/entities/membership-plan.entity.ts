import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Member } from '../../members/entities';
import { Payment } from '../../payments/entities';

@Entity()
export class MembershipPlan {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column()
  price: number;

  // TODO - use currency enum
  @Column()
  currency: string;

  // TODO - use period enum
  @Column()
  period: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relations
  @OneToMany(() => Member, (member) => member.membershipPlan)
  members: Member[];

  @OneToMany(() => Payment, (payment) => payment.membershipPlan)
  payments: Payment[];
}
