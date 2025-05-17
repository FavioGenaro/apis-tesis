import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Category } from './entities/category.entity';
import { ProductSpecs } from './entities/productSpecs.entity';
import { Brand } from './entities/brand.entity';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  imports: [
    TypeOrmModule.forFeature([Product, Category, ProductSpecs, Brand]),
  ],
  exports: [
    TypeOrmModule
  ]
})
export class ProductsModule {}
