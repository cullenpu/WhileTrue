import { Magic } from 'magic-sdk';

// eslint-disable-next-line import/no-mutable-exports
let magic;
if (process.env.NODE_ENV === 'production') {
  magic = new Magic((process.env.REACT_APP_MAGIC_PUBLISHABLE_KEY as string) || '');
}

export { magic };
