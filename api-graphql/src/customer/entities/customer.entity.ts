import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@ObjectType()
export class Customer {

  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: number;

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
  @Field(() => String)
  phone: string;

  @Column({ type: 'text', nullable: false })
  @Field(() => String)
  password: string;

  @Column({ type: 'boolean', default: false })
  @Field(() => Boolean)
  is_eliminated: boolean;

  @CreateDateColumn()
  @Field(() => Date)
  created_at: Date;

  @UpdateDateColumn()
  @Field(() => Date)
  updated_at: Date;

}
