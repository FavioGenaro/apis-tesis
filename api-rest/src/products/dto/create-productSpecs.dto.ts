import { IsString, MinLength } from "class-validator";

export class CreateProductSpecDto {

  @IsString()
  @MinLength(1)
  name: string;

  @IsString()
  @MinLength(1)
  value: string;

}