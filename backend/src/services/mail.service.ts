import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailgunService {
  constructor(private readonly mailerService: MailerService) {}

  public send(mailTo,mailFrom,mailSubject,mailText): void {
    this.mailerService
      .sendMail({
        to: `${mailTo}`, 
        from: `Email from  <${mailFrom}>`, 
        subject: `${mailSubject}`, 
        html: `<p> ${mailText} </p>`,
      })
      .then((res) => console.log({"Result" : res}))
      .catch((err) => console.log({"Error": err}));
  }
}