import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/products/entities/product.entity';
import { Repository } from 'typeorm';
import { BRANDS, PRODUCTS } from './data/seed-data';
import { Brand } from 'src/products/entities/brand.entity';

@Injectable()
export class SeedService {
  
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    @InjectRepository(Brand)
    private readonly brandRepository: Repository<Brand>,
  ) {}

  async runSeed() {

    await this.deleteAllProducts();
    await this.deleteAllBrands();
    
    await this.insertBrands()
    await this.insertProducts()

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
        name: "Hola mundo"
      });
      insertBrands.push(entidad)
    });

    await this.brandRepository.save(insertBrands);
  }

}
