import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomerInput } from './dto/create-customer.input';
import { Customer } from './entities/customer.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CustomerService {

  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  async create(createCustomerInput: CreateCustomerInput) {
    const { password, email, ...data } = createCustomerInput;

    const user = await this.customerRepository.findOneBy({email});

    if(user) throw new ConflictException(`Correo ya esta registrado`);

    const customer = this.customerRepository.create({
      ...data,
      email,
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

    const { password, ...data } = customer;

    return data;
  }

}
