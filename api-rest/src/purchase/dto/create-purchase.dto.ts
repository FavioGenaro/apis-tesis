import { Type } from "class-transformer";
import { ArrayMinSize, IsDecimal, IsNumber, IsString, IsUUID, MinLength, ValidateNested } from "class-validator";
import { CreatePaymentDto } from "./create-payment.dto";
import { CreatePurchaseDetailDto } from "./create-purchase-detail.dto";

export class CreatePurchaseDto {
  
  @IsUUID()
  id_status: string;

  @IsUUID()
  id_customer: string;
  
  @IsDecimal({
    decimal_digits: '2'
  })
  total_cost: number;

  @IsString()
  @MinLength(3)
  currency: string;

  @ValidateNested({ each: true })
  @Type(() => CreatePaymentDto)
  @ArrayMinSize(1)
  payments: CreatePaymentDto[];


  @ValidateNested({ each: true })
  @Type(() => CreatePurchaseDetailDto)
  @ArrayMinSize(1)
  purchaseDetail: CreatePurchaseDetailDto[];

}
