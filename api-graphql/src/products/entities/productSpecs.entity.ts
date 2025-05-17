import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Product } from "src/products/entities/product.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@ObjectType()
@Entity('product_specs')
export class ProductSpecs {

  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  @Field(() => String)
  name: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  @Field(() => String)
  value: string;

  @Column({ type: 'boolean', default: false })
  @Field(() => Boolean, { defaultValue: false })
  is_eliminated: boolean;

  @CreateDateColumn()
  @Field(() => Date)
  created_at: Date;

  @UpdateDateColumn()
  @Field(() => Date)
  updated_at: Date;

  @ManyToOne(
    () => Product,
    ( product ) => product.productSpecs,
    {  onDelete: 'CASCADE' }
  )
  @JoinColumn({ name: 'id_product' })
  product: Product

}