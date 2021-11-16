import * as React from 'react';
import { Switch, BrowserRouter as Router } from 'react-router-dom';

import { getUserInfo } from './api/user';
import { UserContext, initialUser } from './lib/UserContext';
import './App.css';
import routes from './routes';
import AppRoute from './components/AppRoutes';
import Nav from './components/Nav';

const App = () => {
  const [user, setUser] = React.useState(initialUser);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const userInfo = await getUserInfo();
        setUser({
          issuer: userInfo.issuer,
          email: userInfo.email,
          publicAddress: '',
        });
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    };

    fetchUser();
  }, []);

  return (
    <>
      {loading ? (
        <div>loading</div>
      ) : (
        <UserContext.Provider value={{ user, setUser }}>
          <Router>
            <div>
              <Nav />
              <Switch>
                {routes.map((route) => (
                  <AppRoute
                    key={route.path}
                    path={route.path}
                    component={route.component}
                    isPrivate={route.isPrivate}
                  />
                ))}
              </Switch>
            </div>
          </Router>
        </UserContext.Provider>
      )}
    </>
  );
};

export default App;
