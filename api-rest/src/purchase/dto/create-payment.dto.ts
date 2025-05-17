import { IsDecimal, IsUUID, Length } from "class-validator";

export class CreatePaymentDto {
  
  @IsUUID()
  id_status: string;

  @IsUUID()
  id_payment_method: string;
  
  @IsDecimal({
    decimal_digits: '2'
  })
  amount: number;

  @Length(3,3)
  currency: string;

}
