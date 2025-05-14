import { IsEmail, IsPhoneNumber, IsString } from "class-validator";

export class CreateCustomerDto {

  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsPhoneNumber()
  phone: string;
}
