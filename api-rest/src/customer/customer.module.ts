import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { Address } from './entities/address.entity';

@Module({
  controllers: [CustomerController],
  providers: [CustomerService],
  imports: [
    TypeOrmModule.forFeature([Customer, Address]),
  ],
  exports: [
    TypeOrmModule
  ]
})
export class CustomerModule {}
