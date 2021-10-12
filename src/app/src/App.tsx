import * as React from 'react';
import { Switch, BrowserRouter as Router } from 'react-router-dom';
import { magic } from './lib/magic';
import { UserContext, initialUser } from './lib/UserContext';

import './App.css';
import routes from './routes';
import AppRoute from './components/AppRoutes';

const App = () => {
  const [user, setUser] = React.useState(initialUser);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      const isLoggedIn = await magic.user.isLoggedIn();
      if (isLoggedIn) {
        const userData = await magic.user.getMetadata();
        setUser(userData);
      } else {
        console.log('no user found');
      }
      setLoading(false);
    }

    fetchUser();
  }, []);

  return (
    <>
      {loading ? <div>loading</div> : (
      <UserContext.Provider value={{user, setUser}}>
      <Router>
      <Switch>
          {routes.map((route) => (
            <AppRoute
              key={route.path}
              path={route.path}
              component={route.component}
              isPrivate={route.isPrivate} />
          ))}
      </Switch>
    </Router>
    </UserContext.Provider>
      )}
    </>

  )
};

export default App;
