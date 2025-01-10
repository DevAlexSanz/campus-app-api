export type ConfigType = {
  api: {
    PORT: number;
    API_CORS_WHITELIST: string[];
  };
  gmailCredentials: {
    GMAIL_AUTH_USER: string;
    GMAIL_AUTH_PASSWORD: string;
  }
};
