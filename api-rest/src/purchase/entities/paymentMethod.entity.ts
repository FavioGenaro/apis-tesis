import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Payment } from "./payment.entity";
@Entity()
export class PaymentMethod {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  name: string;

  @Column({ type: 'text', nullable: false })
  description: string;

  @Column({ type: 'boolean', default: false })
  is_eliminated: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(
    () => Payment,
    ( payment ) => payment.payment_method,
    {  onDelete: 'CASCADE' }
  )
  payment: Payment[]

}