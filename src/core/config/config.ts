import 'dotenv/config';

import { ConfigType } from '@appTypes/ConfigType';
import { environmentValidator } from '@utils/validators/environment.validator';

export const config: ConfigType = {
  api: {
    PORT: environmentValidator('API_PORT', 9000) as number,
    API_CORS_WHITELIST: process.env.API_CORS_WHITELIST?.split(',') || [],
  },
  gmailCredentials: {
    GMAIL_AUTH_USER: environmentValidator('GMAIL_AUTH_USER', '') as string,
    GMAIL_AUTH_PASSWORD: environmentValidator(
      'GMAIL_AUTH_PASSWORD',
      ''
    ) as string,
  },
};
