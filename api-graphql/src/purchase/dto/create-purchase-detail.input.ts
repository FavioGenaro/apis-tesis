import { Field, Float, ID, InputType, Int } from "@nestjs/graphql";
import { IsDecimal, IsNumber, IsUUID } from "class-validator";

@InputType()
export class CreatePurchaseDetailInput {
  
  @IsUUID()
  @Field(() => ID)
  id_product: string;

  @IsDecimal({
    decimal_digits: '2'
  })
  @Field(() => String)
  sale_price: number;

  @IsNumber({
    maxDecimalPlaces: 0
  })
  @Field(() => Int)
  quantity: number;

}