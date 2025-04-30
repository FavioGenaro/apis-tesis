import { Inject, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
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

    // const {sku, name, description, id_brand } = createProductDto;

    const product = this.productRepository.create({
      ...createProductDto
    });

    const saved = await this.productRepository.save( product );


    return this.findOne(saved.id)
    // return await this.productRepository.findOne({
    //   where: { id: saved.id },
    //   relations: {
    //     brand: true
    //   },
    //   // select: {
    //   //   id: true,
    //   //   name: true,

    //   //   brand: {
    //   //     id: true,
    //   //     name: true,
    //   //   },
    //   // },
    // });
  }

  async findAll() {
    const products = await this.productRepository.find();

    return products;
  }

  async findOne(id: string) {
    return await this.productRepository.findOneBy({
      id
      // where: { id: id }
      // ,
      // relations: {
      //   brand: true
      // },
    });
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
