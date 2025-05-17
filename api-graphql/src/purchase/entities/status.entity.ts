import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Payment } from "./payment.entity";
import { Purchase } from "./purchase.entity";
import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
@Entity('status')
export class Status {

  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  @Field(() => String)
  name: string;

  @Column({ type: 'enum', nullable: false, enum: ['Purchase', 'Payment'] })
  @Field(() => String)
  type: string;

  @Column({ type: 'boolean', default: false })
  @Field(() => Boolean)
  is_eliminated: boolean;

  @CreateDateColumn()
  @Field(() => Date)
  created_at: Date;

  @UpdateDateColumn()
  @Field(() => Date)
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