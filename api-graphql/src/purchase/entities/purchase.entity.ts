import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Status } from "./status.entity";
import { Customer } from "src/customer/entities/customer.entity";
import { Payment } from "./payment.entity";
import { PurchaseDetail } from "./purchaseDetail";
import { Field, Float, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
@Entity('purchase')
export class Purchase {

  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column({ type: 'char', length: 3, default: 'USD' })
  @Field(() => String)
  currency: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  @Field(() => Float)
  total_cost: number;

  @Column({ type: 'boolean', default: false })
  @Field(() => Boolean, { defaultValue: false })
  is_eliminated: boolean;
  
  @CreateDateColumn()
  @Field(() => Date)
  created_at: Date;

  @UpdateDateColumn()
  @Field(() => Date)
  updated_at: Date;

  @Column({ type: 'uuid'})
  @Field(() => ID)
  id_customer: string;

  @ManyToOne(
    () => Customer,
    (customer) => customer.purchases,
    {  onDelete: 'CASCADE' }
  )
  @JoinColumn({ name: 'id_customer' })
  customer: Customer;

  @ManyToOne(
    () => Status,
    (status) => status.purchases,
    { cascade: false, eager: true }
  )
  @JoinColumn({ name: 'id_status' })
  @Field(() => Status)
  status: Status;

  @OneToMany(
    () => Payment,
    (payment) => payment.purchase,
    { cascade: true, eager: true }
  )
  @Field(() => [Payment])
  payments: Payment[];

  @OneToMany(() => PurchaseDetail, 
    (purchaseDetail) => purchaseDetail.purchase,
    { cascade: true, eager: true }
  )
  @Field(() => [PurchaseDetail])
  purchaseDetail: PurchaseDetail[];
}