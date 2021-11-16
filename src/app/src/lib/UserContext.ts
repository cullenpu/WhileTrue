import { createContext } from 'react';
import { MagicUserMetadata } from 'magic-sdk';

export const initialUser: MagicUserMetadata = {
  issuer: null,
  email: null,
  publicAddress: null,
};

export type UserContextType = {
  user: MagicUserMetadata;
  setUser: (user: MagicUserMetadata) => void;
};

export const UserContext = createContext<UserContextType>({
  user: initialUser,
  setUser: (user) => console.warn(`no user provider ${user}`),
});
