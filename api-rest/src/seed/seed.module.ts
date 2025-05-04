import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { ProductsModule } from 'src/products/products.module';
import { CustomerModule } from 'src/customer/customer.module';
import { PurchaseModule } from 'src/purchase/purchase.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [ProductsModule, CustomerModule, PurchaseModule]
})
export class SeedModule {}
