import { createContext } from 'react';

const appContextValues = {
  user: undefined,
  token: undefined,
  handleSignIn: () => undefined,
  handleSignOut: () => undefined,
};
const AppContext = createContext({ appContextValues });
export default AppContext;
