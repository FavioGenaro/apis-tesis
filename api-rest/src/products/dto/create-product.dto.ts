import { IsDecimal, IsNumber, IsString, IsUrl, IsUUID, MinLength } from "class-validator";

export class CreateProductDto {

  @IsUUID()
  id_category: string;

  @IsUUID()
  id_brand: string;

  @IsString()
  @MinLength(1)
  sku: string;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsDecimal({
    decimal_digits: '2'
  })
  price: number;

  @IsNumber({
    maxDecimalPlaces: 0
  })
  stock: number;

  @IsString()
  @MinLength(3)
  currency: string;

  @IsString()
  @IsUrl()
  img_src: string;

}
