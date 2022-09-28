import { IPaginationParams } from '../interfaces';

export function getPaginationOffset<Entity>(
  pagination: Pick<IPaginationParams, 'page' | 'size'>,
) {
  return pagination.page > 0 ? (pagination.page - 1) * pagination.size : 1;
}
