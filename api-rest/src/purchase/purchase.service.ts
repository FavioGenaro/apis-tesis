import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
// import { UpdatePurchaseDto } from './dto/update-purchase.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Purchase } from './entities/purchase.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PurchaseService {

  constructor(
    @InjectRepository(Purchase)
    private readonly purchaseRepository: Repository<Purchase>,
  ) {}

  async create(createPurchaseDto: CreatePurchaseDto) {
    // const purchase = this.purchaseRepository.create({
    //   ...createPurchaseDto
    // });

    // const saved = await this.purchaseRepository.save( purchase );

    // return this.findOne(saved.id)
  }

  async findAll() {
    const purchases = await this.purchaseRepository.find();

    return purchases;
  }

  async findOne(id: string) {
    const purchase = await this.purchaseRepository.findOneBy({id});
        
    if(!purchase) {
      throw new NotFoundException(`Compra ${id} no encontrada`);
    }

    return purchase;
  }

  // update(id: number, updatePurchaseDto: UpdatePurchaseDto) {
  //   return `This action updates a #${id} purchase`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} purchase`;
  // }
}
