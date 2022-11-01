import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { InviteService } from 'src/services/invite.service';
import { CreateInvitesDto, RegisterUserByTokenDto } from 'src/dtos/invite.dto';
import { AuthService } from 'src/services/auth.service';
import { ERole, SecureUserWithOrganization } from 'src/utils/types';
import { RequestContextService } from 'src/services/requestContext.service';
import { Organization } from 'src/entities/organization.entity';
import { JwtGuard } from 'src/utils/jwt.guard';

@Controller('invites')
export class InviteController {
  constructor(
    private readonly inviteService: InviteService,
    private readonly authService: AuthService,
    private readonly contextService: RequestContextService,
  ) {}

  @UseGuards(JwtGuard)
  @Post()
  async createNewInvite(@Body() { invites }: CreateInvitesDto) {
    const user = this.contextService.get(
      'userData',
    ) as SecureUserWithOrganization;
    const invitedByUserEmail = user.email;
    const organization = this.contextService.get(
      'organization',
    ) as Organization;
    const orgSlug = organization.slug;

    for await (let invite of invites) {
      invite = { ...invite, invitedByUserEmail, orgSlug };
      try {
        await this.inviteService.createInvite(invite);
      } catch (err) {
        if (err instanceof UnauthorizedException) {
          throw new HttpException(
            'This email already exists ',
            HttpStatus.BAD_REQUEST,
          );
        }
      }
      await this.inviteService.sendEmailToInvite(invite.email);
    }

    return;
  }

  @Get('/:token')
  async checkTokenValidation(@Param('token') token: string) {
    return await this.inviteService.isInviteValid(token);
  }

  @Post('/:token')
  async registerUserByToken(
    @Param('token') token: string,
    @Body() body: RegisterUserByTokenDto,
  ) {
    const isTokenValid = await this.inviteService.isInviteValid(token);

    if (!isTokenValid)
      throw new HttpException(`token is not valid`, HttpStatus.BAD_REQUEST);

    const invite = await this.inviteService.getInviteByToken(token);

    const role = ERole.Employee;
    const resultUser = await this.authService.registerUser({
      email: invite.email,
      name: body.name,
      organizationSlug: invite.invitedOrganization.slug,
      password: body.password,
      role,
    });

    // TODO: send email to user to activate the account
    this.inviteService.sendEmailToActiveAccount(invite.email);

    await this.inviteService.invalidateInviteByToken(token);
    return resultUser;
  }
}
