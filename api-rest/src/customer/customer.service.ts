import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CustomerService {

  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    const { password, ...data } = createCustomerDto;

    const customer = this.customerRepository.create({
      ...data,
      password: bcrypt.hashSync( password, 10 )
    });

    const saved = await this.customerRepository.save( customer );

    return this.findOne(saved.id)
  }

  async findAll() {
    const customers = await this.customerRepository.find();

    return customers;
  }

  async findOne(id: string) {
    const customer = await this.customerRepository.findOneBy({id});
    
    if(!customer) {
      throw new NotFoundException(`Cliente ${id} no encontrado`);
    }

    return customer;
  }

  // update(id: number, updateCustomerDto: UpdateCustomerDto) {
  //   return `This action updates a #${id} customer`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} customer`;
  // }
}
