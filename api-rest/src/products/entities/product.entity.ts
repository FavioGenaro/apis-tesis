import { Brand } from "src/brand/entities/brand.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // @Column('uuid', {
  //   nullable: false
  // })
  // id_category: string;

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

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
