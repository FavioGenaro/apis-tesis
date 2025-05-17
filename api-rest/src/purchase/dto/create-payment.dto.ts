import { IsDecimal, IsString, IsUUID, MaxLength, MinLength } from "class-validator";

export class CreatePaymentDto {
  
  @IsUUID()
  id_status: string;

  @IsUUID()
  id_payment_method: string;
  
  @IsDecimal({
    decimal_digits: '2'
  })
  amount: number;

  @IsString()
  @MinLength(3)
  @MaxLength(3)
  currency: string;

}
