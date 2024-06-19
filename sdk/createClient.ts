import {
    AnonymousAuthMiddlewareOptions,
    AuthMiddlewareOptions,
    Client,
    ClientBuilder,
    ExistingTokenMiddlewareOptions,
    HttpMiddlewareOptions,
    RefreshAuthMiddlewareOptions,
    UserAuthOptions,
} from '@commercetools/sdk-client-v2';

import {
    createApiBuilderFromCtpClient,
} from '@commercetools/platform-sdk';

import { MyTokenCache, getRefreshToken, getToken, isExist, isExistAnonymToken } from './myToken';
import { cacheName } from '../src/modules/constantLocalStorage';



export const projectKey: string = import.meta.env
    .VITE_CTP_PROJECT_KEY as string;
export const clientId: string = import.meta.env.VITE_CTP_CLIENT_ID as string;
export const clientSecret: string = import.meta.env.VITE_CTP_CLIENT_SECRET as string;
export const authUrl: string = import.meta.env.VITE_CTP_AUTH_URL as string;
export const apiUrl: string = import.meta.env.VITE_CTP_API_URL as string;
export const scopes: string[] = (import.meta.env.VITE_CTP_SCOPES as string).split(',');

const tokenStoreForLogin = new MyTokenCache(cacheName.Login);
const tokenStoreForAnonym = new MyTokenCache(cacheName.AnonymUser);


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
    tokenCache: tokenStoreForAnonym,
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
                user: user
            },
            scopes: scopes,
            tokenCache: tokenStoreForLogin,
            fetch,
        };
    }
}


export const clientWithPassword = (email: string, password: string) => {
    const passwordOptions = createOption({ username: email, password: password });
    const client = new ClientBuilder()
        .withProjectKey(projectKey)
        .withPasswordFlow(passwordOptions!)
        .withHttpMiddleware(httpMiddlewareOptions)
        .withLoggerMiddleware()
        .build();

    const apiRoot = createApiBuilderFromCtpClient(client)
        .withProjectKey({ projectKey });

    return apiRoot;
}

const refreshOption: RefreshAuthMiddlewareOptions = {
    host: authUrl,
    projectKey: projectKey,
    credentials: {
        clientId: clientId,
        clientSecret: clientSecret,
    },
    refreshToken: getRefreshToken() || '',
    tokenCache: tokenStoreForAnonym,
    fetch,
}

const refreshOptionLogin: RefreshAuthMiddlewareOptions = {
    host: authUrl,
    projectKey: projectKey,
    credentials: {
        clientId: clientId,
        clientSecret: clientSecret,
    },
    refreshToken: getRefreshToken() || '',
    tokenCache: tokenStoreForLogin,
    fetch,
}

export const clientMaker = () => {
    let client: Client;

    if (isExist()) {
        const authorization: string = `Bearer ${getToken()}`;
        const existTokenOptions: ExistingTokenMiddlewareOptions = {
            force: true,
        };
        client = new ClientBuilder()
            .withProjectKey(projectKey)
            .withRefreshTokenFlow(refreshOptionLogin)
            .withExistingTokenFlow(authorization, existTokenOptions)
            .withHttpMiddleware(httpMiddlewareOptions)
            .withLoggerMiddleware()
            .build();
    }

    if (isExistAnonymToken()) {
        const authorization: string = `Bearer ${getToken()}`;
        const existTokenOptions: ExistingTokenMiddlewareOptions = {
            force: true,
        };
        client = new ClientBuilder()
            .withProjectKey(projectKey)
            .withRefreshTokenFlow(refreshOption)
            .withExistingTokenFlow(authorization, existTokenOptions)
            .withHttpMiddleware(httpMiddlewareOptions)
            .withLoggerMiddleware()
            .build();
    }
    else {
        client = new ClientBuilder()
            .withProjectKey(projectKey)
            .withClientCredentialsFlow(authMiddlewareOptions)
            .withAnonymousSessionFlow(withAnonymousSessionFlowOptions)
            .withHttpMiddleware(httpMiddlewareOptions)
            .withLoggerMiddleware()
            .build();
    }

    const apiRoot = createApiBuilderFromCtpClient(client!)
        .withProjectKey({ projectKey });

    return apiRoot;
}