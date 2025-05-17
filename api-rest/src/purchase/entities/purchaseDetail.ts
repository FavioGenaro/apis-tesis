import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Product } from "src/products/entities/product.entity";
import { Purchase } from "./purchase.entity";

@Entity('purchase_detail')
export class PurchaseDetail {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'int', nullable: false })
  quantity: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  sale_price: number;

  @Column({ type: 'boolean', default: false })
  is_eliminated: boolean;
  
  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ type: 'uuid', nullable: true})
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