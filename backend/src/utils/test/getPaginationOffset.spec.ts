import { getPaginationOffset } from '../functions';

describe('test for pagination', () => {
  it('it should return correct one', () => {
    expect(getPaginationOffset({ page: 0, size: 0 })).toEqual(1);
  });
  it('it should return pageNumber-1*sizeNumber', () => {
    expect(getPaginationOffset({ page: 2, size: 10 })).toEqual(10);
  });
});
