import { Module } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { PurchaseController } from './purchase.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';
import { PaymentMethod } from './entities/paymentMethod.entity';
import { Status } from './entities/status.entity';
import { Purchase } from './entities/purchase.entity';
import { PurchaseDetail } from './entities/purchaseDetail';

@Module({
  controllers: [PurchaseController],
  providers: [PurchaseService],
  imports: [
    TypeOrmModule.forFeature([Payment, PaymentMethod, Status, Purchase, PurchaseDetail]),
  ],
  exports: [
    TypeOrmModule
  ]
})
export class PurchaseModule {}
