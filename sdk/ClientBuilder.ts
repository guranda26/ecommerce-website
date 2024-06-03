import {
  ClientBuilder,
  type AuthMiddlewareOptions,
  type HttpMiddlewareOptions,
} from '@commercetools/sdk-client-v2';

export const projectKey: string = import.meta.env
  .VITE_CTP_PROJECT_KEY as string;
export const clientId: string = import.meta.env.VITE_CTP_CLIENT_ID as string;
export const clientSecret: string = import.meta.env.VITE_CTP_CLIENT_SECRET as string;
export const authUrl: string = import.meta.env.VITE_CTP_AUTH_URL as string;
export const apiUrl: string = import.meta.env.VITE_CTP_API_URL as string;
export const scopes: string[] = (import.meta.env.VITE_CTP_SCOPES as string).split(',');

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

export const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: apiUrl,
  fetch,
};

// `fetch` is globally available (e.g., via a polyfill)
export const client = new ClientBuilder()
  .withProjectKey(projectKey)
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware()
  .build();
