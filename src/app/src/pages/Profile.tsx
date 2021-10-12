import { useContext } from 'react';

import { UserContext } from '../lib/UserContext';

export const Profile = () => {
  const {user} = useContext(UserContext);

  return (
    <h1>
      Welcome {user.email}.
    </h1>
  );
};

