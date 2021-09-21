import { Link } from 'react-router-dom';
import Card from '../../shared/components/Card/Card';
import classes from './UserItem.module.css';

const UserItem = props => {
  return (
    <Card className={classes['user-item']}>
      <Link to={`/${props.id}/posts`}>
        <figure>
          <img src={props.image} alt={props.name} />
        </figure>
      </Link>

      <div className={classes['user-item_info']}>
        <Link to={`/${props.id}/posts`}>
          <h2>{props.name}</h2>
        </Link>

        <div className={classes['user-item_info__posts']}>
          <i class="fa fa-comment"></i>
          <span> Posts: </span> {props.postCount}
        </div>
      </div>
    </Card>
  );
};

export default UserItem;
