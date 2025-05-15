import { ArrayMinSize, IsEmail, IsNotEmpty, IsPhoneNumber, IsString, MinLength, ValidateNested } from "class-validator";
import { CreateAddressDto } from "./create-address.dto";
import { Type } from "class-transformer";

export class CreateCustomerDto {

  @IsString()
  @IsNotEmpty()
  first_name: string;

  @IsString()
  @IsNotEmpty()
  last_name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsPhoneNumber()
  phone: string;

  @ValidateNested({ each: true })
  @Type(() => CreateAddressDto)
  @ArrayMinSize(1)
  addresses: CreateAddressDto[];
}
