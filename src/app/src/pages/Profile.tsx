import { Center } from '@chakra-ui/react';
import { useContext, useEffect } from 'react';
import { UserContext } from '../lib/UserContext';

export const Profile = () => {
  const { user } = useContext(UserContext);

  useEffect(() => {
    document.title = 'Profile - WhileTrue';
  });

  return (
    <Center m="10">
      <header>
        <h1 id="main">Welcome {user.email}.</h1>
      </header>
    </Center>
  );
};
