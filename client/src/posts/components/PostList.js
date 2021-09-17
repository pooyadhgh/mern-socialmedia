import PostItem from './PostItem';
import classes from './PostList.module.css';

const PostList = props => {
  if (props.items.length === 0) {
    return (
      <div className={classes.center}>
        <h2>No Posts Found</h2>
      </div>
    );
  }
  return (
    <div>
      <ul>
        {props.items.map(post => (
          <PostItem
            key={post.id}
            id={post.id}
            image={post.image}
            title={post.title}
            description={post.description}
            creatorId={post.creator}
          />
        ))}
      </ul>
    </div>
  );
};

export default PostList;
