import { Product } from "src/products/entities/product.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
@Entity('brand')
export class Brand {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  name: string;

  @Column({ type: 'boolean', default: false })
  is_eliminated: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(
    () => Product,
    ( product ) => product.brand,
    {  onDelete: 'CASCADE' }
  )
  product: Product[]

}
