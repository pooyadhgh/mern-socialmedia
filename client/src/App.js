import { useContext } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import NewPost from './posts/pages/NewPost';
import UserPosts from './posts/pages/UserPosts';
import Layout from './shared/components/Layout/Layout';
import AuthContext from './shared/context/auth-context';
import Auth from './user/pages/Auth';
import Users from './user/pages/Users';

function App() {
  const authCtx = useContext(AuthContext);
  let routes;
  if (authCtx.isLoggedIn) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>

        <Route path="/:userId/posts">
          <UserPosts />
        </Route>

        <Route path="/posts/new" exact>
          <NewPost />
        </Route>

        <Route path="/auth">
          <Auth />
        </Route>

        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>

        <Route path="/:userId/posts">
          <UserPosts />
        </Route>

        <Route path="/auth">
          <Auth />
        </Route>

        <Route path="*">
          <Redirect to="/auth" />
        </Route>
      </Switch>
    );
  }

  return <Layout>{routes}</Layout>;
}

export default App;
