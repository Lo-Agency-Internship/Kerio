import { IsNotEmpty, IsNumber } from 'class-validator';

export class FindOneContactByIdDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
