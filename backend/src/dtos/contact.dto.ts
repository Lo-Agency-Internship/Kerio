import { IsNotEmpty, IsString } from 'class-validator';

export class FindOneContactByIdDto {
  @IsNotEmpty()
  @IsString()
  id: string;
}
