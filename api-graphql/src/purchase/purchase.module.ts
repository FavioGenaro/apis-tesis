import { Module } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { PurchaseResolver } from './purchase.resolver';

@Module({
  providers: [PurchaseResolver, PurchaseService],
})
export class PurchaseModule {}
