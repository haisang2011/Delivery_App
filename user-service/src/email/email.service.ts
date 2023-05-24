import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { join } from 'path';
import { User } from './../user/schema/user.schema';

@Injectable()
export class EmailService {
  constructor(private mailerService: MailerService) {}

  async sendUserWelcome(user: User, token: string) {
    const welcomeLogo = join(__dirname, 'assets', 'welcome-mail.jpeg');
    const confirmation_url = `example.com/auth/confirm?token=${token}`;

    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Welcome to Vitamin App! Confirm your Email',
      template: './welcome',
      context: {
        logo: welcomeLogo,
        name: user.userName,
        confirmation_url,
      },
    });
  }
}
