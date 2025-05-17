import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { PaymentMethod } from "./paymentMethod.entity";
import { Status } from "./status.entity";
import { Purchase } from "./purchase.entity";
import { Field, Float, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
@Entity('payment')
export class Payment {

  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column({ type: 'char', length: 3, default: 'USD' })
  @Field(() => String)
  currency: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  @Field(() => Float)
  amount: number;

  @CreateDateColumn()
  @Field(() => Date)
  processed_at: Date;

  @ManyToOne(
    () => PaymentMethod,
    (paymentMethod) => paymentMethod.payment,
    { cascade: false, eager: true }
  )
  @JoinColumn({ name: 'id_payment_method' })
  @Field(() => PaymentMethod)
  payment_method: PaymentMethod;

  @ManyToOne(
    () => Status,
    (status) => status.payments,
    { cascade: false, eager: true }
  )
  @JoinColumn({ name: 'id_status' })
  @Field(() => Status)
  status: Status;

  @ManyToOne(
    () => Purchase,
    (purchase) => purchase.payments,
    {  onDelete: 'CASCADE' }
  )
  @JoinColumn({ name: 'id_purchase' })
  purchase: Purchase;

}