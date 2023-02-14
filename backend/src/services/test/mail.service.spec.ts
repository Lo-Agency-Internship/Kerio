import { MailerOptions, MailerService, MailerTransportFactory, MAILER_OPTIONS, MAILER_TRANSPORT_FACTORY } from "@nestjs-modules/mailer";
import { Test, TestingModule } from "@nestjs/testing";
import MailMessage from "nodemailer/lib/mailer/mail-message";
import * as SMTPTransport from 'nodemailer/lib/smtp-transport';

async function getMailerServiceForOptions(
    options: MailerOptions,
  ): Promise<MailerService> {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          name: MAILER_OPTIONS,
          provide: MAILER_OPTIONS,
          useValue: options,
        },
        MailerService,
      ],
    }).compile();
  
    const service = module.get<MailerService>(MailerService);
    return service;
  }
  
  /**
   * Common testing code for spying on the SMTPTransport's send() implementation
   */
  function spyOnSmtpSend(onMail: (mail: MailMessage) => void) {
    return jest
      .spyOn(SMTPTransport.prototype, 'send')
      .mockImplementation(function (
        mail: MailMessage,
        callback: (
          err: Error | null,
          info: SMTPTransport.SentMessageInfo,
        ) => void,
      ): void {
        onMail(mail);
        callback(null, {
          envelope: {
            from: mail.data.from as string,
            to: [mail.data.to as string],
          },
          messageId: 'ABCD',
          accepted: [],
          rejected: [],
          pending: [],
          response: 'ok',
        });
      });
  }
  
  describe('MailerService', () => {
    it('should send emails with nodemailer', async () => {
        let lastMail: MailMessage;
        const send = spyOnSmtpSend((mail: MailMessage) => {
          lastMail = mail;
        });
    
        const service = await getMailerServiceForOptions({
          transport: 'smtps://user@domain.com:pass@smtp.domain.com',
        });
    
        await service.sendMail({
          from: 'user1@example.test',
          to: 'user2@example.test',
          subject: 'Test',
          html: 'This is test.',
        });
    
        expect(send).toHaveBeenCalled();
        expect(lastMail.data.from).toBe('user1@example.test');
        expect(lastMail.data.to).toBe('user2@example.test');
        expect(lastMail.data.subject).toBe('Test');
        expect(lastMail.data.html).toBe('This is test.');
      });

  })