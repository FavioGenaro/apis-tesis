import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Payment } from "./payment.entity";
import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
@Entity('payment_method')
export class PaymentMethod {

  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  @Field(() => String)
  name: string;

  @Column({ type: 'text', nullable: true })
  @Field(() => String, { nullable: true })
  description: string | null;

  @Column({ type: 'boolean', default: false })
  @Field(() => Boolean, { defaultValue: false })
  is_eliminated: boolean;

  @CreateDateColumn()
  @Field(() => Date)
  created_at: Date;

  @UpdateDateColumn()
  @Field(() => Date)
  updated_at: Date;

  @OneToMany(
    () => Payment,
    ( payment ) => payment.payment_method,
    {  onDelete: 'CASCADE' }
  )
  payment: Payment[]

}