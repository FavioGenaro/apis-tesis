import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PurchaseService } from './purchase.service';
import { Purchase } from './entities/purchase.entity';
import { CreatePurchaseInput } from './dto/create-purchase.input';

@Resolver(() => Purchase)
export class PurchaseResolver {
  constructor(private readonly purchaseService: PurchaseService) {}

  @Mutation(() => Purchase)
  createPurchase(@Args('createPurchaseInput') createPurchaseInput: CreatePurchaseInput) {
    return this.purchaseService.create(createPurchaseInput);
  }

  @Query(() => [Purchase], { name: 'purchases' })
  findAll() {
    return this.purchaseService.findAll();
  }

  @Query(() => Purchase, { name: 'purchase' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.purchaseService.findOne(id);
  }

}
