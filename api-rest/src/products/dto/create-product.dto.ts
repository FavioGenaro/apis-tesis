import { Type } from "class-transformer";
import { ArrayMinSize, IsDecimal, IsNotEmpty, IsNumber, IsString, IsUrl, IsUUID, Length, ValidateNested } from "class-validator";
import { CreateProductSpecDto } from "./create-productSpecs.dto";

export class CreateProductDto {

  @IsUUID()
  id_category: string;

  @IsUUID()
  id_brand: string;

  @IsString()
  @IsNotEmpty()
  sku: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsDecimal({
    decimal_digits: '2'
  })
  price: number;

  @IsNumber({
    allowNaN: false,
    allowInfinity: false,
    maxDecimalPlaces: 0
  })
  stock: number;

  @Length(3,3)
  currency: string;

  @IsUrl()
  img_src: string;

  @ValidateNested({ each: true })
  @Type(() => CreateProductSpecDto)
  @ArrayMinSize(1)
  productSpecs: CreateProductSpecDto[];

}
