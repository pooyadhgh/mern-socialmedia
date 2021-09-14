import { useContext } from 'react';
import Button from '../../shared/components/FormElements/Button';
import AuthContext from '../../shared/context/auth-context';
import './PostItem.css';

const PostItem = props => {
  const authCtx = useContext(AuthContext);
  return (
    <li>
      <div>
        <img src={props.image} alt={props.title} />
      </div>
      <div>
        <h2>{props.title}</h2>
        <h3>{props.description}</h3>
      </div>
      {authCtx.isLoggedIn && (
        <div>
          <Button>Delete</Button>
        </div>
      )}
    </li>
  );
};

export default PostItem;
