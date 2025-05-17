import { IsBoolean, IsNotEmpty, IsString, Length, MaxLength } from "class-validator";

export class CreateAddressDto {

  @IsString()
  @IsNotEmpty()
  street: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  country: string;

  @Length(5,5)
  zip: string;

  @IsString()
  @IsNotEmpty()
  reference: string;

  @IsBoolean()
  is_default: boolean;

}