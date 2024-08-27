import { TokenInfo } from '@commercetools/sdk-client-v2';
import { authUrl, clientId, clientSecret } from './createClient';
import { projectKey } from './createClient';

export type CacheType = {
  access_token: string;
  expires_in: number;
  scope: string;
  token_type: string;
};

export const getMyToken = (bodyInit?: {
  username: string;
  password?: string;
}) => {
  const changeToken = async () => {
    const myCache = {
      access_token: '',
      expires_in: 0,
      scope: 'manage_project:furniture',
      token_type: 'Bearer',
    };

    const myHeaders = new Headers();
    let raw: string | BodyInit = '';
    let grant_type = 'client_credentials';
    let projectkey = '';
    myHeaders.append(
      'Authorization',
      `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`
    );
    if (bodyInit) {
      raw = JSON.stringify(bodyInit);
      grant_type = `password&username=${bodyInit.username}&password=${bodyInit.password}`;
      projectkey = `/${projectKey}/customers`;
    }

    const isAccessToken: boolean = await fetch(
      `${authUrl}/oauth${projectkey}/token?grant_type=${grant_type}`,
      {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
      }
    )
      .then((response) => response.json())
      .then((result: CacheType) => {
        Object.assign(myCache, result);
        return true;
      })
      .catch((error) => {
        console.error(error);
        return false;
      });

    if (isAccessToken) {
      if (!bodyInit) {
        localStorage.setItem('anonymCache', JSON.stringify(myCache));
        localStorage.removeItem('myCache');
      } else {
        localStorage.setItem('myCache', JSON.stringify(myCache));
        localStorage.removeItem('anonymCache');
      }
    }
  };

  void changeToken();
};

function isTokenExpired(token: TokenInfo): boolean {
  const currentTime = Math.floor(Date.now() / 1000);
  return token.expires_at < currentTime;
}

export function getToken() {
  const myToken = localStorage.getItem('myCache');
  if (myToken) {
    const token: TokenInfo = JSON.parse(myToken) as TokenInfo;
    if (isTokenExpired(token)) {
      console.log('Token expired, clearing LocalStorage...');
      localStorage.removeItem('myCache');
      getMyToken();
      return null;
    }
    return token.access_token;
  }
  return null;
}

export function isExist() {
  const myCash = localStorage.getItem('myCache');
  return !!myCash;
}
