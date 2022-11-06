export interface ICreateInvite {
  email: string;
  orgSlug: string;
  name: string;
  invitedByUserEmail: string;
}

export interface IIsInviteValid {
  token: string;
}
