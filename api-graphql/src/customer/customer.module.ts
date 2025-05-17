import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerResolver } from './customer.resolver';
import { Customer } from './entities/customer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from './entities/address.entity';

@Module({
  providers: [CustomerResolver, CustomerService],
  imports: [
    TypeOrmModule.forFeature([Customer, Address]),
  ],
  exports: [
    TypeOrmModule
  ]
})
export class CustomerModule {}
