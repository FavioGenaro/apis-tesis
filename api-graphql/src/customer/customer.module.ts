import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerResolver } from './customer.resolver';
import { Customer } from './entities/customer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [CustomerResolver, CustomerService],
  imports: [
    TypeOrmModule.forFeature([Customer]),
  ],
  exports: [
    TypeOrmModule
  ]
})
export class CustomerModule {}
