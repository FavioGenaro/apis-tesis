import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsResolver } from './products.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Category } from './entities/category.entity';
import { ProductSpecs } from './entities/productSpecs.entity';
import { Brand } from './entities/brand.entity';

@Module({
  providers: [ProductsResolver, ProductsService],
  imports: [
    TypeOrmModule.forFeature([Product, Category, ProductSpecs, Brand]),
  ],
  exports: [
    TypeOrmModule
  ]
})
export class ProductsModule {}
