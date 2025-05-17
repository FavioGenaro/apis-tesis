import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Product } from "src/products/entities/product.entity";
import { Purchase } from "./purchase.entity";
import { Field, Float, ID, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
@Entity('purchase_detail')
export class PurchaseDetail {

  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column({ type: 'int', nullable: false })
  @Field(() => Int)
  quantity: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  @Field(() => Float)
  sale_price: number;

  @Column({ type: 'boolean', default: false })
  @Field(() => Boolean, { defaultValue: false })
  is_eliminated: boolean;
  
  @CreateDateColumn()
  @Field(() => Date)
  created_at: Date;

  @UpdateDateColumn()
  @Field(() => Date)
  updated_at: Date;

  @Column({ type: 'uuid' })
  @Field(() => ID)
  id_product: number;

  @ManyToOne(
    () => Product,
    (product) => product.id,
    {  onDelete: 'CASCADE' }
  )
  @JoinColumn({ name: 'id_product' })
  product: Product;

  @ManyToOne(
    () => Purchase,
    (purchase) => purchase.id,
    {  onDelete: 'CASCADE' }
  )
  @JoinColumn({ name: 'id_purchase' })
  purchase: Purchase;

}