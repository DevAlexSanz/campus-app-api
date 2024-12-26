import 'dotenv/config';
import { ConfigType } from '@appTypes/ConfigType';
import { environmentValidator } from '@utils/validators/environment.validator';

class Config {
  public getConfig(): ConfigType {
    return {
      api: {
        PORT: environmentValidator('API_PORT', 9000) as number,
        CORS_WHITELIST: process.env.CORS_WHITELIST?.split(',') || [],
      },
      db: {
        MONGODB_URI: environmentValidator('MONGODB_URI', '') as string,
      },
    };
  }
}

export default new Config();
