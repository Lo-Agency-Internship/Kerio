import { Injectable, Req } from '@nestjs/common';
import { RequestContext } from 'nestjs-request-context';
import { SecureUserWithOrganization } from '../utils/types';
import { Organization } from '../entities/organization.entity';
import { Role } from '../entities/role.entity';

type ValidKeys = 'userData' | 'organization' | 'role';

@Injectable()
export class RequestContextService {
  get(key: ValidKeys) {
    const {
      req: { [key]: val },
    } = RequestContext.currentContext as any;

    switch (key) {
      case 'userData':
        return val as SecureUserWithOrganization;

      case 'organization':
        console.log('hellooooo')
        return val as Organization;

      case 'role':
        return val as Role;

      default:
        throw new Error(`unknown context key`);
    }
  }

  set(key: ValidKeys, value: any): void {
    const { req } = RequestContext.currentContext;
    req[key] = value;
  }
}
