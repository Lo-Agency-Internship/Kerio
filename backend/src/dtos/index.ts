import { IsIn, IsInt, IsOptional, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationDto {
  @IsOptional()
  @Min(1)
  @IsInt()
  @Type(() => Number)
  page?: number = 1;

  @IsOptional()
  @Min(1)
  @IsInt()
  @Type(() => Number)
  size?: number = 200;

  @IsOptional()
  @IsString()
  @IsIn(['asc', 'desc'])
  sort?: 'asc' | 'desc' = 'asc';
}
