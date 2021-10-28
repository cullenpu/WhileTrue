import { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
//@ts-expect-error
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

      let didToken;
      // Trigger Magic link to be sent to user
      if (process.env.NODE_ENV === 'production') {
        //@ts-expect-error
        didToken = await magic.auth.loginWithMagicLink({
          email,
          redirectURI: new URL('/callback', window.location.origin).href, // optional redirect back to your app after magic link is clicked
        });

        if (!didToken) {
            throw Error("Login failed");
        }
        
        const status = await postLogin(didToken, email);
        if (status !== 200) {
            throw Error("Failed to validate login");
        }
        
        //@ts-expect-error
        let userMetadata = await magic.user.getMetadata();
        await setUser(userMetadata);
      } else {
        const status = await postLogin(Math.random().toString(36).slice(7), email);
        if (status !== 200) {
            throw Error("Failed to validate login");
        }
        
        await setUser({issuer: '', email: email, publicAddress: ''});
      }
    
      console.log("yo")
      history.push('/profile');
    } catch (error) {
      setDisabled(false); // re-enable login button - user may have requested to edit their email
      console.log(error);
    }
  }

  return (
    <>
      <h1>LOGIN</h1>
      <div className={styles.login}>
        <LoginForm disabled={disabled} onEmailSubmit={handleLoginWithEmail} />
      </div>
    </>
  );
};
