import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
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
    const { sku, id_brand, id_category, ...data } = createProductDto;

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

  // update(id: number, updateProductDto: UpdateProductDto) {
  //   return `This action updates a #${id} product`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} product`;
  // }
}
