interface Config {
  [key: string]: string;
  auth: 'session' | 'token';
}

export const config: Config = {
  // TODO: MOVE TO AppConfigService
  // TODO: MOVE TO AppConfigService
  // TODO: MOVE TO AppConfigService
  apiUrl: 'http://localhost:3000/',
  authUrl: 'http://localhost:3000/api/auth',
  auth: 'token',
};
