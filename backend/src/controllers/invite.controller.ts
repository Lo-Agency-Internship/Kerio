import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { InviteService } from 'src/services/invite.service';
import { CreateInvitesDto } from 'src/dtos/invite.dto';
import { AuthService } from 'src/services/auth.service';
import {
  EEntityTypeLog,
  ERole,
  SecureUserWithOrganization,
} from 'src/utils/types';
import { TemplateEngineService } from 'src/services/templateEngine.service';
import { LogService } from 'src/services/log.service';
import { RequestContextService } from 'src/services/requestContext.service';
import { Organization } from 'src/entities/organization.entity';
import { JwtGuard } from 'src/utils/jwt.guard';

@UseGuards(JwtGuard)
@Controller('invites')
export class InviteController {
  constructor(
    private readonly inviteService: InviteService,
    private readonly authService: AuthService,
    private readonly logService: LogService,
    private readonly templateService: TemplateEngineService,
    private readonly contextService: RequestContextService,
  ) {}

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

      await this.inviteService.createInvite(invite);
      await this.inviteService.sendEmailToInvite(invite.email);

      this.logService.addLog({
        title: 'Send Invite Successfully',
        description: `Send Invite to ${invite.email}  Successfully`,
        entityType: 'Send Invite',
        entityId: EEntityTypeLog.Invite,
        event: 'Invite',
      });
    }

    return;
  }

  @Get('/:token')
  async checkTokenValidation(@Param() { token }: any) {
    return await this.inviteService.isInviteValid({ token });
  }

  @Post('/:token')
  async registerUserByToken(@Param() { token }: any, @Body() body: any) {
    const isTokenValid = await this.inviteService.isInviteValid({ token });

    if (!isTokenValid)
      throw new HttpException(`token is not valid`, HttpStatus.BAD_REQUEST);

    const invite = await this.inviteService.getInviteByToken(token);

    const roleId = ERole.Employee;
    const resultUser = await this.authService.registerUser({
      email: invite.email,
      name: body.name,
      organizationSlug: invite.invitedOrganization.slug,
      password: body.password,
      roleId,
    });

    // TODO: send email to user to activate the account
    this.inviteService.sendEmailToActiveAccount(invite.email);

    await this.inviteService.invalidateInviteByToken(token);
    return resultUser;
  }
}
