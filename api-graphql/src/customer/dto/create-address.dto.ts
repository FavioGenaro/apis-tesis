import { Field, InputType } from "@nestjs/graphql";
import { IsBoolean, IsNotEmpty, IsString, Length } from "class-validator";

@InputType()
export class CreateAddressDto {

  @Field( () => String )
  @IsString()
  @IsNotEmpty()
  street: string;

  @Field( () => String )
  @IsString()
  @IsNotEmpty()
  city: string;

  @Field( () => String )
  @IsString()
  @IsNotEmpty()
  country: string;

  @Field( () => String )
  @Length(5,5)
  zip: string;

  @Field( () => String )
  @IsString()
  @IsNotEmpty()
  reference: string;

  @Field( () => Boolean )
  @IsBoolean()
  is_default: boolean;

}