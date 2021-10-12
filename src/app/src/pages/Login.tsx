import { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { magic } from '../lib/magic';
import { UserContext } from '../lib/UserContext';
import LoginForm from '../components/LoginForm';

import styles from './Login.module.css';
import postLogin from '../api/login';

export const Login = () => {
  const history = useHistory();
  const [disabled, setDisabled] = useState(false);

  const {setUser} = useContext(UserContext);

  async function handleLoginWithEmail(email: string) {
    try {
      setDisabled(true); // disable login button to prevent multiple emails from being triggered

      // Trigger Magic link to be sent to user
      let didToken = await magic.auth.loginWithMagicLink({
        email,
        redirectURI: new URL('/callback', window.location.origin).href, // optional redirect back to your app after magic link is clicked
      });

      if (!didToken) {
          throw Error("Login failed");
      }
    
      const status = await postLogin(didToken);
      if (status !== 200) {
          throw Error("Failed to validate login");
      }
      
      let userMetadata = await magic.user.getMetadata();
      await setUser(userMetadata);
      history.push('/profile');
    } catch (error) {
      setDisabled(false); // re-enable login button - user may have requested to edit their email
      console.log(error);
    }
  }

  return (
    <>
      <div className={styles.login}>
        <LoginForm disabled={disabled} onEmailSubmit={handleLoginWithEmail} />
      </div>
    </>
  );
};
