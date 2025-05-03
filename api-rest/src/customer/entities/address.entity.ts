import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Customer } from "./customer.entity";
@Entity('address')
export class Address {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 150 })
  street: string;

  @Column({ type: 'varchar', length: 150 })
  city: string;

  @Column({ type: 'varchar', length: 150 })
  country: string;

  @Column({ type: 'char', length: 5 })
  zip: string;

  @Column({type: 'text', nullable: true})
  reference: string;

  @Column({
    type: 'bool',
    default: false
  })
  is_default: boolean;

  @ManyToOne(
    () => Customer,
    ( customer ) => customer.addresses,
    {  onDelete: 'CASCADE',  }
  )
  @JoinColumn({ name: 'id_customer' })
  customer: Customer

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
