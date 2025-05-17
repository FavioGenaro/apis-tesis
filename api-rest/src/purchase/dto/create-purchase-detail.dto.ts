import { IsDecimal, IsNumber, IsUUID } from "class-validator";

export class CreatePurchaseDetailDto {
  
  @IsUUID()
  id_product: string;

  @IsDecimal({
    decimal_digits: '2'
  })
  sale_price: number;

  @IsNumber({
    maxDecimalPlaces: 0
  })
  quantity: number;

}