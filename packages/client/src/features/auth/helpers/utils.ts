export const getOauthLink = (serviceId: string, redirectUri: string) =>
  `https://oauth.yandex.ru/authorize?response_type=code&client_id=${serviceId}&redirect_uri=${redirectUri}`;
