import { IsBoolean, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateAddressDto {
  
  // @IsUUID()
  // id_customer: string;

  @IsString()
  street: string;

  @IsString()
  city: string;

  @IsString()
  country: string;

  @MaxLength(5)
  @IsNotEmpty()
  zip: string;

  @IsString()
  reference: string;

  @IsBoolean()
  is_default: boolean;

}