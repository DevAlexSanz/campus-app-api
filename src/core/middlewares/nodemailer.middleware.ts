import nodemailer from 'nodemailer';
import ejs from 'ejs';
import path from 'path';
import fs from 'fs';
import { config } from '@config/config';

const { gmailCredentials } = config;

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: gmailCredentials.GMAIL_AUTH_USER,
    pass: gmailCredentials.GMAIL_AUTH_PASSWORD,
  },
});

export const sendCodeVerificationEmail = async (
  email: string,
  username: string
): Promise<number | null> => {
  try {
    const code = Math.floor(100000 + Math.random() * 900000);

    const templatePath = path.join(
      process.cwd(),
      '/src/assets/email-code-verification-template.html'
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

export const sendUserVerifiedEmail = async (
  email: string,
  username: string
): Promise<void> => {
  try {
    const templatePath = path.join(
      process.cwd(),
      '/src/assets/email-user-verified-template.html'
    );

    const template = fs.readFileSync(templatePath, 'utf-8');

    const html = ejs.render(template, { username });

    const mailOptions = {
      from: gmailCredentials.GMAIL_AUTH_USER,
      to: email,
      subject: 'User Verified',
      html,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error(error);
  }
};
