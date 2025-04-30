
import { Category } from './category.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ProductSpecs } from "./productSpecs.entity";
import { Brand } from './brand.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid', {
    nullable: true
  })
  id_category: string | null;

  @Column('uuid', {
    nullable: false
  })
  id_brand: string;

  @Column('text', {
    unique: true
  })
  sku: string;

  @Column('text', {
    nullable: false
  })
  name: string;

  @Column('text', {
    nullable: false
  })
  description: string;

  // Definimos un campo para la relación de 1 a muchos
  @ManyToOne(
    () => Brand,
    (Brand) => Brand.id,
    { cascade: false, eager: true }
  )
  @JoinColumn({ name: 'id_brand' })
  brand: Brand;

  @ManyToOne(
    () => Category,
    (Category) => Category.id,
    { cascade: false, eager: true }
  )
  @JoinColumn({ name: 'id_category' })
  category: Category | null;
  
  @OneToMany(
    () => ProductSpecs,
    ( productSpecs ) => productSpecs.product,
    { cascade: true, eager: true }
  )
  // @JoinColumn({ name: 'id_category' })
  productSpecs: ProductSpecs[]
  
  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
