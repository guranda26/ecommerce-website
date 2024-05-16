import { client, projectKey } from './ClientBuilder';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
// import { ApiRoot } from '../src/Interfaces/CustomerInterface';

export const apiRoot = createApiBuilderFromCtpClient(client).withProjectKey({
  projectKey: projectKey,
});

// const getProject = () => {
//   return apiRoot.get().execute();
// };

// getProject().then(console.log).catch(console.error);
