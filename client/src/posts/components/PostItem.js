import { useContext } from 'react';
import Card from '../../shared/components/Card/Card';
import Button from '../../shared/components/Button/Button';
import AuthContext from '../../shared/context/auth-context';
import classes from './PostItem.module.css';

const PostItem = props => {
  const authCtx = useContext(AuthContext);
  return (
    <Card className={classes['post-item']}>
      <figure className={classes['post-item_figure']}>
        <img src={props.image} alt={props.title} />
      </figure>
      <div className={classes['post-item_content']}>
        <h2>{props.title}</h2>
        <p>{props.description}</p>
      </div>
      {authCtx.isLoggedIn && (
        <div className={classes['post-item_controlls']}>
          <Button className={classes['post-item_controlls__button']}>
            Delete
          </Button>
        </div>
      )}
    </Card>
  );
};

export default PostItem;
