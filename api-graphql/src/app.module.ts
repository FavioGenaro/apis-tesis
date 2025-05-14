import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { CustomerModule } from './customer/customer.module';
import { PurchaseModule } from './purchase/purchase.module';

@Module({
  imports: [ProductsModule, CustomerModule, PurchaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
