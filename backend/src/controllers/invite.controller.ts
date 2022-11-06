import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { InviteService } from 'src/services/invite.service';
import { CreateInvitesDto, InviteTokenDto } from 'src/dtos/invite.dto';
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

      await this.inviteService.createInvite(invite);
      await this.inviteService.sendEmailToInvite(invite);
    }

    return;
  }

  @Get('/:token')
  async checkTokenValidation(@Param() { token }: InviteTokenDto) {
    try {
      return await this.inviteService.isInviteValid({ token });
    } catch (err) {
      if (err instanceof NotFoundException) {
        throw new HttpException('token does not exist', HttpStatus.FORBIDDEN);
      }
      throw new HttpException('something went wrong', HttpStatus.BAD_REQUEST);
    }
  }

  @Post('/:token')
  async registerUserByToken(@Param() { token }: any, @Body() body: any) {
    try {
      await this.inviteService.isInviteValid({ token });
    } catch (err) {
      if (err instanceof NotFoundException) {
        throw new HttpException(`token is not valid`, HttpStatus.BAD_REQUEST);
      }
      throw new HttpException('something went wrong', HttpStatus.BAD_REQUEST);
    }

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
    this.inviteService.sendEmailToActiveAccount({ email: invite.email });

    await this.inviteService.invalidateInviteByToken(token);
    return resultUser;
  }
}
