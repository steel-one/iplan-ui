interface Config {
  [key: string]: string;
  AUTH_TYPE: 'session' | 'token';
}

export const config: Config = {
  AUTH_URL: 'http://localhost:3000/api/auth',
  AUTH_TYPE: 'token',
  BFF_GRAPHQL_URL: 'http://localhost:4001/graphql',
};
