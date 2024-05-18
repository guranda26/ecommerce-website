import { client, projectKey } from './ClientBuilder';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';

export const apiRoot = createApiBuilderFromCtpClient(client).withProjectKey({
  projectKey: projectKey,
});
