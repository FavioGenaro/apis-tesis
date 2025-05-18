import { Type } from "class-transformer";
import { ArrayMinSize, IsDecimal, IsNotEmpty, IsNumber, IsString, IsUrl, IsUUID, Length, ValidateNested } from "class-validator";
import { CreateProductSpecInput } from "./create-productSpecs.input";
import { Field, ID, InputType, Int } from "@nestjs/graphql";

@InputType()
export class CreateProductInput {

  @IsUUID()
  @Field(() => ID)
  id_category: string;

  @IsUUID()
  @Field(() => ID)
  id_brand: string;

  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  sku: string;

  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  name: string;

  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  description: string;

  @IsDecimal({
    decimal_digits: '2'
  })
  @Field(() => String)
  price: number;

  @IsNumber({
    allowNaN: false,
    allowInfinity: false,
    maxDecimalPlaces: 0
  })
  @Field(() => Int)
  stock: number;

  @Length(3,3)
  @Field(() => String)
  currency: string;

  @IsUrl()
  @Field(() => String)
  img_src: string;

  @ValidateNested({ each: true })
  @Type(() => CreateProductSpecInput)
  @ArrayMinSize(1)
  @Field( () => [CreateProductSpecInput] )
  productSpecs: CreateProductSpecInput[];

}
