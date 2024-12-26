export type ConfigType = {
  api: {
    PORT: number;
    CORS_WHITELIST: string[];
  };
  db: {
    MONGODB_URI: string;
  };
};
