import { Injectable } from '@nestjs/common';
import {
  ISendMailOptions,
  MailerService as NestMailer,
} from '@nestjs-modules/mailer';
import { SentMessageInfo } from 'nodemailer';

@Injectable()
export class MailerService {
  constructor(private readonly mailerService: NestMailer) {}

  async send(
    data: Pick<ISendMailOptions, 'to' | 'subject' | 'text' | 'html'>,
  ): Promise<SentMessageInfo> {
    const res = await this.mailerService.sendMail({
      to: data.to,
      from: `Lo Services <service@loagency.de>`,
      subject: data.subject,
      text: data.text,
      html: data.html,
    });
  }
}
