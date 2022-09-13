import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  BasicInviteDto,
  CreateInviteDto,
  InviteTokenDto,
} from 'src/dtos/invite.dto';
import { Invite } from 'src/entities/invite.entity';
import { DeleteResult, Repository } from 'typeorm';
import { OrganizationService } from './organization.service';
import { UserService } from './user.service';
import { randomBytes } from 'crypto';
import { MailerService } from './mail.service';
import { ConfigService } from '@nestjs/config';
import { MaliciousUserRequestException } from '../utils/exceptions';
import { TemplateEngineService } from './templateEngine.service';
import { RequestContextService } from './requestContext.service';

@Injectable()
export class InviteService {
  constructor(
    @InjectRepository(Invite)
    private readonly inviteRepository: Repository<Invite>,
    private readonly mailerService: MailerService,
    private readonly userService: UserService,
    private readonly orgService: OrganizationService,
    private readonly configService: ConfigService,
    private readonly templateService: TemplateEngineService,
    private readonly requestContextService: RequestContextService,
    
  ) {}

  async createInvite(invite: CreateInviteDto): Promise<Invite> {

    const user = this.requestContextService.get('userData');
    const organization  = this.requestContextService.get('organization');

    const token = randomBytes(48).toString('hex');

    const newInvite = await this.inviteRepository.save({
      email: invite.email,
      invitedBy:user,
      name: invite.name,
      invitedOrganization:organization,
      token,
    });

    return newInvite;
  }

  async sendEmailToInvite(invite: BasicInviteDto): Promise<void> {
    const inviteData = await this.inviteRepository.findOneBy({
      email: invite.email,
    });

    if (!inviteData)
      throw new Error(`no invitation could be found for the email`);

    const mailTemplate = await this.templateService.render('maiilTemplate', {
      link: `${this.configService.get('FRONTEND_URL')}/invite?token=${
        inviteData.token
      }`,
      email: inviteData.email,
    });
    const response = await this.mailerService.send({
      to: inviteData.email,
      subject: 'Invitation Email',
      html: mailTemplate,
      text: `${this.configService.get('FRONTEND_URL')}/invite?token=${
        inviteData.token
      }`,
    });

    console.log(response);
  }

  async isInviteValid({ token }: InviteTokenDto): Promise<boolean> {
    const invite = await this.inviteRepository.findOneBy({
      token,
    });

    return invite !== null;
  }

  async getInviteByToken(token: string): Promise<Invite> {
    const invite = await this.inviteRepository.findOne({
      where: {
        token,
      },
      relations: ['invitedOrganization'],
    });

    return invite;
  }

  async invalidateInviteByToken(token: string): Promise<DeleteResult> {
    return await this.inviteRepository.delete({
      token,
    });
  }
}
