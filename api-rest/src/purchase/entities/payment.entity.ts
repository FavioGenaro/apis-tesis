import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { PaymentMethod } from "./paymentMethod.entity";
import { Status } from "./status.entity";
import { Purchase } from "./purchase.entity";

@Entity('payment')
export class Payment {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'char', length: 3, default: 'USD' })
  currency: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  amount: number;

  @CreateDateColumn()
  processed_at: Date;

  @ManyToOne(
    () => PaymentMethod,
    (paymentMethod) => paymentMethod.payment,
    { cascade: false, eager: true }
  )
  @JoinColumn({ name: 'id_payment_method' })
  payment_method: PaymentMethod;

  @ManyToOne(
    () => Status,
    (status) => status.payments,
    { cascade: false, eager: true }
  )
  @JoinColumn({ name: 'id_status' })
  status: Status;

  @ManyToOne(
    () => Purchase,
    (purchase) => purchase.payments, // ! CAMBIAR POR ID?
    {  onDelete: 'CASCADE' }
  )
  @JoinColumn({ name: 'id_purchase' })
  purchase: Purchase;

}