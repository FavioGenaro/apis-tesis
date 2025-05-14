import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
// import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {

    const product = this.productRepository.create({
      ...createProductDto
    });

    const saved = await this.productRepository.save( product );

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

  // update(id: number, updateProductDto: UpdateProductDto) {
  //   return `This action updates a #${id} product`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} product`;
  // }
}
