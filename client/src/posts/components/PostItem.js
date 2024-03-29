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
      await sendRequest(
        `${process.env.REACT_APP_BASE_URL}/api/posts/${postId}`,
        'DELETE',
        null,
        {
          Authorization: 'Bearer ' + authCtx.token,
        }
      );
      props.onDelete(postId);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card className={classes['post-item']}>
      <figure className={classes['post-item__figure']}>
        <img
          src={`${process.env.REACT_APP_BASE_URL}/${props.image}`}
          alt={props.title}
        />
      </figure>
      <div className={classes['post-item__content']}>
        <h2>{props.title}</h2>
        <p>{props.description}</p>
      </div>

      {authCtx.isLoggedIn && authCtx.userId === props.creatorId && (
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
