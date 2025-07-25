import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
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

  async create(createCustomerDto: CreateCustomerDto) {
    const { password, email, ...data } = createCustomerDto;

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

    return { data: { customers } };
  }

  async findOne(id: string) {
    const customer = await this.customerRepository.findOneBy({id});

    if(!customer) {
      throw new NotFoundException(`Cliente ${id} no encontrado`);
    }

    const { password, ...data } = customer;

    return { data: { customer: data } };
  }
  
}
