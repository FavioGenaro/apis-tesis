import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Address } from './address.entity';
import { Purchase } from 'src/purchase/entities/purchase.entity';

@ObjectType()
@Entity('customer')
export class Customer {

  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  @Field(() => String)
  first_name: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  @Field(() => String)
  last_name: string;

  @Column({ type: 'varchar', length: 150, unique: true, nullable: false })
  @Field(() => String)
  email: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  @Field(() => String, { nullable: true })
  phone: string;

  @Column({ type: 'text', nullable: false })
  password: string;

  @Column({ type: 'boolean', default: false })
  @Field(() => Boolean, { defaultValue: false })
  is_eliminated: boolean;

  @CreateDateColumn()
  @Field(() => Date)
  created_at: Date;

  @UpdateDateColumn()
  @Field(() => Date)
  updated_at: Date;

  @Field(() => [Address])
  @OneToMany(
    () => Address,
    (address) => address.customer,
    { cascade: true, eager: true }
  )
  addresses: Address[];

  @OneToMany(
    () => Purchase,
    ( purchase ) => purchase.customer,
    {  onDelete: 'CASCADE' }
  )
  purchases: Purchase[]
}
