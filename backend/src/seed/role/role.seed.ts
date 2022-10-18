import { IRole } from '../../interfaces/role.entity.interface';
import { ERole } from '../../utils/types';

export const roles: IRole[] = [{ name: ERole.Owner }, { name: ERole.Employee }];
