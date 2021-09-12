import { NavLink } from 'react-router-dom';
import './NavLinks.css';

const NavLinks = () => {
  return (
    <div>
      <ul>
        <li>
          <NavLink to="/">All Users</NavLink>
        </li>

        <li>
          <NavLink to="/1/posts">My Posts</NavLink>
        </li>

        <li>
          <NavLink to="/posts/new">New Post</NavLink>
        </li>

        <li>
          <NavLink to="/auth">Login / Signup</NavLink>
        </li>
      </ul>
    </div>
  );
};

export default NavLinks;
