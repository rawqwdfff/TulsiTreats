export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      [key: string]: string | undefined;
      SECRET_KEY: string;
      DATABASE_URL: string;
      // add more environment variables and their types here
    }
  }
}
