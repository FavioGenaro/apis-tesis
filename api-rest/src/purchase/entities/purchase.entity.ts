import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Status } from "./status.entity";
import { Customer } from "src/customer/entities/customer.entity";
import { Payment } from "./payment.entity";
import { PurchaseDetail } from "./purchaseDetail";

@Entity('purchase')
export class Purchase {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'char', length: 3, default: 'USD' })
  currency: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  total_cost: number;

  @Column({ type: 'boolean', default: false })
  is_eliminated: boolean;
  
  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ type: 'uuid'})
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
  status: Status;

  @OneToMany(
    () => Payment,
    (payment) => payment.purchase,
    { cascade: true, eager: true }
  )
  payments: Payment[];

  @OneToMany(() => PurchaseDetail, 
    (purchaseDetail) => purchaseDetail.purchase,
    { cascade: true, eager: true }
  )
  purchaseDetail: PurchaseDetail[];
}