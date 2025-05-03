import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Payment } from "./payment.entity";
import { Purchase } from "./purchase.entity";

@Entity('status')
export class Status {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  name: string;

  @Column({ type: 'enum', nullable: false, enum: ['Purchase', 'Payment'] })
  type: string;

  @Column({ type: 'boolean', default: false })
  is_eliminated: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(
    () => Payment,
    ( payment ) => payment.status,
    {  onDelete: 'CASCADE' }
  )
  payments: Payment[];

  @OneToMany(
    () => Purchase,
    ( purchase ) => purchase.status,
    {  onDelete: 'CASCADE' }
  )
  purchases: Purchase[]
}