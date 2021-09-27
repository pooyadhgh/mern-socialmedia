import { Link } from 'react-router-dom';
import Card from '../../shared/components/Card/Card';
import classes from './UserItem.module.css';

const UserItem = props => {
  return (
    <Card className={classes['user-item']}>
      <Link to={`/${props.id}/posts`}>
        <figure>
          <img
            src={`${process.env.REACT_APP_BASE_URL}/${props.image}`}
            alt={props.name}
          />
        </figure>
      </Link>

      <div className={classes['user-item__info']}>
        <Link to={`/${props.id}/posts`}>
          <h2>{props.name}</h2>
        </Link>

        <div className={classes['user-item__info__posts']}>
          <i className="fa fa-comment"></i>
          <span> Posts: </span> {props.postCount}
        </div>
      </div>
    </Card>
  );
};

export default UserItem;
