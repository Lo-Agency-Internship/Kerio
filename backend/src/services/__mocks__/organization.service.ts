export const OrganizationService = jest.fn().mockReturnValue({
  addOrganization: jest.fn(),
  existsAndFindBySlug: jest.fn(),
});
