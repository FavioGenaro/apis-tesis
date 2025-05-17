import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Product } from "src/products/entities/product.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@ObjectType()
@Entity('category')
export class Category {

  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  @Field(() => String)
  name: string;

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
    () => Product,
    ( product ) => product.category,
    {  onDelete: 'CASCADE' }
  )
  products: Product[]

}