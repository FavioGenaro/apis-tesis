import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/products/entities/product.entity';
import { Repository } from 'typeorm';
import { ADDRESS, BRANDS, CUSTOMER, PRODUCTS } from './data/seed-data';
import { Brand } from 'src/products/entities/brand.entity';
import { Address } from 'src/customer/entities/address.entity';
import { Customer } from 'src/customer/entities/customer.entity';

@Injectable()
export class SeedService {
  
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    @InjectRepository(Brand)
    private readonly brandRepository: Repository<Brand>,

    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,

    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  async runSeed() {

    await this.deleteAllProducts();
    await this.deleteAllBrands();
    
    await this.insertBrands();
    await this.insertProducts();

    await this.deleteAllAddress();
    await this.insertAddress();

    await this.deleteAllCustomer();
    await this.insertCustomer();

    return 'SEED EXECUTED';
  }

  async deleteAllProducts() {
    const query = this.productRepository.createQueryBuilder('product');

    try {
      return await query
        .delete()
        .where({})
        .execute();

    } catch (error) {
      throw (error);
    }
  }

  async insertProducts() {
    // Obtenemos los datos a insertar
    const products = PRODUCTS;

    const insertProduct:Product[] = []

    // creamos las instancias de cada entidad y las pasamos al arreglo
    products.forEach( product => {
      const entidad = this.productRepository.create({
        ...product
      }); 
      insertProduct.push(entidad);;
    });

    await this.productRepository.save(insertProduct);
  }

  async deleteAllBrands() {
    const query = this.brandRepository.createQueryBuilder('brand');

    try {
      return await query
        .delete()
        .where({})
        .execute();

    } catch (error) {
      throw (error);
    }
  }

  async insertBrands() {
    // Obtenemos los datos a insertar
    const brands = BRANDS;

    const insertBrands:Brand[] = []

    // creamos las instancias de cada entidad y las pasamos al arreglo
    brands.forEach( brand => {
      const entidad = this.brandRepository.create({
        id: brand.id,
        name: brand.name
      });
      insertBrands.push(entidad)
    });

    await this.brandRepository.save(insertBrands);
  }

  async deleteAllAddress() {
    const query = this.addressRepository.createQueryBuilder('address');

    try {
      return await query
        .delete()
        .where({})
        .execute();

    } catch (error) {
      throw (error);
    }
  }

  async insertAddress() {
    // Obtenemos los datos a insertar
    const address = ADDRESS;

    const insertAddress:Address[] = []

    // creamos las instancias de cada entidad y las pasamos al arreglo
    address.forEach( address => {
      const entidad = this.addressRepository.create({
        id: address.id,
        street: address.street,
        city: address.city,
        country: address.country,
        zip: address.zip,
        reference: address.reference,
        is_default: false
      });
      insertAddress.push(entidad)
    });

    await this.addressRepository.save(insertAddress);
  }

  async deleteAllCustomer() {
    const query = this.customerRepository.createQueryBuilder('customer');

    try {
      return await query
        .delete()
        .where({})
        .execute();

    } catch (error) {
      throw (error);
    }
  }

  async insertCustomer() {
    // Obtenemos los datos a insertar
    const customers = CUSTOMER;

    const insertCustomer:Customer[] = []

    // creamos las instancias de cada entidad y las pasamos al arreglo
    customers.forEach( async (customer) => {
      const entidad = this.customerRepository.create({
        id: customer.id,
        "first_name": customer.first_name,
        "last_name": customer.last_name,
        "email": customer.email,
        "phone": customer.phone,
        "currency": customer.currency,
        "password": customer.password,
        default_address: { id: customer.id_default_address } as Address,
      });
      insertCustomer.push(entidad)

      console.log(entidad)
    });

    await this.customerRepository.save(insertCustomer);
  }

}
