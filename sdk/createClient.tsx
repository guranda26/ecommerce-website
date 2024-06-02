import {
    Client,
    ClientBuilder,
    ExistingTokenMiddlewareOptions,
    UserAuthOptions
} from '@commercetools/sdk-client-v2';

import {
    createApiBuilderFromCtpClient,
} from '@commercetools/platform-sdk';

import {
    projectKey,
    clientId,
    clientSecret,
    authUrl,
    scopes,
    authMiddlewareOptions,
    httpMiddlewareOptions
} from './ClientBuilder'
import { MyTokenCache } from './MyTokenCache';

const myTokenCache = new MyTokenCache();

const createOption = (user?: UserAuthOptions) => {
    if (user) {
        return {
            host: authUrl,
            projectKey: projectKey,
            credentials: {
                clientId: clientId,
                clientSecret: clientSecret,
                user: user,
                tokenCache: myTokenCache.get
            },
            scopes: scopes,
            fetch,
        };
    }
}

export const clientMaker = (email?: string, password?: string) => {
    let client: Client;

    if (!myTokenCache.isExist()) {
        if (!email || !password) {
            client = new ClientBuilder()
                .withProjectKey(projectKey)
                .withClientCredentialsFlow(authMiddlewareOptions)
                .withHttpMiddleware(httpMiddlewareOptions)
                .withLoggerMiddleware()
                .build();
        }
        else {
            const passwordOptions = createOption({ username: email, password: password });
            client = new ClientBuilder()
                .withProjectKey(projectKey)
                .withPasswordFlow(passwordOptions!)
                .withHttpMiddleware(httpMiddlewareOptions)
                .withLoggerMiddleware()
                .build();
        }
    }
    else {
        const token = myTokenCache.get().token;
        const authorization: string = `Bearer ${token}`;
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

    const apiRoot = createApiBuilderFromCtpClient(client)
        .withProjectKey({ projectKey });

    return apiRoot;
}