import PostItem from './PostItem';

const PostList = props => {
  if (props.items.length === 0) {
    return <h2>No Posts Found</h2>;
  }
  return (
    <section>
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
    </section>
  );
};

export default PostList;
