import mongoose from 'mongoose';

export interface IDatabase {
  initializeDB(): Promise<typeof mongoose | null>;
}

class Database implements IDatabase {
  private uri: string;

  constructor(uri: string) {
    this.uri = uri;
  }

  public async initializeDB(): Promise<typeof mongoose | null> {
    try {
      await mongoose.connect(this.uri, {
        connectTimeoutMS: 10000,
      });

      console.log(
        '===========================================================\n' +
          '               MongoDB Connection Established'
      );

      return mongoose;
    } catch (error) {
      console.error(
        '===========================================================\n' +
          '                MongoDB Connection Failed\n' +
          '===========================================================\n' +
          `Error: ${error}`
      );

      return null;
    }
  }
}

export default Database;
