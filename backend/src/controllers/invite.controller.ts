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
import { CreateInviteDto, CreateInvitesDto, RegisterUserByInviteDto } from 'src/dtos/invite.dto';
import { AuthService } from 'src/services/auth.service';
import { roleEnum } from 'src/utils/types';

@Controller('invites')
export class InviteController {
  constructor(
    private readonly inviteService: InviteService,
    private readonly authService: AuthService,
  ) { }

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
  async registerUserByToken(
    @Param() { token }: any,
    @Body() body: RegisterUserByInviteDto,
  ) {
    const isTokenValid = await this.inviteService.isInviteValid({ token });

    if (!isTokenValid)
      throw new HttpException(`token is not valid`, HttpStatus.BAD_REQUEST);

    const invite = await this.inviteService.getInviteByToken(token);
    //my change
    const userRole = roleEnum.Employee

    const resultUser = await this.authService.registerUser({
      email: invite.email,
      name: body.name,
      organizationSlug: invite.invitedOrganization.slug,
      password: body.password,
      userRole
    });

    // TODO: send email to user to activate the account

    await this.inviteService.invalidateInviteByToken(token);
    return resultUser;
  }
}
