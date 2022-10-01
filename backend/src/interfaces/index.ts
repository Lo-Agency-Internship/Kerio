import { FindManyOptions } from 'typeorm';

export interface IPaginationParams {
  page?: number;
  size?: number;
  sort?: 'asc' | 'desc';
}
