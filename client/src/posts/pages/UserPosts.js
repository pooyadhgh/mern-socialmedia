import PostList from '../components/PostList';
import { useParams } from 'react-router-dom';

const UserPosts = () => {
  const userId = useParams().userId;
  const posts = [
    { id: 1, image: '', title: 'hi', description: 'desc', creator: 1 },
    { id: 2, image: '', title: 'hi2', description: 'desc2', creator: 2 },
  ];

  const userPosts = posts.filter(post => +post.creator === +userId);

  return <PostList items={userPosts} />;
};

export default UserPosts;
