import { MailerModule } from '@nestjs-modules/mailer';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import { Global, Module } from '@nestjs/common';
import { join } from 'path';
import { environments } from 'src/config';
import { EmailService } from './email.service';

@Global()
@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: async () => ({
        transport: {
          host: environments.mailHost,
          port: 587,
          secure: false,
          auth: {
            user: environments.smtpUsername,
            pass: environments.smtpPassword,
          },
          tls: {
            rejectUnauthorized: false
          }
        },
        defaults: {
          from: `"Vitamin App" <${environments.smtpUsername}>`,
        },
        template: {
          dir: join(__dirname, 'templates'),
          adapter: new EjsAdapter(),
          options: {
            strict: false,
          },
        },
      }),
    }),
  ],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
