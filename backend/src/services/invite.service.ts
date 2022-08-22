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

@Injectable()
export class InviteService {
  constructor(
    @InjectRepository(Invite)
    private readonly inviteRepository: Repository<Invite>,

    private readonly userService: UserService,
    private readonly orgService: OrganizationService,
  ) {}

  async createInvite(invite: CreateInviteDto): Promise<Invite> {
    const [userExists, invitedBy] = await this.userService.existsAndFindByEmail(
      invite.invitedByUserEmail,
    );

    if (!userExists)
      throw new HttpException(
        `malicious invited by user`,
        HttpStatus.BAD_REQUEST,
      );

    const [orgExists, invitedOrganization] =
      await this.orgService.existsAndFindBySlug(invite.orgSlug);

    if (!orgExists)
      throw new HttpException(
        `organization does not exist`,
        HttpStatus.BAD_REQUEST,
      );

    const token = randomBytes(48).toString('hex');

    const newInvite = await this.inviteRepository.save({
      email: invite.email,
      invitedBy,
      name: invite.name,
      invitedOrganization,
      token,
    });

    return newInvite;
  }

  async sendEmailToInvite(invite: BasicInviteDto): Promise<void> {
    const inviteData = await this.inviteRepository.findOneBy({
      email: invite.email,
    });

    // TODO: implement the email sending
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
