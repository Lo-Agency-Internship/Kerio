import { InjectRepository } from '@nestjs/typeorm';

import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Invite } from 'src/entities/invite.entity';
import { DeleteResult, Repository } from 'typeorm';
import { UserService } from './user.service';
import { randomBytes } from 'crypto';
import { MailerService } from './mail.service';
import { ConfigService } from '@nestjs/config';
import { TemplateEngineService } from './templateEngine.service';
import { ICreateInvite } from 'src/interfaces/invite.service.interface';
import { OrganizationService } from './organization.service';

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
  ) {}

  async createInvite(payload: ICreateInvite): Promise<Invite> {
    const isExist = await this.userService.findUserByEmailEvenDeleted(
      payload.email,
    );

    if (isExist) {
      throw new UnauthorizedException();
    }

    const invitedBy = await this.userService.findOneUserByEmail({
      email: payload.invitedByUserEmail,
    });

    const invitedOrganization = await this.orgService.findOneOrganizationBySlug(
      payload.orgSlug,
    );

    const token = randomBytes(48).toString('hex');

    const newInvite = await this.inviteRepository.save({
      email: payload.email,
      invitedBy,
      name: payload.name,
      invitedOrganization,
      token,
    });

    return newInvite;
  }

  async sendEmailToInvite(email: string): Promise<void> {
    const inviteData = await this.inviteRepository.findOneBy({
      email,
    });

    if (!inviteData)
      throw new Error(`no invitation could be found for the email`);

    const mailTemplate = await this.templateService.render('mailTemplate', {
      link: `${this.configService.get('FRONTEND_URL')}/invite?token=${
        inviteData.token
      }`,
      email: inviteData.email,
    });
    await this.mailerService.send({
      to: inviteData.email,
      subject: 'Invitation Email',
      html: mailTemplate,
      text: `${this.configService.get('FRONTEND_URL')}/invite?token=${
        inviteData.token
      }`,
    });
  }

  async isInviteValid(token: string) {
    const invite = await this.inviteRepository.findOneBy({
      token,
    });

    if (!invite) {
      throw new NotFoundException();
    }

    return { ok: invite !== null, email: invite.email };
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

  async sendEmailToActiveAccount(email: string) {
    const activeTemplate = await this.templateService.render(
      'activeEmailTemplate',
      {
        link: `${this.configService.get('FRONTEND_URL')}/active?email=${email}`,
        email,
      },
    );

    await this.mailerService.send({
      to: email,
      subject: 'active your account',
      html: activeTemplate,
      text: `${this.configService.get('FRONTEND_URL')}/active?email=${email}`,
    });
  }
}
