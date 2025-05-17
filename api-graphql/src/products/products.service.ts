import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductInput } from './dto/create-product.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createProductInput: CreateProductInput) {
    const { sku, id_brand, id_category, ...data } = createProductInput;

    const product = await this.productRepository.findOneBy({sku});
    
    if(product) throw new ConflictException(`SKU ya esta registrado`);

    const productNew = this.productRepository.create({
      ...data,
      sku,
      brand: {id: id_brand},
      category: {id:id_category}
    });

    const saved = await this.productRepository.save( productNew );

    return this.findOne(saved.id)
  }

  async findAll() {
    const products = await this.productRepository.find();

    return products;
  }

  async findOne(id: string) {
    const product = await this.productRepository.findOneBy({id});

    if(!product) {
      throw new NotFoundException(`Producto ${id} no encontrado`);
    }

    return product;
  }
}
