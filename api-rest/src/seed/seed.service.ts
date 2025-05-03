import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/products/entities/product.entity';
import { Repository } from 'typeorm';
import { ADDRESS, BRANDS, CUSTOMER, PRODUCTS } from './data/seed-data';
import { Brand } from 'src/products/entities/brand.entity';
import { Address } from 'src/customer/entities/address.entity';
import { Customer } from 'src/customer/entities/customer.entity';
import { Category } from 'src/products/entities/category.entity';

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

    await this.deleteAllTable(this.productRepository, 'product');
    await this.deleteAllTable(this.brandRepository, 'brand');
    
    await this.insertBrands();
    await this.insertProducts();

    await this.deleteAllTable(this.addressRepository, 'address');
    await this.deleteAllTable(this.customerRepository, 'customer');

    await this.insertCustomer();
    await this.insertAddress();

    return 'SEED EXECUTED';
  }

  async deleteAllTable(repositorio: Repository<any>, alias: string) {
    const query = repositorio.createQueryBuilder(alias);

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
        ...product,
        category: product.id_category !== "" ? ({ id: product.id_category } as Category) : null,
        brand: { id: product.id_brand } as Brand
      }); 
      insertProduct.push(entidad);;
    });

    await this.productRepository.save(insertProduct);
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
        is_default: false,
        customer: { id: address.id_customer } as Customer,
      });
      insertAddress.push(entidad)
    });

    await this.addressRepository.save(insertAddress);
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
        // "currency": customer.currency,
        "password": customer.password,
        // default_address: { id: customer.id_default_address } as Address,
      });
      insertCustomer.push(entidad)

      // console.log(entidad)
    });

    await this.customerRepository.save(insertCustomer);
  }

}
