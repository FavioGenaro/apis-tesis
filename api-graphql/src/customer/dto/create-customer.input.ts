import { InputType, Int, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString, MinLength } from 'class-validator';

@InputType()
export class CreateCustomerInput {

  @Field( () => String )
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @Field( () => String )
  @IsString()
  @IsNotEmpty()
  last_name: string;

  @Field( () => String )
  @IsEmail()
  email: string;

  @Field( () => String )
  @MinLength(6)
  @IsString()
  password: string;

  @Field( () => String )
  @IsPhoneNumber()
  phone: string;
}
