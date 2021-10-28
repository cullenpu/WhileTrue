import { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import * as H from "history";

//@ts-expect-error
import { magic } from '../lib/magic';
import { UserContext } from '../lib/UserContext';
import postLogin from '../api/login';

type Props = {
    location: H.Location;
}

export const Callback = (props: Props) => {
  const history = useHistory();
  const {setUser} = useContext(UserContext);

  // The redirect contains a `provider` query param if the user is logging in with a social provider
  useEffect(() => {
    const login = async () => {
        let magicCredential = new URLSearchParams(props.location.search).get('magic_credential');
        if (magicCredential) {
            try {
                //@ts-expect-error
                const didToken = await magic.auth.loginWithCredential();
                if (!didToken) {
                    throw Error("No token found");
                }

                const status = await postLogin(didToken, '');
                if (status !== 200) {
                    throw Error("Failed to validate login");
                }
                //@ts-expect-error
                let userMetadata = await magic.user.getMetadata();
                await setUser(userMetadata);
                history.push('/profile');
            } catch (err) {
                console.log(err);
            }
            
        }
    };
      login();  
  }, [history, props.location.search, setUser]);

//   // Send token to server to validate
//   const authenticateWithServer = async (didToken: string | null) => {
//     let res = await fetch(`/api/login`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: 'Bearer ' + didToken,
//       },
//     });

//     if (res.status === 200) {
//       // Set the UserContext to the now logged in user
//       let userMetadata = await magic.user.getMetadata();
//       await setUser(userMetadata);
//       history.push('/profile');
//     }
//   };

  return <div>LOADING</div>;
};
