import PostList from '../components/PostList';

const UserPosts = () => {
  const posts = [
    { id: 1, image: '', title: 'hi', description: 'desc', creator: 1 },
  ];

  return <PostList items={posts} />;
};

export default UserPosts;
