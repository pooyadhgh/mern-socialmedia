import classes from './Header.module.css';
import { Link } from 'react-router-dom';
import NavLinks from '../NavLinks/NavLinks';

const Header = () => {
  return (
    <header className={classes.header}>
      <h1>
        <Link to="/">MERN - SocialMedia</Link>
      </h1>
      <nav className={classes['nav-bar']}>
        <NavLinks />
      </nav>
    </header>
  );
};

export default Header;
