export {};

declare global {
  var baseurl: string;
  namespace;
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV:  'development' | 'production';
      HOSTNAME: string;
      PORT: string;
      HOST: string;
      USER: string;
      PASS: string;
      DB: string;
      PORTDB: number;
      DIALECT: string;
      MAX: number;
      MIN: number;
      ACQUIRE: number;
      IDLE: number;
      SECRET_ACCESSTOKEN: string;
      SECRET_REFRESHTOKEN: string;
    }
  }

  namespace Express {
    interface Request {
      username: string;
      role:number;
      userId:number;
    }
    interface Response {}
  }
}
