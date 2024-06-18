import {
  AnonymousAuthMiddlewareOptions,
  AuthMiddlewareOptions,
  Client,
  ClientBuilder,
  ExistingTokenMiddlewareOptions,
  HttpMiddlewareOptions,
  UserAuthOptions,
} from '@commercetools/sdk-client-v2';

import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';

import { getMyToken, getToken, isExist, isExistAnonymToken } from './myToken';

export const projectKey: string = import.meta.env
  .VITE_CTP_PROJECT_KEY as string;
export const clientId: string = import.meta.env.VITE_CTP_CLIENT_ID as string;
export const clientSecret: string = import.meta.env
  .VITE_CTP_CLIENT_SECRET as string;
export const authUrl: string = import.meta.env.VITE_CTP_AUTH_URL as string;
export const apiUrl: string = import.meta.env.VITE_CTP_API_URL as string;
export const scopes: string[] = (
  import.meta.env.VITE_CTP_SCOPES as string
).split(',');

export const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: authUrl,
  projectKey: projectKey,
  credentials: {
    clientId: clientId,
    clientSecret: clientSecret,
  },
  scopes: scopes,
  fetch,
};

export const withAnonymousSessionFlowOptions: AnonymousAuthMiddlewareOptions = {
  host: authUrl,
  projectKey: projectKey,
  credentials: {
    clientId: clientId,
    clientSecret: clientSecret,
  },
  scopes: scopes,
  fetch,
};

export const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: apiUrl,
  fetch,
};

const createOption = (user?: UserAuthOptions) => {
  if (user) {
    return {
      host: authUrl,
      projectKey: projectKey,
      credentials: {
        clientId: clientId,
        clientSecret: clientSecret,
        user: user,
      },
      scopes: scopes,
      fetch,
    };
  }
};

export const clientWithPassword = (email: string, password: string) => {
  const passwordOptions = createOption({ username: email, password: password });
  const client = new ClientBuilder()
    .withProjectKey(projectKey)
    .withPasswordFlow(passwordOptions!)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withLoggerMiddleware()
    .build();

  const apiRoot = createApiBuilderFromCtpClient(client).withProjectKey({
    projectKey,
  });

  return apiRoot;
};

export const clientWithAnonymousSessionFlow = () => {
  const client = new ClientBuilder()
    .withProjectKey(projectKey)
    .withAnonymousSessionFlow(withAnonymousSessionFlowOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withLoggerMiddleware()
    .build();

  const apiRoot = createApiBuilderFromCtpClient(client).withProjectKey({
    projectKey,
  });

  return apiRoot;
};

export const clientMaker = () => {
  let client: Client;

  if (!isExist() && !isExistAnonymToken()) {
    client = new ClientBuilder()
      .withProjectKey(projectKey)
      .withClientCredentialsFlow(authMiddlewareOptions)
      .withAnonymousSessionFlow(withAnonymousSessionFlowOptions)
      .withHttpMiddleware(httpMiddlewareOptions)
      .withLoggerMiddleware()
      .build();
    if (!isExistAnonymToken()) getMyToken();
  } else {
    const authorization: string = `Bearer ${getToken()}`;
    const existTokenOptions: ExistingTokenMiddlewareOptions = {
      force: true,
    };

    client = new ClientBuilder()
      .withProjectKey(projectKey)
      .withExistingTokenFlow(authorization, existTokenOptions)
      .withHttpMiddleware(httpMiddlewareOptions)
      .withLoggerMiddleware()
      .build();
  }

  const apiRoot = createApiBuilderFromCtpClient(client!).withProjectKey({
    projectKey,
  });

  return apiRoot;
};
