import { Injectable } from '@nestjs/common';
import { CreatePurchaseInput } from './dto/create-purchase.input';
import { UpdatePurchaseInput } from './dto/update-purchase.input';

@Injectable()
export class PurchaseService {
  create(createPurchaseInput: CreatePurchaseInput) {
    return 'This action adds a new purchase';
  }

  findAll() {
    return `This action returns all purchase`;
  }

  findOne(id: number) {
    return `This action returns a #${id} purchase`;
  }

  update(id: number, updatePurchaseInput: UpdatePurchaseInput) {
    return `This action updates a #${id} purchase`;
  }

  remove(id: number) {
    return `This action removes a #${id} purchase`;
  }
}
