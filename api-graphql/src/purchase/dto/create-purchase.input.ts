import { Type } from "class-transformer";
import { ArrayMinSize, IsDecimal, IsUUID, Length, ValidateNested } from "class-validator";
import { CreatePaymentInput } from "./create-payment.input";
import { CreatePurchaseDetailInput } from "./create-purchase-detail.input";
import { Field, ID, InputType } from "@nestjs/graphql";

@InputType()
export class CreatePurchaseInput {
  
  @IsUUID()
  @Field(() => ID)
  id_status: string;

  @IsUUID()
  @Field(() => ID)
  id_customer: string;
  
  @IsDecimal({
    decimal_digits: '2'
  })
  @Field(() => String)
  total_cost: number;

  @Length(3,3)
  @Field(() => String)
  currency: string;

  @ValidateNested({ each: true })
  @Type(() => CreatePaymentInput)
  @ArrayMinSize(1)
  @Field(() => [CreatePaymentInput])
  payments: CreatePaymentInput[];

  @ValidateNested({ each: true })
  @Type(() => CreatePurchaseDetailInput)
  @ArrayMinSize(1)
  @Field(() => [CreatePurchaseDetailInput])
  purchaseDetail: CreatePurchaseDetailInput[];

}
