export const UserService = jest.fn().mockReturnValue({
  findOneUserById: jest.fn(),
  readOneById: jest.fn(),
  addUser: jest.fn(),
  exists: jest.fn(),
  existsAndFindByEmail: jest.fn(),
  findOneUserByEmail: jest.fn(),
});
