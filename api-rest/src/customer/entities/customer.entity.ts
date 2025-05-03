import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Address } from './address.entity';
import { Purchase } from "src/purchase/entities/purchase.entity";

@Entity('customer')
export class Customer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  first_name: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  last_name: string;

  @Column({ type: 'varchar', length: 150, unique: true, nullable: false })
  email: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  phone: string;

  @Column({ type: 'text', nullable: false })
  password: string;

  @Column({ type: 'boolean', default: false })
  is_eliminated: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(
    () => Purchase,
    ( purchase ) => purchase.customer,
    { cascade: true, eager: true }
  )
  purchases: Purchase[]

  @OneToMany(
    () => Address,
    (address) => address.customer,
    { cascade: true, eager: true }
  )
  addresses: Address[];
}
