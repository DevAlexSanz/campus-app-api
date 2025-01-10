import nodemailer from 'nodemailer';
import ejs from 'ejs';
import path from 'path';
import fs from 'fs';
import { config } from '@config/config';

const { gmailCredentials } = config;

export const sendEmail = async (
  email: string,
  username: string
): Promise<number | null> => {
  try {
    const code = Math.floor(100000 + Math.random() * 900000);

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: gmailCredentials.GMAIL_AUTH_USER,
        pass: gmailCredentials.GMAIL_AUTH_PASSWORD,
      },
    });

    const templatePath = path.join(
      process.cwd(),
      '/src/assets/email-template.html'
    );

    const template = fs.readFileSync(templatePath, 'utf-8');

    const html = ejs.render(template, { username, code });

    const mailOptions = {
      from: gmailCredentials.GMAIL_AUTH_USER,
      to: email,
      subject: 'Verification Code',
      html,
    };

    await transporter.sendMail(mailOptions);

    return code;
  } catch (error) {
    console.error(error);

    return null;
  }
};
