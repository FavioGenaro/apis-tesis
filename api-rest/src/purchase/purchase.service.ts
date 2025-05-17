import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
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
    const { id_status, id_customer, payments, purchaseDetail, ...data } = createPurchaseDto;

    const purchase = this.purchaseRepository.create({
      ...data,
      status: {id: id_status},
      customer: {id: id_customer},
      payments: payments.map(payment => ({ 
        amount: payment.amount,
        currency: payment.currency,
        status: {id: payment.id_status},
        payment_method: {id: payment.id_payment_method},
      })),
      purchaseDetail: purchaseDetail.map(detail => ({
        quantity: detail.quantity,
        sale_price: detail.sale_price,
        product: {id: detail.id_product}
      }))
    });

    const saved = await this.purchaseRepository.save( purchase );

    return this.findOne(saved.id)
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
}
