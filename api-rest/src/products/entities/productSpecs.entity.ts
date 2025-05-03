import { Product } from "src/products/entities/product.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
@Entity()
export class ProductSpecs {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  // @Column('uuid', {
  //   nullable: true
  // })
  // id_product: string;

  @Column('text', {
    nullable: false
  })
  name: string;

  @Column('text', {
    nullable: false
  })
  value: string;

  @Column('boolean', {
    default: true
  })
  is_active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // @OneToMany(
  //   () => Product,
  //   ( product ) => product.id,
  //   {  onDelete: 'CASCADE' }
  // )
  // product: Product


  @ManyToOne(
    () => Product,
    ( product ) => product.productSpecs,
    {  onDelete: 'CASCADE' }
  )
  @JoinColumn({ name: 'id_product' })
  product: Product

}