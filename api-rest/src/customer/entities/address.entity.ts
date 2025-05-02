import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


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

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
