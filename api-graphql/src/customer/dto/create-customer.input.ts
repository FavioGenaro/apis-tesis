import { InputType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { ArrayMinSize, IsEmail, IsNotEmpty, IsPhoneNumber, IsString, MinLength, ValidateNested } from 'class-validator';
import { CreateAddressDto } from './create-address.dto';

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
  @IsString()
  @MinLength(6)
  password: string;

  @Field( () => String )
  @IsPhoneNumber()
  phone: string;

  @Field( () => [CreateAddressDto] )
  @ValidateNested({ each: true })
  @Type(() => CreateAddressDto)
  @ArrayMinSize(1)
  addresses: CreateAddressDto[];

}
