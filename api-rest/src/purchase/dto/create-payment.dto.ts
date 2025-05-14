import { IsDecimal, IsString, IsUUID, MinLength } from "class-validator";

export class CreatePaymentDto {
  
  @IsUUID()
  id_status: string;

  @IsUUID()
  id_payment_method: string;

  // @IsUUID()
  // id_purchase: string;
  
  @IsDecimal({
    decimal_digits: '2'
  })
  amount: number;

  @IsString()
  @MinLength(3)
  currency: string;

}
