import { IsString, MinLength } from "class-validator";

export class CreateProductDto {

  // @IsString()
  // @MinLength(1) // debe ser al menos un caracter
  // title: string;

  @IsString()
  @MinLength(1)
  sku: string;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  id_brand: string;

}
