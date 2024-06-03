import { createContext } from 'react';
import { clientMaker } from '../../sdk/createClient';

const apiRoot = clientMaker();

export const UserContext = createContext({ apiRoot });
