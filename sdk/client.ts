import { client } from './ClientBuilder';
import {
  createApiBuilderFromCtpClient,
  ApiRoot,
} from '@commercetools/platform-sdk';

export const apiRoot: () => ApiRoot = () => {
  return createApiBuilderFromCtpClient(client);
};
