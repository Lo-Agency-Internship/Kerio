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
import { roleEnum } from 'src/utils/types';
import { TemplateEngineService } from 'src/services/templateEngine.service';

@Controller('invites')
export class InviteController {
  constructor(
    private readonly inviteService: InviteService,
    private readonly authService: AuthService,
    private readonly templateService: TemplateEngineService,
  ) {}



  @Post()
  async createNewInvite(@Body() { invites }: CreateInvitesDto) {
    //define array  if get error in for push this array . handle status code error message
   for await (const invite of invites) {
    //try catch if have catch break----
     this.inviteService.createInvite(invite);
   }

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

    const roleId = roleEnum.Employee;
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
