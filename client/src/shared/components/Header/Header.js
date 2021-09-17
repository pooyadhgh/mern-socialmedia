import classes from './Header.module.css';
import { Link } from 'react-router-dom';
import NavLinks from '../NavLinks/NavLinks';

const Header = () => {
  return (
    <header className={classes.header}>
      <nav className={classes.nav}>
        <h1>
          <Link to="/">MERN - SocialMedia</Link>
        </h1>
        <NavLinks />
      </nav>
    </header>
  );
};

export default Header;
