import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { JwtPayload } from './types';
import { RequestContextService } from '../services/requestContext.service';
import { OrganizationUserService } from '../services/organizationUser.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly orgUserService: OrganizationUserService,
    private readonly requestContextService: RequestContextService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.orgUserService.findUserWithOrganizationByUserEmail(
      payload.email,
    );

    const bareUser = {
      ...user,
    };

    delete bareUser.organization;
    delete bareUser.role;

    this.requestContextService.set('userData', bareUser);
    this.requestContextService.set('organization', user.organization);
    this.requestContextService.set('role', user.role);
    return bareUser;
  }
}
