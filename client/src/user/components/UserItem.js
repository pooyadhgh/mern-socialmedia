import { Link } from 'react-router-dom';
import './UserItem.module.css';

const UserItem = props => {
  return (
    <li>
      <Link to={`/${props.id}/posts`}>
        <div>
          <img src={props.image} alt={props.name} />
          <h2>{props.name}</h2>
          <h3>{props.postCount}</h3>
        </div>
      </Link>
    </li>
  );
};

export default UserItem;
