import { ObjectType, Field, Int } from '@nestjs/graphql';
import { JoinColumn, ManyToOne } from 'typeorm';
import { Brand } from './brand.entity';

@ObjectType()
export class Product {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;

  @ManyToOne(
    () => Brand,
    (Brand) => Brand.product,
    { cascade: false, eager: true }
  )
  @JoinColumn({ name: 'id_brand' })
  brand: Brand;
}
