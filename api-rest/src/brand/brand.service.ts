import { Injectable } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { Repository } from 'typeorm';
import { Brand } from './entities/brand.entity';
import { InjectRepository } from '@nestjs/typeorm';
// import { UpdateBrandDto } from './dto/update-brand.dto';

@Injectable()
export class BrandService {

  constructor(
    @InjectRepository(Brand)
    private readonly brandRepository: Repository<Brand>,
  ) {}

  create(createBrandDto: CreateBrandDto) {
    return 'This action adds a new brand';
  }

  async findAll(): Promise<Brand[]> {
    const brands = await this.brandRepository.find();

    return brands;
  }

  async findOne(id: string) {
    const brand = await this.brandRepository.findOneBy({
      id
    });

    return brand;
  }

  // update(id: number, updateBrandDto: UpdateBrandDto) {
  //   return `This action updates a #${id} brand`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} brand`;
  // }
}
