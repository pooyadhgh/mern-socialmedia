import { useContext } from 'react';
import Card from '../../shared/components/Card/Card';
import Button from '../../shared/components/Button/Button';
import AuthContext from '../../shared/context/auth-context';
import classes from './PostItem.module.css';
import { useHttpclient } from '../../shared/hooks/http-hook';

const PostItem = props => {
  const authCtx = useContext(AuthContext);
  const { sendRequest } = useHttpclient();
  const postId = props.id;

  const deleteHandler = async () => {
    try {
      await sendRequest(`http://localhost:8080/api/posts/${postId}`, 'DELETE');
      props.onDelete(postId);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card className={classes['post-item']}>
      <figure className={classes['post-item__figure']}>
        <img src={props.image} alt={props.title} />
      </figure>
      <div className={classes['post-item__content']}>
        <h2>{props.title}</h2>
        <p>{props.description}</p>
      </div>
      {authCtx.isLoggedIn && (
        <div className={classes['post-item__controlls']}>
          <Button
            onClick={deleteHandler}
            className={classes['post-item__controlls__button']}
          >
            Delete
          </Button>
        </div>
      )}
    </Card>
  );
};

export default PostItem;
