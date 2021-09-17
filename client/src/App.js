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
        <Route path="/" component={Users} exact />
        <Route path="/:userId/posts" component={UserPosts} />
        <Route path="/posts/new" component={NewPost} exact />
        <Route path="/auth" component={Auth} />

        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" component={Users} exact />
        <Route path="/:userId/posts" component={UserPosts} />
        <Route path="/auth" component={Auth} />

        <Route path="*">
          <Redirect to="/auth" />
        </Route>
      </Switch>
    );
  }

  return <Layout>{routes}</Layout>;
}

export default App;
