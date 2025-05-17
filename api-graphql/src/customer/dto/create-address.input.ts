import { Field, InputType } from "@nestjs/graphql";
import { IsBoolean, IsNotEmpty, IsString, Length } from "class-validator";

@InputType()
export class CreateAddressInput {

  @IsString()
  @IsNotEmpty()
  @Field( () => String )
  street: string;

  @IsString()
  @IsNotEmpty()
  @Field( () => String )
  city: string;

  @IsString()
  @IsNotEmpty()
  @Field( () => String )
  country: string;

  @Length(5,5)
  @Field( () => String )
  zip: string;

  @IsString()
  @IsNotEmpty()
  @Field( () => String )
  reference: string;

  @IsBoolean()
  @Field( () => Boolean, { defaultValue: false } )
  is_default: boolean;

}