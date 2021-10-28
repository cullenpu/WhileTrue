import { useEffect, useContext } from 'react';

//@ts-expect-error
import { magic } from '../lib/magic';
import { UserContext } from '../lib/UserContext';

export const Logout = () => {
  const {setUser} = useContext(UserContext);
  useEffect(() => {
      const logout = async () => {
        //@ts-expect-error
        await magic.user.logout();
        setUser({issuer: null, email: null, publicAddress: null});
      }
      logout();
  }, [setUser]);

  return (
    <>
    <div>
        logout yo
    </div>
    </>
  );
};