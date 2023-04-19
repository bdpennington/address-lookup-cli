declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      SMARTY_AUTH_ID: string;
      SMARTY_AUTH_TOKEN: string;
      SMARTY_API_HOST: string;
      SMARTY_LICENSE: string;
    }
  }
}
