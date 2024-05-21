import { client } from './ClientBuilder';
import {
  createApiBuilderFromCtpClient,
  ApiRoot,
} from '@commercetools/platform-sdk';

// export const apiRoot = createApiBuilderFromCtpClient(client).withProjectKey({
//   projectKey: projectKey,
// });

export const apiRoot: () => ApiRoot = () => {
  return createApiBuilderFromCtpClient(client);
};
