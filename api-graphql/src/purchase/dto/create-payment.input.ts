import { Field, Float, ID, InputType } from "@nestjs/graphql";
import { IsDecimal, IsUUID, Length } from "class-validator";

@InputType()
export class CreatePaymentInput {
  
  @IsUUID()
  @Field(() => ID)
  id_status: string;

  @IsUUID()
  @Field(() => ID)
  id_payment_method: string;
  
  @IsDecimal({
    decimal_digits: '2'
  })
  @Field(() => String)
  amount: number;

  @Length(3,3)
  @Field(() => String)
  currency: string;

}
