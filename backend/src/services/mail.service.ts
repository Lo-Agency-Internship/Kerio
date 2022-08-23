import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailgunService {
  constructor(private readonly mailerService: MailerService) { }

  public send(mailTo, mailSubject, mailText): void {
    this.mailerService
      .sendMail({
        to: `${mailTo}`,
        from: `Lo Services <service@lo.agency>`,
        subject: `${mailSubject}`,
        text: `${mailText}`,
        html: ``,
      })
      .then((res) => console.log({ Result: res }))
      .catch((err) => console.log({ Error: err }));
  }
}
