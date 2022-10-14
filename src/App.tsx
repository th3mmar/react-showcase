import { hot } from 'react-hot-loader/root';
import { createClient, Provider as UrqlProvider } from 'urql';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import { useAppSelector } from './hooks/store';
import AdminUserLoginChecker from './components/AdminUserLoginChecker';

// Use React lazy to code-split our pages
const Home = lazy(() => import('./pages/Home'));
import { Toaster } from 'react-hot-toast';
import InvalidWarehouseIdError from './components/InvalidWarehouseIdError';

import { useEffect, Suspense, lazy } from 'react';
import ReactDOM from 'react-dom';

const AppTitle = () => {
  // This effect runs once, after the first render
  useEffect(() => {
    document.title = 'Supply admin';
  }, []);

  return <h1> </h1>;
};

ReactDOM.render(<AppTitle />, document.getElementById('root'));

const createClientWithToken = (token: string) => {
  return createClient({
    url: window.env.GRAPHQL_ENDPOINT,
    fetchOptions: () => ({
      requestPolicy: 'network-only',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      credentials: 'include',
    }),
  });
};

const App = () => {
  const exitUrl = useAppSelector((state) => state.zipCode.leaveApplicationTo);
  if (exitUrl) {
    window.location.href = exitUrl;
  }

  const urlqConfig = createClientWithToken(
    useAppSelector((state) => state.auth.token)!,
  );

  return (
    <AdminUserLoginChecker>
      <UrqlProvider value={urlqConfig}>
        <Router>
          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              <Route exact path="/:id">
                <div
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '100vh',
                    paddingY: '8',
                    variant: 'layout.root',
                  }}
                >
                  <Navbar />
                  <main sx={{ variant: 'layout.main', flex: '1' }}>
                    <Home />
                    <div>
                      <Toaster position="top-right" />
                    </div>
                  </main>
                </div>
              </Route>

              <Route exact path="/">
                <InvalidWarehouseIdError redirect={true} showAlert={false} />
              </Route>
            </Switch>
          </Suspense>
        </Router>
      </UrqlProvider>
    </AdminUserLoginChecker>
  );
};

export default hot(App);
