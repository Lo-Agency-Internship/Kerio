import { User } from '../entities/user.entity';

export type SecureUser = Omit<User, 'password' | 'salt'>;
export type NewUser = Omit<
  User,
  'id' | 'createdAt' | 'deletedAt' | 'updatedAt'
>;

export type JwtPayload = {
  email: string;
  sub: number;
  name: string;
};

export type JwtResponse = {
  access_token: string;
};
