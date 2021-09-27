import { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import AuthContext from '../../context/auth-context';
import Button from '../Button/Button';
import classes from './NavLinks.module.css';

const NavLinks = () => {
  const authCtx = useContext(AuthContext);
  const [navbarIsShown, setNavbarIsShown] = useState(false);

  const toggleHandler = () => {
    setNavbarIsShown(!navbarIsShown);
  };

  return (
    <>
      <ul
        onClick={() => setNavbarIsShown(false)}
        className={
          navbarIsShown
            ? `${classes['nav-links']} ${classes['nav-links__show']}`
            : `${classes['nav-links']}`
        }
      >
        <li>
          <NavLink to="/">All Users</NavLink>
        </li>
        {authCtx.isLoggedIn && (
          <li>
            <NavLink to={`/${authCtx.userId}/posts`}>My Posts</NavLink>
          </li>
        )}

        {authCtx.isLoggedIn && (
          <li>
            <NavLink to="/posts/new">New Post</NavLink>
          </li>
        )}

        {authCtx.isLoggedIn && (
          <li>
            <Button onClick={authCtx.logout}>Logout</Button>
          </li>
        )}

        {!authCtx.isLoggedIn && (
          <li>
            <Button to="/auth">Login</Button>
          </li>
        )}
      </ul>
      <div className={classes['nav-links__toggle']} onClick={toggleHandler}>
        {navbarIsShown ? (
          <i className="fa fa-times"></i>
        ) : (
          <i className="fa fa-bars"></i>
        )}
      </div>
    </>
  );
};

export default NavLinks;
