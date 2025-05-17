import { Type } from "class-transformer";
import { ArrayMinSize, IsDecimal, IsNumber, IsString, IsUrl, IsUUID, MaxLength, MinLength, ValidateNested } from "class-validator";
import { CreateProductSpecDto } from "./create-productSpecs.dto";

export class CreateProductDto {

  @IsUUID()
  id_category: string;

  @IsUUID()
  id_brand: string;

  @IsString()
  @MinLength(1)
  sku: string;

  @IsString()
  @MinLength(1)
  name: string;

  @IsString()
  @MinLength(1)
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
  @MaxLength(3)
  currency: string;

  @IsString()
  @IsUrl()
  img_src: string;

  @ValidateNested({ each: true })
  @Type(() => CreateProductSpecDto)
  @ArrayMinSize(1)
  productSpecs: CreateProductSpecDto[];

}
