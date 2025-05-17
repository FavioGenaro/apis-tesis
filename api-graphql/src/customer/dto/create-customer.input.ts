import { InputType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { ArrayMinSize, IsEmail, IsNotEmpty, IsPhoneNumber, IsString, MinLength, ValidateNested } from 'class-validator';
import { CreateAddressInput } from './create-address.input';

@InputType()
export class CreateCustomerInput {

  @IsString()
  @IsNotEmpty()
  @Field( () => String )
  first_name: string;

  @IsString()
  @IsNotEmpty()
  @Field( () => String )
  last_name: string;

  @IsEmail()
  @Field( () => String )
  email: string;

  @IsString()
  @MinLength(6)
  @Field( () => String )
  password: string;

  @IsPhoneNumber()
  @Field( () => String )
  phone: string;

  @ValidateNested({ each: true })
  @Type(() => CreateAddressInput)
  @ArrayMinSize(1)
  @Field( () => [CreateAddressInput] )
  addresses: CreateAddressInput[];

}
