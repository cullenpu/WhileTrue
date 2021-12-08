import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
// @ts-expect-error
import { magic } from '../lib/magic';
import { UserContext } from '../lib/UserContext';
import LoginForm from '../components/LoginForm';

import postLogin from '../api/login';

const getDidTokenFromMagic = async (email: string) => {
  // @ts-expect-error
  const didToken = await magic.auth.loginWithMagicLink({
    email,
    redirectURI: new URL('/callback', window.location.origin).href, // optional redirect back to your app after magic link is clicked
  });

  if (!didToken) {
    throw Error('Login failed');
  }

  const status = await postLogin(didToken, email);
  if (status !== 200) {
    throw Error('Failed to validate login');
  }

  // @ts-expect-error
  const userMetadata = await magic.user.getMetadata();
  return userMetadata;
};

export const Login = () => {
  const history = useHistory();
  const [disabled, setDisabled] = useState(false);

  const { setUser } = useContext(UserContext);

  async function handleLoginWithEmail(email: string) {
    try {
      setDisabled(true); // disable login button to prevent multiple emails from being triggered

      // Trigger Magic link to be sent to user
      if (process.env.NODE_ENV === 'production') {
        const userMetadata = await getDidTokenFromMagic(email);
        await setUser(userMetadata);
      } else {
        const status = await postLogin(Math.random().toString(36).slice(7), email);
        if (status !== 200) {
          throw Error('Failed to validate login');
        }

        await setUser({ issuer: '', email, publicAddress: '' });
      }

      history.push('/dashboard');
    } catch (error) {
      setDisabled(false); // re-enable login button - user may have requested to edit their email
      console.log(error);
    }
  }

  return (
    <div>
      <LoginForm disabled={disabled} onEmailSubmit={handleLoginWithEmail} />
    </div>
  );
};
