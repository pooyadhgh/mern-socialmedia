import PostItem from './PostItem';

const PostList = props => {
  if (props.items.length === 0) {
    return <h2>No Posts Found</h2>;
  }
  return (
    <section>
      {props.items.map(post => (
        <PostItem
          key={post._id}
          id={post._id}
          image={post.image}
          title={post.title}
          description={post.description}
          creatorId={post.creator}
          onDelete={props.onDeletePost}
        />
      ))}
    </section>
  );
};

export default PostList;
