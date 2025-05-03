import { Product } from "src/products/entities/product.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
@Entity()
export class Category {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {
    nullable: false
  })
  name: string;

  @Column('boolean', {
    default: true
  })
  is_active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(
    () => Product,
    ( product ) => product.id,
    {  onDelete: 'CASCADE' }
  )
  product: Product[]

}