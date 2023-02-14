export const OrganizationService = jest.fn().mockReturnValue({
  addOrganization: jest.fn(),
  existsAndFindBySlug: jest.fn(),
  findOneOrganizationBySlug: jest.fn(),
  createOrganizationByOwner: jest.fn(),
});
