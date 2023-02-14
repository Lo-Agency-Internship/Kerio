export const OrganizationUserService = jest.fn().mockReturnValue({
  assignUserToOrganization: jest.fn(),
  findUserWithOrganizationByUserEmail: jest.fn(),
});
