import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { InviteService } from 'src/services/invite.service';
import { CreateInvitesDto } from 'src/dtos/invite.dto';
import { AuthService } from 'src/services/auth.service';
import { EEntityTypeLog, ERole } from 'src/utils/types';
import { TemplateEngineService } from 'src/services/templateEngine.service';
import { LogService } from 'src/services/log.service';

@Controller('invites')
export class InviteController {
  constructor(
    private readonly inviteService: InviteService,
    private readonly authService: AuthService,
    private readonly logService: LogService,
    private readonly templateService: TemplateEngineService,
  ) {}

  @Post()
  async createNewInvite(@Body() { invites }: CreateInvitesDto) {
    const errors: any[] = [];

    for await (const invite of invites) {
      try {
        await this.inviteService.createInvite(invite);

        this.logService.addLog({
          title: 'Send Invite Successfully',
          description: `Send Invite to ${invite.email}  Successfully`,
          entityType: 'Send Invite',
          entityId: EEntityTypeLog.Invite,
          event: 'Invite',
        });
      } catch (error: any) {
        errors.push(error.message);
      }
    }

    if (errors.length > 0)
      throw new HttpException(errors.join(', '), HttpStatus.BAD_REQUEST);

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

    await this.inviteService.invalidateInviteByToken(token);
    return resultUser;
  }
}
