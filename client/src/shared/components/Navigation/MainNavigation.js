import { Link } from 'react-router-dom';
import './MainNavigation.css';
import NavLinks from './NavLinks';

const MainNavigation = () => {
  return (
    <>
      <h1>
        <Link to="/">Your Posts</Link>
      </h1>
      <nav>
        <NavLinks />
      </nav>
    </>
  );
};

export default MainNavigation;
