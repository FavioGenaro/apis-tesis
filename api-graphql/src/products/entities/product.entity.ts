import { Category } from './category.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ProductSpecs } from "./productSpecs.entity";
import { Brand } from './brand.entity';
import { PurchaseDetail } from 'src/purchase/entities/purchaseDetail';
import { Field, Float, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity('product')
export class Product {

  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column({ type: 'varchar', length: 100, unique: true, nullable: false })
  @Field(() => String)
  sku: string;

  @Column({ type: 'varchar', length: 150, nullable: false })
  @Field(() => String)
  name: string;

  @Column({ type: 'text', nullable: false })
  @Field(() => String)
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  @Field(() => Float)
  price: number;

  @Column({ type: 'int', nullable: false })
  @Field(() => Int)
  stock: number;

  @Column({ type: 'char', length: 3, default: 'USD' })
  @Field(() => String)
  currency: string;

  @Column({ type: 'text', nullable: false })
  @Field(() => String)
  img_src: string;

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
    () => Brand,
    (Brand) => Brand.product,
    { cascade: false, eager: true }
  )
  @JoinColumn({ name: 'id_brand' })
  @Field(() => Brand)
  brand: Brand;

  @ManyToOne(
    () => Category,
    (Category) => Category.products,
    { cascade: false, eager: true }
  )
  @JoinColumn({ name: 'id_category' })
  @Field(() => Category)
  category: Category;
  
  @OneToMany(
    () => ProductSpecs,
    ( productSpecs ) => productSpecs.product,
    { cascade: true, eager: true }
  )
  @Field(() => [ProductSpecs])
  productSpecs: ProductSpecs[]

  @OneToMany(() => PurchaseDetail, 
    (purchaseDetail) => purchaseDetail.product
  )
  purchaseDetail: PurchaseDetail[];

}
