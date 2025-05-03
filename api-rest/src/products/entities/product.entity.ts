import { Category } from './category.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ProductSpecs } from "./productSpecs.entity";
import { Brand } from './brand.entity';
import { PurchaseDetail } from 'src/purchase/entities/purchaseDetail';

@Entity('product')
export class Product {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100, unique: true, nullable: false })
  sku: string;

  @Column({ type: 'varchar', length: 150, nullable: false })
  name: string;

  @Column({ type: 'text', nullable: false })
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  price: number;

  @Column({ type: 'int', nullable: false })
  stock: number;

  @Column({ type: 'char', length: 3, default: 'USD' })
  currency: string;

  @Column({ type: 'text', nullable: false })
  img_src: string;

  @Column({ type: 'boolean', default: false })
  is_eliminated: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(
    () => Brand,
    (Brand) => Brand.product,
    { cascade: false, eager: true }
  )
  @JoinColumn({ name: 'id_brand' })
  brand: Brand;

  @ManyToOne(
    () => Category,
    (Category) => Category.products,
    { cascade: false, eager: true }
  )
  @JoinColumn({ name: 'id_category' })
  category: Category;
  
  @OneToMany(
    () => ProductSpecs,
    ( productSpecs ) => productSpecs.product,
    { cascade: true, eager: true }
  )
  productSpecs: ProductSpecs[]

  @OneToMany(() => PurchaseDetail, 
    (purchaseDetail) => purchaseDetail.product // ! CAMBIAR POR ID?
  )
  purchaseDetail: PurchaseDetail[];
}
