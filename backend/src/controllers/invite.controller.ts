import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { InviteService } from 'src/services/invite.service';
import { CreateInvitesDto, RegisterUserByInviteDto } from 'src/dtos/invite.dto';
import { AuthService } from 'src/services/auth.service';
import { ERole } from 'src/utils/types';
import { TemplateEngineService } from 'src/services/templateEngine.service';

@Controller('invites')
export class InviteController {
  constructor(
    private readonly inviteService: InviteService,
    private readonly authService: AuthService,
    private readonly templateService: TemplateEngineService,
  ) {}

  @Get()
  async index() {
    return this.inviteService.createInvite({
      email: '',
      invitedByUserEmail: '',
      name: '',
      orgSlug: '',
    });
  }

  @Post()
  async createNewInvite(@Body() { invites }: CreateInvitesDto) {
    console.log(this.inviteService);
    return false;
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
