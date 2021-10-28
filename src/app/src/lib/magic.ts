import { Magic } from 'magic-sdk';

let magic;
if (process.env.NODE_ENV === 'production') {
    magic = new Magic(process.env.REACT_APP_MAGIC_PUBLISHABLE_KEY as string || '');
}

export {magic};