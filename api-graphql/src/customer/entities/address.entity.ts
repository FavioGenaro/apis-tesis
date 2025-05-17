import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Customer } from "./customer.entity";
import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
@Entity('address')
export class Address {

  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column({ type: 'varchar', length: 150 })
  @Field(() => String)
  street: string;

  @Column({ type: 'varchar', length: 150 })
  @Field(() => String)
  city: string;

  @Column({ type: 'varchar', length: 150 })
  @Field(() => String)
  country: string;

  @Column({ type: 'char', length: 5 })
  @Field(() => String)
  zip: string;

  @Column({ type: 'text', nullable: true })
  @Field(() => String)
  reference: string;

  @Column({ type: 'boolean', default: false })
  @Field(() => Boolean)
  is_default: boolean;

  @Column({ type: 'boolean', default: false })
  @Field(() => Boolean)
  is_eliminated: boolean;

  @CreateDateColumn()
  @Field(() => Date)
  created_at: Date;

  @UpdateDateColumn()
  @Field(() => Date)
  updated_at: Date;

  @ManyToOne(
    () => Customer,
    ( customer ) => customer.addresses,
    {  onDelete: 'CASCADE',  }
  )
  @JoinColumn({ name: 'id_customer' })
  customer: Customer
}
