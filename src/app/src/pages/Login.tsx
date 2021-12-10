import { Center } from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import postLogin from '../api/login';
import LoginForm from '../components/LoginForm';
// @ts-expect-error
import { magic } from '../lib/magic';
import { UserContext } from '../lib/UserContext';

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

const getUserMetadata = async (email: string) => {
  if (process.env.NODE_ENV === 'production') {
    const userMetadata = await getDidTokenFromMagic(email);
    return userMetadata;
  }
  const status = await postLogin(Math.random().toString(36).slice(7), email);
  if (status !== 200) {
    throw Error('Failed to validate login');
  }
  return { issuer: '', email, publicAddress: '' };
};

export const Login = () => {
  const history = useHistory();
  const [success, setSuccess] = useState(true);
  const [disabled, setDisabled] = useState(false);
  const { setUser } = useContext(UserContext);

  async function handleLoginWithEmail(email: string) {
    try {
      setDisabled(true); // disable login button to prevent multiple emails from being triggered
      // Trigger Magic link to be sent to user
      setUser(await getUserMetadata(email));

      history.push('/dashboard');
    } catch (error) {
      setDisabled(false); // re-enable login button - user may have requested to edit their email
      console.log(error);
    }
  }

  useEffect(() => {
    document.title = 'Login - WhileTrue';
  });

  return (
    <div>
      <LoginForm disabled={disabled} onEmailSubmit={handleLoginWithEmail} />
      {success ? null : <Center>Error logging in</Center>}
    </div>
  );
};
