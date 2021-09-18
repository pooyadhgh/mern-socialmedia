import { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import AuthContext from '../../context/auth-context';
import classes from './NavLinks.module.css';

const NavLinks = () => {
  const authCtx = useContext(AuthContext);
  const [navbarIsShown, setNavbarIsShown] = useState(false);
  console.log(authCtx);
  const toggleHandler = () => {
    setNavbarIsShown(prevState => !prevState);
  };
  return (
    <>
      <ul
        onClick={toggleHandler}
        className={
          navbarIsShown
            ? `${classes.navlinks} ${classes.navlinks_show}`
            : `${classes.navlinks}`
        }
      >
        <li>
          <NavLink to="/">All Users</NavLink>
        </li>
        {authCtx.isLoggedIn && (
          <li>
            <NavLink to="/1/posts">My Posts</NavLink>
          </li>
        )}

        {authCtx.isLoggedIn && (
          <li>
            <NavLink to="/posts/new">New Post</NavLink>
          </li>
        )}

        {authCtx.isLoggedIn && (
          <li>
            <button onClick={authCtx.logout}>Logout</button>
          </li>
        )}

        {!authCtx.isLoggedIn && (
          <li>
            <NavLink to="/auth">Login</NavLink>
          </li>
        )}
      </ul>
      <div className={classes.toggle} onClick={toggleHandler}>
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
